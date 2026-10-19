import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";

import { WeekCard } from "#src/components/week-card.tsx";
import { BUILD_WEEKS, MILESTONES, PLAN, TECH_WEEKS } from "#src/data/plan.ts";
import { useAppState, weekOfDate } from "#src/lib/store.ts";

const PlanPage = () => {
  const state = useAppState();
  const currentWeek = weekOfDate(state.startDate);
  const doneIds = state.done[state.activeMemberId] ?? [];

  return (
    <div className="grid gap-4">
      <section className="bg-card ring-foreground/10 rounded-2xl p-4 ring-1">
        <h1 className="text-base font-semibold">11 周怎么排</h1>
        <p className="text-muted-foreground mt-1 text-xs leading-relaxed text-pretty">
          前 {PLAN.techWeeks} 周按课程顺序过一遍，后 {PLAN.buildWeeks}{" "}
          周把图算法用进课设。红色是硬骨头，按双倍时间排。
        </p>
        <div className="mt-3 grid grid-cols-3 gap-2 border-t pt-3 text-center">
          <div>
            <p className="text-sm font-semibold tabular-nums">
              {PLAN.techWeeks}
              <span className="text-muted-foreground text-micro font-normal">
                周
              </span>
            </p>
            <p className="text-muted-foreground text-micro">学技术</p>
          </div>
          <div>
            <p className="text-sm font-semibold tabular-nums">
              {PLAN.targetHours}
              <span className="text-muted-foreground text-micro font-normal">
                学时
              </span>
            </p>
            <p className="text-muted-foreground text-micro">含理解与刷题</p>
          </div>
          <div>
            <p className="text-sm font-semibold tabular-nums">
              {PLAN.buildWeeks}
              <span className="text-muted-foreground text-micro font-normal">
                周
              </span>
            </p>
            <p className="text-muted-foreground text-micro">做课设</p>
          </div>
        </div>
        <a
          className="text-primary text-mini mt-3 inline-flex items-center gap-1 border-t pt-3 font-medium"
          href={PLAN.courseHome}
          rel="noreferrer"
          target="_blank"
        >
          课程出处：{PLAN.courseName} <ExternalLink className="size-3" />
        </a>
      </section>

      <section className="bg-card ring-foreground/10 rounded-2xl p-4 ring-1">
        <h2 className="text-sm font-semibold">四个卡点</h2>
        <p className="text-muted-foreground text-mini mt-1 leading-relaxed">
          汇报和验收都压在这四个时间点上，其余各周按节奏推进就行。
        </p>
        <ol className="mt-2.5 grid gap-2.5">
          {MILESTONES.map((item) => {
            const reached = currentWeek >= item.week;

            return (
              <li className="flex gap-2.5" key={item.title}>
                <span
                  className={`text-micro mt-0.5 grid size-5 shrink-0 place-content-center rounded-full font-semibold tabular-nums ${
                    reached
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {item.week}
                </span>
                <div>
                  <p className="text-xs leading-snug font-semibold">
                    {item.title}
                  </p>
                  <p className="text-muted-foreground text-mini mt-0.5 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <div>
        <h2 className="text-muted-foreground text-mini mb-2 px-1 font-medium tracking-wide">
          第一阶段 · 技术学习
        </h2>
        <div className="grid gap-2.5">
          {TECH_WEEKS.map((week) => (
            <WeekCard
              defaultOpen={week.week === currentWeek}
              doneIds={doneIds}
              isCurrent={week.week === currentWeek}
              key={week.week}
              week={week}
            />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-muted-foreground text-mini mb-2 px-1 font-medium tracking-wide">
          第二阶段 · 创新提高（课设）
        </h2>
        <div className="grid gap-2.5">
          {BUILD_WEEKS.map((week) => (
            <WeekCard
              defaultOpen={week.week === currentWeek}
              doneIds={doneIds}
              isCurrent={week.week === currentWeek}
              key={week.week}
              week={week}
            />
          ))}
        </div>
      </div>

      <p className="text-muted-foreground text-mini px-1 leading-relaxed">
        第 17–18 周按会议决定留给自己做总结，不排新内容。超时就从后面的周借，
        不往总周数上加。
      </p>
    </div>
  );
};

export const Route = createFileRoute("/plan")({
  component: PlanPage,
});
