import { Link } from "@tanstack/react-router";
import { CalendarRange, LayoutGrid, ListChecks, Route } from "lucide-react";

const tabs = [
  { icon: LayoutGrid, label: "总览", to: "/" },
  { icon: CalendarRange, label: "周计划", to: "/plan" },
  { icon: Route, label: "课设", to: "/project" },
  { icon: ListChecks, label: "约定", to: "/rules" },
] as const;

export const BottomNav = () => (
  <nav className="bg-background/85 fixed inset-x-0 bottom-0 z-20 border-t backdrop-blur-lg">
    <div className="pb-safe mx-auto grid max-w-[520px] grid-cols-4 px-2 pt-1.5">
      {tabs.map(({ to, label, icon: Icon }) => (
        <Link
          activeOptions={{ exact: true }}
          activeProps={{ className: "text-primary" }}
          className="text-muted-foreground hover:text-foreground text-mini flex flex-col items-center gap-1 rounded-lg py-1.5 font-medium transition-colors"
          inactiveProps={{ className: "text-muted-foreground" }}
          key={to}
          to={to}
        >
          <Icon className="size-5" strokeWidth={1.9} />
          {label}
        </Link>
      ))}
    </div>
  </nav>
);
