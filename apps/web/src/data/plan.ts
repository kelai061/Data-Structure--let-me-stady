/**
 * 学习计划的唯一数据源。
 * 内容来自 2026-10-17 三人的讨论录音整理稿，课程顺序对齐 labuladong 的算法教程。
 */

export type Level = "green" | "yellow" | "red";

type Phase = "tech" | "build";

export interface Topic {
  readonly detail: string;
  readonly id: string;
  readonly name: string;
  /** 只放实测可访问的 labuladong 章节地址 */
  readonly link?: string;
}

export interface WeekPlan {
  readonly deliverable: string;
  readonly goal: string;
  readonly hours: number;
  readonly level: Level;
  readonly phase: Phase;
  readonly title: string;
  readonly topics: readonly Topic[];
  readonly week: number;
}

const SITE = "https://labuladong.online";

const doc = {
  basic: `${SITE}/zh/algo/intro/data-structure-basic/`,
  bst: `${SITE}/zh/algo/data-structure/bst-part1/`,
  binarySearch: `${SITE}/zh/algo/essential-technique/binary-search-framework/`,
  binaryTree: `${SITE}/zh/algo/data-structure/binary-tree-part1/`,
  binaryTreeTraverse: `${SITE}/zh/algo/data-structure-basic/binary-tree-traverse-basic/`,
  bubbleSort: `${SITE}/zh/algo/data-structure-basic/bubble-sort/`,
  dijkstra: `${SITE}/zh/algo/data-structure/dijkstra/`,
  divide: `${SITE}/zh/algo/essential-technique/divide-and-conquer/`,
  editDistance: `${SITE}/zh/algo/dynamic-programming/edit-distance/`,
  graph: `${SITE}/zh/algo/data-structure-basic/graph-basic/`,
  graphTraverse: `${SITE}/zh/algo/data-structure-basic/graph-traverse-basic/`,
  heap: `${SITE}/zh/algo/data-structure-basic/binary-heap-basic/`,
  linkedList: `${SITE}/zh/algo/essential-technique/linked-list-skills-summary/`,
  lis: `${SITE}/zh/algo/dynamic-programming/longest-increasing-subsequence/`,
  monotonicStack: `${SITE}/zh/algo/data-structure/monotonic-stack/`,
  roadmap: `${SITE}/zh/roadmap/algo/`,
  slidingWindow: `${SITE}/zh/algo/essential-technique/sliding-window-framework/`,
  stackQueue: `${SITE}/zh/algo/data-structure/stack-queue/`,
  summary: `${SITE}/zh/algo/essential-technique/algorithm-summary/`,
  topologicalSort: `${SITE}/zh/algo/data-structure/topological-sort/`,
  twoPointers: `${SITE}/zh/algo/essential-technique/array-two-pointers-summary/`,
  unionFind: `${SITE}/zh/algo/data-structure/union-find/`,
} as const;

export const PLAN = {
  /** 计划总周数 */
  totalWeeks: 11,
  /** 技术学习周数 */
  techWeeks: 8,
  /** 课设周数 */
  buildWeeks: 3,
  /** 目标总学时 */
  targetHours: 52,
  /** 课程本身时长 */
  courseHours: 28,
  /** 每周投入 */
  hoursPerWeek: 6,
  /** 计划第 1 周对应的学期周次 */
  termStartWeek: 6,
  /** 课程出处 */
  courseName: "labuladong 的算法笔记",
  courseHome: `${SITE}/zh/algo/home/`,
  roadmap: doc.roadmap,
  beginnerPlan: `${SITE}/zh/algo/intro/beginner-learning-plan/`,
} as const;

export const LEVEL_META: Record<
  Level,
  { readonly label: string; readonly note: string }
> = {
  green: { label: "基础", note: "看一遍就能上手，重点是敲代码" },
  yellow: { label: "较难", note: "比较抽象，需要配合可视化理解" },
  red: { label: "硬骨头", note: "按双倍时间排，允许借后面的周" },
};

