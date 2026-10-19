import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, CheckCircle2, Quote } from "lucide-react";

import { WeekCard } from "#src/components/week-card.tsx";
import { BUILD_WEEKS, PROJECT } from "#src/data/plan.ts";
import { useAppState, weekOfDate } from "#src/lib/store.ts";

const ProjectPage = () => {
  const state = useAppState();
  const currentWeek = weekOfDate(state.startDate);
  const doneIds = state.done[state.activeMemberId] ?? [];

  return (
    <div className="grid gap-4">
      <section className="bg-card ring-foreground/10 rounded-2xl p-4 ring-1">
        <p className="text-muted-foreground text-mini">课设选题</p>
        <h1 className="mt-1 text-lg font-semibold tracking-tight">
          {PROJECT.title}
        </h1>
        <p className="text-primary mt-0.5 text-xs font-medium">
          {PROJECT.subtitle}
        </p>
        <p className="text-muted-foreground mt-2 text-xs leading-relaxed text-pretty">
          {PROJECT.oneLine}
        </p>
        <blockquote className="border-primary/30 mt-3 flex gap-2 border-l-2 pl-2.5">
          <Quote className="text-primary/40 mt-0.5 size-3 shrink-0" />
          <p className="text-muted-foreground text-mini leading-relaxed">
            {PROJECT.quote}
            <span className="text-muted-foreground/70"> —— 老师</span>
          </p>
        </blockquote>
      </section>

      <section className="bg-card ring-foreground/10 rounded-2xl p-4 ring-1">
        <h2 className="text-sm font-semibold">老师要的东西</h2>
        <p className="text-muted-foreground text-mini mt-1 leading-relaxed">
          这一页是从老师第二节课的语音里逐条拆出来的，验收基本按这个来。
        </p>
        <ol className="mt-2.5 grid gap-2">
          {PROJECT.teacherWants.map((item, index) => (
            <li className="flex gap-2.5" key={item}>
              <span className="bg-accent text-accent-foreground text-micro mt-0.5 grid size-4.5 shrink-0 place-content-center rounded-full font-semibold tabular-nums">
                {index + 1}
              </span>
              <p className="text-xs leading-relaxed">{item}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-card ring-foreground/10 rounded-2xl p-4 ring-1">
        <h2 className="text-sm font-semibold">数据至少要覆盖这些维度</h2>
        <p className="text-muted-foreground text-mini mt-1 leading-relaxed">
          老师最在意的是数据：「你得告诉我，你的测试数据都是什么样子，它为了验证什么。」
        </p>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {PROJECT.dataDimensions.map((item) => (
            <span
              className="bg-muted text-muted-foreground text-mini rounded-full px-2.5 py-1"
              key={item}
            >
              {item}
            </span>
          ))}
        </div>
        <div className="mt-3 grid gap-2 border-t pt-3">
          {PROJECT.pipeline.map((item, index) => (
            <div className="flex items-start gap-2.5" key={item.step}>
              <span className="bg-primary/10 text-primary text-micro mt-0.5 grid size-5 shrink-0 place-content-center rounded-full font-semibold">
                {index + 1}
              </span>
              <p className="text-xs leading-relaxed">
                <span className="font-medium">{item.step}</span>
                <span className="text-muted-foreground"> · {item.detail}</span>
              </p>
            </div>
          ))}
        </div>
      </section>

      <div>
        <h2 className="text-muted-foreground text-mini mb-2 px-1 font-medium tracking-wide">
          三周排期
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

      <section className="bg-card ring-foreground/10 rounded-2xl p-4 ring-1">
        <h2 className="text-sm font-semibold">最后要交出来的东西</h2>
        <ul className="mt-2 grid gap-1.5">
          {PROJECT.outputs.map((item) => (
            <li
              className="flex items-start gap-2 text-xs leading-relaxed"
              key={item}
            >
              <CheckCircle2 className="text-success mt-0.5 size-3.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-card ring-foreground/10 rounded-2xl p-4 ring-1">
        <h2 className="flex items-center gap-1.5 text-sm font-semibold">
          <AlertTriangle className="text-tone-yellow size-3.5" />
          会踩的坑
        </h2>
        <ul className="mt-2 grid gap-1.5">
          {PROJECT.risk.map((item) => (
            <li
              className="text-muted-foreground text-xs leading-relaxed"
              key={item}
            >
              · {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export const Route = createFileRoute("/project")({
  component: ProjectPage,
});
