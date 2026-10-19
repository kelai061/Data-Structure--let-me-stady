interface MiniBarProps {
  /** 0–1 */
  readonly ratio: number;
  /** Tailwind 的 fill-* 类名 */
  readonly tone: string;
}

/**
 * 细进度条。用 SVG 画，宽度靠 viewBox 换算，
 * 不用内联 style，也不用运行时拼 class。
 */
export const MiniBar = ({ ratio, tone }: MiniBarProps) => {
  const clamped = Math.min(Math.max(ratio, 0), 1);

  return (
    <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
      <svg
        aria-hidden="true"
        className="h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 6"
      >
        <rect className={tone} height="6" rx="3" width={clamped * 100} />
      </svg>
    </div>
  );
};