export const WEEKS: readonly [WeekPlan, ...WeekPlan[]] = [
  {
    week: 1,
    phase: "tech",
    level: "green",
    hours: 6,
    title: "链表与数组：先把地基补上",
    goal: "链表现在只掌握一半（有人才 20%），这周把它补到能默写。",
    deliverable:
      "手写单链表增删改查 + 反转；过一遍环形链表、合并两个有序链表。",
    topics: [
      {
        id: "w1t1",
        name: "数组与动态数组",
        detail: "随机访问 O(1)、扩容代价、头部插入为什么慢",
        link: doc.basic,
      },
      {
        id: "w1t2",
        name: "单链表全套操作",
        detail: "头插尾插、按值删除、反转、合并两条有序链表",
        link: doc.linkedList,
      },
      {
        id: "w1t3",
        name: "双链表与循环链表",
        detail: "「双链表」是结构，「双指针」是技巧，别搞混",
        link: doc.basic,
      },
      {
        id: "w1t4",
        name: "双指针技巧",
        detail: "快慢指针、环检测与环起点、倒数第 k 个、有序数组去重",
        link: doc.twoPointers,
      },
    ],
  },
  {
    week: 2,
    phase: "tech",
    level: "green",
    hours: 6,
    title: "栈、队列与哈希表",
    goal: "栈队列是「受限的数组/链表」，哈希是「用空间换时间」。",
    deliverable: "用栈写括号匹配与最小栈；用滑窗 + 哈希做无重复最长子串。",
    topics: [
      {
        id: "w2t1",
        name: "栈与队列",
        detail: "数组/链表两种实现、括号匹配、最小栈、双端队列",
        link: doc.stackQueue,
      },
      {
        id: "w2t2",
        name: "单调栈",
        detail: "下一个更大元素，一次遍历 O(n) 的套路",
        link: doc.monotonicStack,
      },
      {
        id: "w2t3",
        name: "滑动窗口",
        detail: "窗口扩张与收缩的固定框架，最小覆盖子串",
        link: doc.slidingWindow,
      },
      {
        id: "w2t4",
        name: "哈希表",
        detail: "冲突处理、HashMap/HashSet 的应用场景与复杂度",
        link: doc.basic,
      },
    ],
  },
  {
    week: 3,
    phase: "tech",
    level: "yellow",
    hours: 6,
    title: "二叉树：递归的分水岭",
    goal: "从这里开始，一切复杂结构都是递归。递归没过，后面全是天书。",
    deliverable: "默写前中后序 + 层序遍历；验证 BST、求 BST 第 k 小。",
    topics: [
      {
        id: "w3t1",
        name: "二叉树结构与三种遍历",
        detail: "前/中/后序的递归模板，什么时候「写在哪一步」",
        link: doc.binaryTreeTraverse,
      },
      {
        id: "w3t2",
        name: "层序遍历 BFS",
        detail: "队列 + 分层循环，按层收集结果",
        link: doc.binaryTree,
      },
      {
        id: "w3t3",
        name: "递归的两种思路",
        detail: "「遍历一遍」和「分解成子问题」是两套写法",
        link: doc.summary,
      },
      {
        id: "w3t4",
        name: "二叉搜索树 BST",
        detail: "中序有序、查找插入删除、如何验证一棵树是 BST",
        link: doc.bst,
      },
    ],
  },
  {
    week: 4,
    phase: "tech",
    level: "yellow",
    hours: 6,
    title: "堆、排序与二分",
    goal: "三个高频工具：堆取 TopK、排序练分治手感、二分管边界。",
    deliverable: "手写快排与归并排序；背下二分查找的三套边界模板。",
    topics: [
      {
        id: "w4t1",
        name: "二叉堆与优先队列",
        detail: "上浮下沉、建堆 O(n)、TopK 与前 k 个高频元素",
        link: doc.heap,
      },
      {
        id: "w4t2",
        name: "排序算法",
        detail: "冒泡/插入/选择/归并/快排/计数，重点吃透归并与快排",
        link: doc.bubbleSort,
      },
      {
        id: "w4t3",
        name: "二分查找",
        detail: "找左边界、找右边界、旋转数组、二分答案",
        link: doc.binarySearch,
      },
      {
        id: "w4t4",
        name: "前缀和与差分",
        detail: "区间求和 O(1)、区间加减 O(1)，二维版本先了解",
        link: doc.basic,
      },
    ],
  },
  {
    week: 5,
    phase: "tech",
    level: "yellow",
    hours: 6,
    title: "图：这周的成果要拿去汇报",
    goal: "本周要向老师讲清「图是什么、图上有什么算法」，所以必须能画出来。",
    deliverable: "对任意图写出 DFS/BFS；画一张图讲给另外两个人听。",
    topics: [
      {
        id: "w5t1",
        name: "图的存储",
        detail: "邻接表 vs 邻接矩阵、有向/无向/带权、节点与边的表示",
        link: doc.graph,
      },
      {
        id: "w5t2",
        name: "DFS 深度优先",
        detail: "递归 + 回溯、visited 标记、连通分量与环检测",
        link: doc.graphTraverse,
      },
      {
        id: "w5t3",
        name: "BFS 广度优先",
        detail: "队列推进、无权图最短边数、多源 BFS",
        link: doc.graphTraverse,
      },
      {
        id: "w5t4",
        name: "网格类问题",
        detail: "方向数组、岛屿数量、二维数组上的 DFS/BFS",
        link: doc.summary,
      },
    ],
  },
  {
    week: 6,
    phase: "tech",
    level: "red",
    hours: 8,
    title: "图进阶：最短路径",
    goal: "课设要用的就是这周的东西，学完立刻能变成 demo。",
    deliverable: "手写 Dijkstra；在一张小图上跑出最短路径并打印路线。",
    topics: [
      {
        id: "w6t1",
        name: "拓扑排序",
        detail: "DAG 上的依赖顺序，课程表问题，BFS 入度法",
        link: doc.topologicalSort,
      },
      {
        id: "w6t2",
        name: "并查集",
        detail: "连通性判断、路径压缩、按秩合并、Kruskal 前置",
        link: doc.unionFind,
      },
      {
        id: "w6t3",
        name: "Dijkstra 最短路",
        detail: "优先队列优化、单源最短路、为什么不能处理负权",
        link: doc.dijkstra,
      },
      {
        id: "w6t4",
        name: "最小生成树与 Floyd",
        detail: "Prim / Kruskal、多源最短路的三重循环",
        link: doc.graph,
      },
    ],
  },
  {
    week: 7,
    phase: "tech",
    level: "red",
    hours: 8,
    title: "回溯与分治",
    goal: "「一切算法的本质都是穷举」——这周就是学怎么聪明地穷举。",
    deliverable: "默写回溯模板，独立解出排列、组合、子集三类题。",
    topics: [
      {
        id: "w7t1",
        name: "回溯框架",
        detail: "做选择 → 递归 → 撤销选择，决策树长什么样",
        link: doc.summary,
      },
      {
        id: "w7t2",
        name: "剪枝与去重",
        detail: "可行性剪枝、排序后去重、N 皇后、解数独",
        link: doc.summary,
      },
      {
        id: "w7t3",
        name: "分治思想",
        detail: "归并排序、快速选择、把大问题劈成两半",
        link: doc.divide,
      },
      {
        id: "w7t4",
        name: "分治经典题",
        detail: "汉诺塔、大数乘法、最近点对（了解思路即可）",
        link: doc.divide,
      },
    ],
  },
  {
    week: 8,
    phase: "tech",
    level: "red",
    hours: 8,
    title: "动态规划：最后一块硬骨头",
    goal: "红色章节，按双倍时间排。推不出转移方程就先画表格。",
    deliverable: "独立推出 01 背包和 LIS 的转移方程；累计写完 10 道 DP。",
    topics: [
      {
        id: "w8t1",
        name: "DP 三要素",
        detail: "状态定义、选择、转移方程 + base case，先想暴力再降维",
        link: doc.summary,
      },
      {
        id: "w8t2",
        name: "线性 DP",
        detail: "斐波那契、打家劫舍、最大子数组和、股票买卖",
        link: doc.lis,
      },
      {
        id: "w8t3",
        name: "背包问题",
        detail: "01 背包、完全背包、一维滚动数组压缩",
        link: doc.lis,
      },
      {
        id: "w8t4",
        name: "序列 DP",
        detail: "LIS、LCS、编辑距离，两个字符串类的题都归这里",
        link: doc.editDistance,
      },
    ],
  },
  {
    week: 9,
    phase: "build",
    level: "yellow",
    hours: 0,
    title: "课设启动：先造数据，再谈算法",
    goal: "老师说得很直接：这个题最难的是数据。没有数据，算法跑不起来，结论也立不住。",
    deliverable: "一份能从文件读进程序的图数据 + 邻接表、邻接矩阵两套存储。",
    topics: [
      {
        id: "w9t1",
        name: "定题：最短路径实验平台",
        detail:
          "任意一张图，给定起终点，算出最短路径并展示；同时回答「不同存储、不同算法、不同权重，差多少」",
      },
      {
        id: "w9t2",
        name: "数据文件格式",
        detail:
          "用文本描述图：节点数、边数、每条边的两端与权重。程序要能读文件建图，不能写死在代码里",
      },
      {
        id: "w9t3",
        name: "数据集设计",
        detail:
          "稀疏图 / 稠密图 / 网格图 / 不连通图，各准备小、中、大三档，并写明每份数据用来验证什么",
      },
      {
        id: "w9t4",
        name: "图的两种存储",
        detail:
          "邻接表与邻接矩阵各实现一遍，记录建图耗时与内存，后面所有对比都基于这两套",
      },
    ],
  },
  {
    week: 10,
    phase: "build",
    level: "red",
    hours: 0,
    title: "算法库：最短路、生成树、拓扑",
    goal: "同一张图、同一份数据，把算法都跑一遍——重点是「最短路径的时间」。",
    deliverable: "一个算法库 + 一组能复现的结果表（算法 × 数据规模 × 耗时）。",
    topics: [
      {
        id: "w10t1",
        name: "最短路径三件套",
        detail:
          "BFS（无权）、Dijkstra（优先队列）、Floyd（多源），跑通并记录耗时",
      },
      {
        id: "w10t2",
        name: "最小生成树与可达性",
        detail:
          "Prim / Kruskal，先判断起终点是否连通；不可达时找关键点中转，再做二度规划",
      },
      {
        id: "w10t3",
        name: "拓扑检测",
        detail: "有向图上的依赖顺序，说清它在路径查找里起什么作用",
      },
      {
        id: "w10t4",
        name: "存储 × 算法对比",
        detail:
          "邻接表/矩阵 × BFS/Dijkstra/Floyd，在稀疏和稠密数据上各是什么表现",
      },
    ],
  },
  {
    week: 11,
    phase: "build",
    level: "red",
    hours: 0,
    title: "加权、可视化、出结论",
    goal: "老师要看的是「你观察到了什么」，不是「你抄了个 Dijkstra」。",
    deliverable: "可演示的平台 + 性能对比结论 + 第 17–18 周汇报的全套材料。",
    topics: [
      {
        id: "w11t1",
        name: "多权值",
        detail: "距离 / 拥堵 / 信号灯三套权重，同一张图换权重，看路线怎么变",
      },
      {
        id: "w11t2",
        name: "可视化",
        detail: "地图上画节点、边、高亮路线；校园地图做到楼层切换（1F → 5F）",
      },
      {
        id: "w11t3",
        name: "性能结论",
        detail:
          "同一张图不同算法、不同存储的耗时曲线，给出「什么时候该用哪种」的判断",
      },
      {
        id: "w11t4",
        name: "汇报材料",
        detail:
          "报告 + PPT + 演示视频；第 17–18 周按老师要求汇报时间安排与最终结果",
      },
    ],
  },
];

