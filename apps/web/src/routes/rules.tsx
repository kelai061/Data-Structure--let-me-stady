import { createFileRoute } from "@tanstack/react-router";
import { HelpCircle } from "lucide-react";

import { ResetButton } from "#src/components/reset-button.tsx";
import { OPEN_ITEMS, PLAN, RULES } from "#src/data/plan.ts";

const RulesPage = () => (
  <div className="grid gap-4">
    <section className="bg-card ring-foreground/10 rounded-2xl p-4 ring-1">
      <h1 className="text-base font-semibold">我们定下来的做法</h1>
      <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
        以下每一条都来自我们那天的讨论和老师的两次指教，不是拍脑袋加的。有异议就改这里，别各说各的。
      </p>
      <ol className="mt-3 grid gap-3">
        {RULES.map((rule, index) => (
          <li className="flex gap-2.5" key={rule.title}>
            <span className="bg-primary/10 text-primary text-micro mt-0.5 grid size-5 shrink-0 place-content-center rounded-full font-semibold tabular-nums">
              {index + 1}
            </span>
            <div>
              <p className="text-xs leading-snug font-semibold">{rule.title}</p>
              <p className="text-muted-foreground text-mini mt-0.5 leading-relaxed">
                {rule.detail}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>

    <section className="bg-card ring-foreground/10 rounded-2xl p-4 ring-1">
      <h2 className="text-sm font-semibold">每周汇报怎么说</h2>
      <p className="text-muted-foreground text-mini mt-1 leading-relaxed">
        老师检查的是「有没有真懂」，不是「学了几小时」。按这四句说就够了：
      </p>
      <div className="bg-muted/60 text-mini mt-2 grid gap-1 rounded-lg p-3 leading-relaxed">
        <p>1. 这周学了什么（名词说清楚）</p>
        <p>2. 它解决什么问题（举一个具体场景）</p>
        <p>3. 我能画出 / 写出什么（现场画或写代码）</p>
        <p>4. 还卡在哪（卡住的地方就是下周重点）</p>
      </div>
    </section>

    <section className="bg-card ring-foreground/10 rounded-2xl p-4 ring-1">
      <h2 className="flex items-center gap-1.5 text-sm font-semibold">
        <HelpCircle className="text-tone-yellow size-3.5" />
        还没定的事
      </h2>
      <p className="text-muted-foreground text-mini mt-1 leading-relaxed">
        这些会上提了但没结论，下次碰头必须收口，否则后面一定扯皮。
      </p>
      <ul className="mt-2 grid gap-1.5">
        {OPEN_ITEMS.map((item) => (
          <li
            className="border-border text-mini rounded-lg border border-dashed px-2.5 py-2 leading-relaxed"
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </section>

    <section className="bg-card ring-foreground/10 rounded-2xl p-4 ring-1">
      <h2 className="text-sm font-semibold">这份计划的出处</h2>
      <p className="text-muted-foreground text-mini mt-1 leading-relaxed">
        内容整理自两份转写稿：《数据结构_我们的学习计划_整理版.md》（三人讨论，定下总周数、8+3
        的结构、52
        学时、每周碰头）和《数据结构老师的语音指教_第2节课_整理版.md》（老师讲题目、要数据和结论）。课程顺序对齐{" "}
        {PLAN.courseName}
        。每周具体学什么、多少小时，是这份计划补充的排期，可以改。
      </p>
      <ResetButton />
    </section>
  </div>
);

export const Route = createFileRoute("/rules")({
  component: RulesPage,
});
