# 数据结构 11 周计划

三个人的数据结构学习计划，做成手机网页：总览进度、11 周排期、课设方案、组内约定。

内容来自两份转写稿的整理（三人讨论 + 老师第二节课的题目讲解），课程顺序对齐
[labuladong 的算法笔记](https://labuladong.online/zh/algo/home/)。

| Layer     | Choice                                                    |
| --------- | --------------------------------------------------------- |
| Frontend  | React 19, TanStack Router, TanStack Query, Tailwind CSS 4 |
| UI        | shadcn/ui on Base UI, in `packages/ui`                    |
| Toolchain | Vite+ (`vp`): dev, build, test, lint, format, type check  |

## 页面

| 路由       | 内容                                                     |
| ---------- | -------------------------------------------------------- |
| `/`        | 总进度环、本周任务与学时打卡、11 周节奏条、三人完成度    |
| `/plan`    | 四个卡点 + 8 周技术学习 + 3 周课设，逐周可展开勾选知识点 |
| `/project` | 课设「最短路径实验平台」：老师的要求、数据维度、三周排期 |
| `/rules`   | 组内约定、每周汇报模板、还没定的事、清空本机记录         |

数据全部存在浏览器本地，不需要登录和后端。存储格式见
`apps/web/src/lib/store.ts` 顶部注释。

## Getting started

```sh
pnpm install --node-linker=hoisted
vp run dev
```

Open http://localhost:5173.

> **Windows 注意**：如果 `pnpm install` 之后 `vp` 报
> `Cannot find module ...\node_modules\vite-plus\bin\vp`，说明包链接没建起来（没有符号链接权限时会这样）。
> 加 `--node-linker=hoisted` 重装即可，本项目当前就是按这个布局装好的，直接 `vp run dev` 就能跑。
>
> 这个环境下 `vp dev` 可能被安全策略拦住（Vite 要批量删 `node_modules/.vite/deps_temp_*`）。
> 遇到就改用 `vp build && vp preview`，产物一样。

## Commands

```sh
vp check          # format, lint, type check
vp run knip       # unused files, exports, dependencies, and catalog entries
vp test           # unit tests (Vitest)
vp run test:e2e   # end-to-end tests (Playwright) in Chromium, against the dev server
vp run ready      # check + knip + test + test:e2e + production build
```

The first `vp run test:e2e` needs a browser: `cd apps/web && vp exec playwright install chromium`.

## 改内容

计划文字集中在 `apps/web/src/data/plan.ts`：`WEEKS`（11 周）、`MILESTONES`（四个卡点）、
`RULES`（约定）、`OPEN_ITEMS`（待定）、`PROJECT`（课设）。改这个文件就够了，页面会自动跟着变。