export const ALL_TOPICS: readonly Topic[] = WEEKS.flatMap((w) => w.topics);

export const TECH_WEEKS = WEEKS.filter((w) => w.phase === "tech");

export const BUILD_WEEKS = WEEKS.filter((w) => w.phase === "build");

/** 会议里达成一致的做法 */
export const RULES: readonly {
  readonly detail: string;
  readonly title: string;
}[] = [
  {
    title: "总周期 11 周，不排 12 周",
    detail:
      "学期第 5–17 周之间排 11 周（计划第 1 周 ≈ 学期第 6 周）。少排一周是为了留容错，超时才有地方借。",
  },
  {
    title: "8 周学技术 + 3 周做课设",
    detail:
      "前 8 周把数据结构与算法过完，后 3 周做创新提高（课设）。第 17–18 周自己总结。",
  },
  {
    title: "按 52 学时排，一周 6 小时",
    detail:
      "课程本身约 28 小时，加上理解、敲代码、刷题，按 50–52 小时算。周末抽一整天，3 小时一段，一周两段。",
  },
  {
    title: "各学各的，但每周碰一次头",
    detail:
      "平时各自推进，每周固定碰一次：谁不懂就现场讲一遍。讲不清说明没学会——这也是老师想要的效果。",
  },
  {
    title: "轮换主讲",
    detail: "每周换一个人当主讲，负责把本周内容讲给另外两个人听。",
  },
  {
    title: "汇报「能讲清什么」，不是「看了几小时」",
    detail:
      "老师每周检查进度。汇报模板：这周学了什么 → 它解决什么问题 → 我能画出/写出什么。",
  },
  {
    title: "红色章节按双倍时间",
    detail:
      "图进阶、分治、动态规划属于红色，一周 8 小时。绿色（链表、数组、栈队列）一周 6 小时就够。",
  },
  {
    title: "先定课程，再定顺序",
    detail:
      "课程统一用 labuladong 的算法教程，顺序按「数据结构 → 二叉树 → 图 → 回溯/分治 → 动态规划」走，因为一切数据结构的本质都是数组和链表。",
  },
  {
    title: "不被里程碑框住",
    detail:
      "老师原话：里程碑是他让 AI 生成的，只用来覆盖知识点、排验收顺序，「不要受困于里程碑」。真正的目标是做出一个能跑的实验平台，里程碑可以改。",
  },
  {
    title: "课设要结合实际场景",
    detail:
      "不能只交一个书本上的 Dijkstra。要么落到校园地图（含楼层），要么落到地下停车场车位引导——老师反复举的就是这两个例子。",
  },
];

