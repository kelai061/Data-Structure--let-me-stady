import type { QueryClient } from "@tanstack/react-query";
import {
  HeadContent,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";

import { Toaster } from "@ds-study-plan/ui/components/sonner";

import { AppHeader } from "#src/components/app-header.tsx";
import { BottomNav } from "#src/components/bottom-nav.tsx";

interface RouterContext {
  queryClient: QueryClient;
}

const RootLayout = () => (
  <ThemeProvider
    attribute="class"
    defaultTheme="light"
    disableTransitionOnChange
    scriptProps={{ type: "application/json" }}
  >
    <HeadContent />
    <div className="grid min-h-svh grid-rows-[auto_1fr]">
      <AppHeader />
      <main className="mx-auto w-full max-w-[520px] px-4 pt-4 pb-24">
        <Outlet />
      </main>
    </div>
    <BottomNav />
    <Toaster richColors />
  </ThemeProvider>
);

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      { title: "数据结构 11 周计划" },
      {
        name: "description",
        content:
          "三个人 11 周搞定数据结构：8 周学技术、3 周做课设，课程参考 labuladong。",
      },
    ],
  }),
  component: RootLayout,
});
