import { ExternalLink } from "lucide-react";

import { Checkbox } from "@ds-study-plan/ui/components/checkbox";

import type { Topic } from "#src/data/plan.ts";
import { toggleTopic } from "#src/lib/store.ts";

interface TopicRowProps {
  readonly done: boolean;
  readonly topic: Topic;
}

export const TopicRow = ({ topic, done }: TopicRowProps) => (
  <div className="flex items-start gap-3 py-2.5">
    <Checkbox
      checked={done}
      className="mt-0.5"
      onCheckedChange={() => {
        toggleTopic(topic.id);
      }}
    />
    <button
      className="min-w-0 flex-1 cursor-pointer text-left"
      onClick={() => {
        toggleTopic(topic.id);
      }}
      type="button"
    >
      <span
        className={`block text-sm leading-snug font-medium ${
          done ? "text-muted-foreground line-through" : ""
        }`}
      >
        {topic.name}
      </span>
      <span className="text-muted-foreground mt-0.5 block text-xs leading-relaxed">
        {topic.detail}
      </span>
    </button>
    {topic.link === undefined ? null : (
      <a
        aria-label={`打开 ${topic.name} 的课程章节`}
        className="text-muted-foreground hover:text-primary mt-1 shrink-0 transition-colors"
        href={topic.link}
        rel="noreferrer"
        target="_blank"
      >
        <ExternalLink className="size-3.5" />
      </a>
    )}
  </div>
);