/** 会议上明确还没定下来的事，下次碰头必须收口 */
export const OPEN_ITEMS: readonly string[] = [
  "三个人具体谁负责哪一块（数据、算法、可视化、文档）",
  "每周碰头的固定时间（周几、几点）",
  "课设数据来源的最终方案：AI 生成校园地图，还是找公开路网数据",
  "是否需要把进度做成共享的（目前是各自手机本地记录）",
  "10 月底第一次汇报讲什么：按现在的排期，那时才学完链表和栈队列，图还没碰。要不要先花两天把图算法速览一遍？",
];

export const MILESTONES: readonly {
  readonly detail: string;
  readonly title: string;
  readonly week: number;
}[] = [
  {
    week: 2,
    title: "10 月底 · 第一次汇报",
    detail:
      "老师说第一次汇报大概在 10 月底：三个人分开，把涉及的这些基础算法都先过一遍，能说清是什么、解决什么问题。不求精通。",
  },
  {
    week: 6,
    title: "图与最短路跑通",
    detail:
      "Dijkstra 能写能跑，校园地图第一版能出路线。这是整个课设的技术底座。",
  },
  {
    week: 8,
    title: "技术学习收尾",
    detail: "8 周学完，红色章节过一遍。从这一周开始，时间全部给课设。",
  },
  {
    week: 11,
    title: "课设收口",
    detail:
      "平台可演示、结论有数据支撑、材料齐。第 17–18 周按老师要求汇报时间安排与最终结果。",
  },
];

