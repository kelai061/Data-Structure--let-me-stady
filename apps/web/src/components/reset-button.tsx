import { RotateCcw } from "lucide-react";
import { useState } from "react";

import { resetProgress } from "#src/lib/store.ts";

export const ResetButton = () => {
  const [armed, setArmed] = useState(false);

  return (
    <button
      className={`text-mini mt-3 inline-flex cursor-pointer items-center gap-1.5 border-t pt-3 transition-colors ${
        armed ? "text-destructive font-medium" : "text-muted-foreground"
      }`}
      onBlur={() => {
        setArmed(false);
      }}
      onClick={() => {
        if (armed) {
          resetProgress();
          setArmed(false);

          return;
        }

        setArmed(true);
      }}
      type="button"
    >
      <RotateCcw className="size-3" />
      {armed ? "再点一次，确认清空" : "清空本机记录"}
    </button>
  );
};
