import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Minus, Plus } from "lucide-react";

import { MemberSwitcher } from "#src/components/member-switcher.tsx";
import { MiniBar } from "#src/components/mini-bar.tsx";
import { ProgressRing } from "#src/components/progress-ring.tsx";
import { TopicRow } from "#src/components/topic-row.tsx";
import type { Level } from "#src/data/plan.ts";
import { LEVEL_META, PLAN, WEEKS } from "#src/data/plan.ts";
import {
  getWeek,
  memberStats,
  setWeekHours,
  useAppState,
  weekOfDate,
} from "#src/lib/store.ts";

const BAR_COLOR: Record<Level, string> = {
  green: "bg-tone-green",
  yellow: "bg-tone-yellow",
  red: "bg-tone-red",
};

const BAR_FILL: Record<Level, string> = {
  green: "fill-tone-green",
  yellow: "fill-tone-yellow",
  red: "fill-tone-red",
};

const StatTile = ({
  label,
  unit,
  value,
}: {
  readonly label: string;
  readonly unit: string;
  readonly value: string;
}) => (
  <div className="text-center">
    <p className="text-base leading-none font-semibold tabular-nums">
      {value}
      <span className="text-muted-foreground text-micro ml-0.5 font-normal">
        {unit}
      </span>
    </p>
    <p className="text-muted-foreground text-micro mt-1">{label}</p>
  </div>
);

const OverviewPage = () => {
  const state = useAppState();
  const memberId = state.activeMemberId;
  const currentWeek = weekOfDate(state.startDate);
  const plan = getWeek(currentWeek);
  const stats = memberStats(state, memberId);
  const doneSet = new Set(state.done[memberId]);
  const weekHours = state.hours[memberId]?.[String(currentWeek)] ?? 0;

  const finishedThisWeek = plan.topics.filter((topic) =>
    doneSet.has(topic.id)
  ).length;

  return (
    <div className="grid gap-4">
      <section className="bg-card ring-foreground/10 rounded-2xl p-4 ring-1">
        <div className="flex items-center gap-4">
          <ProgressRing ratio={stats.ratio}>
            <span className="text-lg leading-none font-semibold tabular-nums">
              {Math.round(stats.ratio * 100)}%
            </span>
            <span className="text-muted-foreground text-micro mt-0.5 block">
              总进度
            </span>
          </ProgressRing>
          <div className="min-w-0 flex-1">
            <p className="text-muted-foreground text-mini">
              第 {currentWeek}/{PLAN.totalWeeks} 周 · 学期第{" "}
              {PLAN.termStartWeek + currentWeek - 1} 周 ·{" "}
              {plan.phase === "tech" ? "技术学习" : "课设"}
            </p>
            <p className="mt-1 text-base leading-snug font-semibold text-balance">
              {plan.title}
            </p>
            <p className="text-muted-foreground mt-1 text-xs leading-relaxed text-pretty">
              {plan.goal}
            </p>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2 border-t pt-3">
          <StatTile
            label="已投入"
            unit={`/${PLAN.targetHours} 学时`}
            value={String(stats.hours)}
          />
          <StatTile
            label="知识点"
            unit={`/${stats.totalCount}`}
            value={String(stats.doneCount)}
          />
          <StatTile
            label="剩余"
            unit="周"
            value={String(Math.max(PLAN.totalWeeks - currentWeek, 0))}
          />
        </div>
      </section>

      <section className="bg-card ring-foreground/10 rounded-2xl p-4 ring-1">
        <div className="flex items-baseline justify-between">
          <h2 className="text-sm font-semibold">本周要做完的</h2>
          <span className="text-muted-foreground text-mini tabular-nums">
            {finishedThisWeek}/{plan.topics.length}
          </span>
        </div>
        <div className="divide-border mt-1 divide-y">
          {plan.topics.map((topic) => (
            <TopicRow
              done={doneSet.has(topic.id)}
              key={topic.id}
              topic={topic}
            />
          ))}
        </div>

        <div className="mt-2 flex items-center justify-between border-t pt-3">
          <div>
            <p className="text-xs font-medium">本周学时打卡</p>
            <p className="text-muted-foreground text-mini">
              目标 {plan.hours > 0 ? `${plan.hours}h` : "按课设进度"}，周末一天
              3h × 2 段
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              aria-label="减 1 小时"
              className="border-input hover:bg-muted cursor-pointer rounded-md border p-1.5 transition-colors"
              onClick={() => {
                setWeekHours(currentWeek, weekHours - 1);
              }}
              type="button"
            >
              <Minus className="size-3.5" />
            </button>
            <span className="w-8 text-center text-sm font-semibold tabular-nums">
              {weekHours}
              <span className="text-muted-foreground text-micro font-normal">
                h
              </span>
            </span>
            <button
              aria-label="加 1 小时"
              className="border-input hover:bg-muted cursor-pointer rounded-md border p-1.5 transition-colors"
              onClick={() => {
                setWeekHours(currentWeek, weekHours + 1);
              }}
              type="button"
            >
              <Plus className="size-3.5" />
            </button>
          </div>
        </div>
      </section>

      <section className="bg-card ring-foreground/10 rounded-2xl p-4 ring-1">
        <div className="flex items-baseline justify-between">
          <h2 className="text-sm font-semibold">11 周节奏</h2>
          <Link
            className="text-primary text-mini inline-flex items-center gap-0.5 font-medium"
            to="/plan"
          >
            看全部 <ArrowRight className="size-3" />
          </Link>
        </div>
        <div className="mt-3 grid grid-cols-11 gap-1">
          {WEEKS.map((item) => {
            const total = item.topics.length;

            const finished = item.topics.filter((topic) =>
              doneSet.has(topic.id)
            ).length;

            const ratio = total === 0 ? 0 : finished / total;

            return (
              <div className="flex flex-col items-center gap-1" key={item.week}>
                <MiniBar ratio={ratio} tone={BAR_FILL[item.level]} />
                <span
                  className={`text-micro tabular-nums ${
                    item.week === currentWeek
                      ? "text-primary font-semibold"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.week}
                </span>
              </div>
            );
          })}
        </div>
        <div className="text-muted-foreground text-micro mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
          {(["green", "yellow", "red"] as const).map((level) => (
            <span className="flex items-center gap-1" key={level}>
              <span className={`size-1.5 rounded-full ${BAR_COLOR[level]}`} />
              {LEVEL_META[level].label}
            </span>
          ))}
          <span className="ml-auto">1–8 周技术 · 9–11 周课设</span>
        </div>
      </section>

      <section className="bg-card ring-foreground/10 rounded-2xl p-4 ring-1">
        <div className="mb-2.5 flex items-baseline justify-between">
          <h2 className="text-sm font-semibold">三个人各自练到哪了</h2>
          <span className="text-muted-foreground text-micro">本机记录</span>
        </div>
        <MemberSwitcher />
        <div className="mt-3 grid gap-2">
          {state.members.map((member) => {
            const item = memberStats(state, member.id);

            return (
              <div className="flex items-center gap-2" key={member.id}>
                <span className="text-muted-foreground text-mini w-14 shrink-0 truncate">
                  {member.name}
                </span>
                <div className="flex-1">
                  <MiniBar ratio={item.ratio} tone="fill-primary" />
                </div>
                <span className="text-micro w-14 shrink-0 text-right tabular-nums">
                  {item.doneCount}/{item.totalCount} · {item.hours}h
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export const Route = createFileRoute("/")({
  component: OverviewPage,
});