export const PROJECT = {
  title: "最短路径实验平台",
  subtitle: "校园地图 + 教学楼楼层导航",
  oneLine:
    "给任意一张图，输入起点终点，算出最短路径并展示出来；同时回答「不同存储、不同算法、不同权重下，快多少、差在哪」。",
  quote: "肯定不是局限于书本上的那些算法。",
  teacherWants: [
    "自己构造测试数据：多少稀疏图、多少稠密图，每份数据为了验证什么，要能说清",
    "图的两种存储都要做：邻接表 / 邻接矩阵，在稀疏和稠密上做出选择并给出理由",
    "规模大的图必须来自文件：要能读文件建图，不能把数据写死在代码里",
    "加权要能扩展：距离、拥堵、信号灯，多套权重迭代比较",
    "最小生成树、拓扑检测在路径查找里各起什么作用，要给出观察",
    "不可达怎么办：先判断连通性，找关键点中转，再做二度规划",
    "重点是「最短路径的时间」：同一张图不同算法、不同存储的耗时对比",
    "不能只抄书上的算法，要结合实际场景（地下停车场车位引导、教学楼 1F→5F）",
    "第 18 周汇报：自己的时间安排 + 最终想呈现的结果；结果中途可以改",
  ],
  dataDimensions: [
    "稀疏图",
    "稠密图",
    "网格图",
    "不连通图",
    "小 / 中 / 大三档规模",
    "单权值 / 多权值",
  ],
  pipeline: [
    { step: "造数据", detail: "按维度造图，写成文件，注明每份数据验证什么" },
    { step: "建图", detail: "读文件 → 邻接表 / 邻接矩阵两套存储" },
    {
      step: "跑算法",
      detail: "BFS / Dijkstra / Floyd / Prim / Kruskal / 拓扑",
    },
    { step: "出结论", detail: "耗时对比 + 加权实验 + 可视化演示" },
  ],
  outputs: [
    "一份图数据规范 + 覆盖稀疏/稠密/不连通的数据集",
    "邻接表与邻接矩阵两套存储实现",
    "算法库：最短路、最小生成树、拓扑排序、可达性判断",
    "可演示平台：选起终点 → 出路线，支持楼层切换",
    "性能对比结论：算法 × 存储 × 数据规模 的耗时表与曲线",
    "报告 + 答辩 PPT + 演示视频（第 17–18 周汇报用）",
  ],
  risk: [
    "数据量一上来就跑不动 → 先做 50–200 节点的小图，能跑通再放大",
    "只算距离画不出路线 → 用 parent 数组回溯，别只存 dist",
    "三个人各写各的对不上 → 第 9 周就把数据格式定死，之后只换实现",
    "只交一个 Dijkstra 会被问住 → 每个算法都要配一组「换存储/换权重」的对比数据",
  ],
} as const;
