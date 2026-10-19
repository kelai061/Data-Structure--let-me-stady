import type { ReactNode } from "react";

interface ProgressRingProps {
  readonly children?: ReactNode;
  readonly ratio: number;
  readonly size?: number;
  readonly stroke?: number;
}

export const ProgressRing = ({
  ratio,
  size = 92,
  stroke = 9,
  children,
}: ProgressRingProps) => {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(Math.max(ratio, 0), 1);

  return (
    <div className="relative shrink-0">
      <svg
        aria-hidden="true"
        className="-rotate-90"
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        width={size}
      >
        <circle
          className="stroke-muted"
          cx={size / 2}
          cy={size / 2}
          fill="none"
          r={radius}
          strokeWidth={stroke}
        />
        <circle
          className="stroke-primary transition-all duration-700 ease-out"
          cx={size / 2}
          cy={size / 2}
          fill="none"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - clamped)}
          strokeLinecap="round"
          strokeWidth={stroke}
        />
      </svg>
      <div className="absolute inset-0 grid place-content-center text-center">
        {children}
      </div>
    </div>
  );
};
