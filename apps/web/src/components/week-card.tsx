import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { TopicRow } from "#src/components/topic-row.tsx";
import type { Level, WeekPlan } from "#src/data/plan.ts";
import { LEVEL_META } from "#src/data/plan.ts";

const LEVEL_CLASS: Record<Level, string> = {
  green: "bg-tone-green/10 text-tone-green ring-tone-green/25",
  yellow: "bg-tone-yellow/10 text-tone-yellow ring-tone-yellow/25",
  red: "bg-tone-red/10 text-tone-red ring-tone-red/25",
};

interface WeekCardProps {
  readonly defaultOpen?: boolean;
  readonly doneIds: readonly string[];
  readonly isCurrent: boolean;
  readonly week: WeekPlan;
}

export const WeekCard = ({
  week,
  doneIds,
  isCurrent,
  defaultOpen = false,
}: WeekCardProps) => {
  const [open, setOpen] = useState(defaultOpen);
  const done = new Set(doneIds);
  const finished = week.topics.filter((topic) => done.has(topic.id)).length;

  return (
    <div
      className={`bg-card overflow-hidden rounded-xl transition-shadow ${
        isCurrent ? "ring-primary/40 ring-2" : "ring-foreground/10 ring-1"
      }`}
    >
      <button
        className="flex w-full cursor-pointer items-start gap-3 p-3.5 text-left"
        onClick={() => {
          setOpen((prev) => !prev);
        }}
        type="button"
      >
        <span
          className={`grid size-9 shrink-0 place-content-center rounded-lg text-xs font-semibold ring-1 ${LEVEL_CLASS[week.level]}`}
        >
          W{week.week}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-1.5">
            <span className="truncate text-sm font-semibold">{week.title}</span>
            {isCurrent ? (
              <span className="bg-primary/10 text-primary text-micro shrink-0 rounded px-1.5 py-0.5 font-medium">
                本周
              </span>
            ) : null}
          </span>
          <span className="text-muted-foreground text-mini mt-0.5 flex items-center gap-2">
            <span>{week.phase === "tech" ? "技术学习" : "课设"}</span>
            <span className="bg-border h-3 w-px" />
            <span>{LEVEL_META[week.level].label}</span>
            {week.hours > 0 ? (
              <>
                <span className="bg-border h-3 w-px" />
                <span>{week.hours}h</span>
              </>
            ) : null}
            <span className="bg-border h-3 w-px" />
            <span>
              {finished}/{week.topics.length}
            </span>
          </span>
        </span>
        <ChevronDown
          className={`text-muted-foreground mt-1 size-4 shrink-0 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open ? (
        <div className="border-t px-3.5 pt-3 pb-3.5">
          <p className="bg-muted/60 text-muted-foreground mb-1 rounded-lg p-2.5 text-xs leading-relaxed">
            {week.goal}
          </p>
          <div className="divide-border divide-y">
            {week.topics.map((topic) => (
              <TopicRow
                done={done.has(topic.id)}
                key={topic.id}
                topic={topic}
              />
            ))}
          </div>
          <p className="text-muted-foreground mt-2 border-t pt-2.5 text-xs leading-relaxed">
            <span className="text-foreground font-medium">本周交付：</span>
            {week.deliverable}
          </p>
        </div>
      ) : null}
    </div>
  );
};
