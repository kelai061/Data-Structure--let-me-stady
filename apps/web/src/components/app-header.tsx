import { ModeToggle } from "#src/components/mode-toggle.tsx";

export const AppHeader = () => (
  <header className="bg-background/85 sticky top-0 z-20 border-b backdrop-blur-lg">
    <div className="mx-auto flex h-14 max-w-[520px] items-center gap-2 px-4">
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold tracking-tight">
          数据结构 · 11 周计划
        </p>
        <p className="text-muted-foreground text-mini truncate">
          8 周学技术 · 3 周做课设 · 参考 labuladong
        </p>
      </div>
      <ModeToggle />
    </div>
  </header>
);
