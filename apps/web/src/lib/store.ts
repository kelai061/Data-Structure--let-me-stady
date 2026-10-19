import { useSyncExternalStore } from "react";

import { ALL_TOPICS, PLAN, WEEKS } from "#src/data/plan.ts";

interface Member {
  readonly id: string;
  readonly name: string;
}

interface AppState {
  readonly activeMemberId: string;
  /** memberId -> 已完成的知识点 id */
  readonly done: Record<string, readonly string[]>;
  /** memberId -> 周次 -> 已投入学时 */
  readonly hours: Record<string, Record<string, number>>;
  readonly members: readonly Member[];
  /** 计划第 1 周的周一，ISO 日期 */
  readonly startDate: string;
}

const PREFIX = "ds-plan:v1:";

const DEFAULT_MEMBERS: readonly Member[] = [
  { id: "m1", name: "kelai" },
  { id: "m2", name: "曹" },
  { id: "m3", name: "沈" },
];

const DEFAULT_STATE: AppState = {
  startDate: "2026-10-19",
  activeMemberId: "m1",
  members: DEFAULT_MEMBERS,
  done: { m1: [], m2: [], m3: [] },
  hours: { m1: {}, m2: {}, m3: {} },
};

/*
 * 存储刻意不用 JSON：每个字段存成一条纯文本，读回来全是 string，
 * 不需要在运行时猜结构。
 *   ds-plan:v1:members    -> "m1|我,m2|同学 B"
 *   ds-plan:v1:done:m1    -> "w1t1,w1t2"
 *   ds-plan:v1:hours:m1:3 -> "6"
 */

const hasStorage = () => typeof localStorage !== "undefined";

const readText = (key: string) => {
  if (!hasStorage()) {
    return null;
  }

  return localStorage.getItem(PREFIX + key);
};

const readMembers = (): readonly Member[] => {
  const raw = readText("members");

  if (raw === null || raw === "") {
    return DEFAULT_MEMBERS;
  }

  const members = raw.split(",").flatMap((chunk) => {
    const [id, name] = chunk.split("|");

    if (id === undefined || id === "") {
      return [];
    }

    return [{ id, name: name === undefined || name === "" ? "队友" : name }];
  });

  return members.length > 0 ? members : DEFAULT_MEMBERS;
};

const readDone = (memberId: string): readonly string[] => {
  const raw = readText(`done:${memberId}`);

  if (raw === null || raw === "") {
    return [];
  }

  return raw.split(",").filter((id) => id !== "");
};

const readHours = (memberId: string) => {
  const hours: Record<string, number> = {};

  for (const week of WEEKS) {
    const raw = readText(`hours:${memberId}:${week.week}`);
    const value = raw === null ? Number.NaN : Number(raw);

    if (Number.isFinite(value)) {
      hours[String(week.week)] = value;
    }
  }

  return hours;
};

const readState = (): AppState => {
  const members = readMembers();
  const done: Record<string, readonly string[]> = {};
  const hours: Record<string, Record<string, number>> = {};

  for (const member of members) {
    done[member.id] = readDone(member.id);
    hours[member.id] = readHours(member.id);
  }

  const activeMemberId = readText("active");
  const startDate = readText("start");

  return {
    members,
    done,
    hours,
    activeMemberId:
      activeMemberId !== null && activeMemberId !== ""
        ? activeMemberId
        : (members[0]?.id ?? "m1"),
    startDate:
      startDate !== null && startDate !== "" ? startDate : "2026-10-19",
  };
};

const persist = (next: AppState) => {
  if (!hasStorage()) {
    return;
  }

  localStorage.setItem(`${PREFIX}start`, next.startDate);
  localStorage.setItem(`${PREFIX}active`, next.activeMemberId);
  localStorage.setItem(
    `${PREFIX}members`,
    next.members.map((member) => `${member.id}|${member.name}`).join(",")
  );

  for (const member of next.members) {
    localStorage.setItem(
      `${PREFIX}done:${member.id}`,
      (next.done[member.id] ?? []).join(",")
    );

    const memberHours = next.hours[member.id] ?? {};

    for (const [week, value] of Object.entries(memberHours)) {
      localStorage.setItem(
        `${PREFIX}hours:${member.id}:${week}`,
        String(value)
      );
    }
  }
};

let state: AppState = readState();

const listeners = new Set<() => void>();

const commit = (next: AppState) => {
  state = next;

  try {
    persist(next);
  } catch {
    // 无痕模式或配额满时写不进去，本次会话内仍然生效
  }

  for (const listener of listeners) {
    listener();
  }
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
};

const getSnapshot = () => state;

const getServerSnapshot = () => DEFAULT_STATE;

export const useAppState = () =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

/* ---------------- 操作 ---------------- */

export const toggleTopic = (topicId: string) => {
  const memberId = state.activeMemberId;
  const current = state.done[memberId] ?? [];

  const next = current.includes(topicId)
    ? current.filter((id) => id !== topicId)
    : [...current, topicId];

  commit({ ...state, done: { ...state.done, [memberId]: next } });
};

export const setActiveMember = (memberId: string) => {
  commit({ ...state, activeMemberId: memberId });
};

export const renameMember = (memberId: string, name: string) => {
  // 名字里不能出现分隔符，否则读回来会串行
  const clean = name.replaceAll("|", " ").replaceAll(",", " ").trim();

  if (clean === "") {
    return;
  }

  commit({
    ...state,
    members: state.members.map((member) =>
      member.id === memberId ? { ...member, name: clean } : member
    ),
  });
};

export const setWeekHours = (week: number, hours: number) => {
  const memberId = state.activeMemberId;
  const safe = Number.isFinite(hours) ? Math.max(0, Math.min(40, hours)) : 0;
  const nextHours = { ...state.hours };

  nextHours[memberId] = {
    ...state.hours[memberId],
    [String(week)]: safe,
  };

  commit({ ...state, hours: nextHours });
};

export const resetProgress = () => {
  const done: Record<string, readonly string[]> = {};
  const hours: Record<string, Record<string, number>> = {};

  for (const member of state.members) {
    done[member.id] = [];
    hours[member.id] = {};
  }

  commit({ ...state, done, hours });
};

/* ---------------- 派生数据 ---------------- */

const DAY_MS = 86_400_000;

const startOfDay = (date: Date) =>
  Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());

export const weekOfDate = (startDate: string, now = new Date()) => {
  const [year, month, day] = startDate.split("-").map(Number);
  const start = Date.UTC(year ?? 2026, (month ?? 1) - 1, day ?? 1);
  const diff = Math.floor((startOfDay(now) - start) / DAY_MS);
  const raw = Math.floor(diff / 7) + 1;

  return Math.min(Math.max(raw, 1), PLAN.totalWeeks);
};

export const getWeek = (week: number) =>
  WEEKS.find((item) => item.week === week) ?? WEEKS[0];

export const memberStats = (snapshot: AppState, memberId: string) => {
  const done = snapshot.done[memberId] ?? [];

  const hours = Object.values(snapshot.hours[memberId] ?? {}).reduce(
    (sum, value) => sum + value,
    0
  );

  return {
    doneCount: done.length,
    totalCount: ALL_TOPICS.length,
    hours,
    ratio: ALL_TOPICS.length === 0 ? 0 : done.length / ALL_TOPICS.length,
  };
};
