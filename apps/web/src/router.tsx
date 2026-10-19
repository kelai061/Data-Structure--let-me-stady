import { QueryClientProvider } from "@tanstack/react-query";
import { createHashHistory, createRouter } from "@tanstack/react-router";
import type { RouterHistory } from "@tanstack/react-router";

import { Loader } from "#src/components/loader.tsx";
import { createQueryClient } from "#src/lib/query-client.ts";
import { routeTree } from "#src/routeTree.gen.ts";

export const createAppRouter = (history?: RouterHistory) => {
  const queryClient = createQueryClient();

  return createRouter({
    routeTree,
    // 用 hash 路由：纯静态托管（不支持 history fallback）也能直接刷新 /plan
    history: history ?? createHashHistory(),
    context: { queryClient },
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
    defaultPendingComponent: Loader,
    scrollRestoration: true,
    Wrap: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  });
};

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createAppRouter>;
  }
}
