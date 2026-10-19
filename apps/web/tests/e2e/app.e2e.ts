import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

const visit = async (page: Page, path: string) => {
  await page.goto(path, { waitUntil: "networkidle" });
};

test("总览页给出本周任务和 11 周节奏", async ({ page }) => {
  await visit(page, "/");

  await expect(page.getByText("本周要做完的")).toBeVisible();
  await expect(page.getByText("11 周节奏")).toBeVisible();
});

test("勾选知识点会落盘，刷新后仍在", async ({ page }) => {
  await visit(page, "/");

  await expect(page.getByText("0/4")).toBeVisible();

  await page.getByRole("button", { name: /数组与动态数组/u }).click();
  await expect(page.getByText("1/4")).toBeVisible();

  await page.reload({ waitUntil: "networkidle" });
  await expect(page.getByText("1/4")).toBeVisible();
});

test("底部导航能进周计划和课设", async ({ page }) => {
  await visit(page, "/");

  await page.getByRole("link", { name: "周计划" }).click();
  await expect(page.getByText("11 周怎么排")).toBeVisible();

  await page.getByRole("link", { name: "课设" }).click();
  await expect(page.getByText("校园地图最短路径")).toBeVisible();
});

test("深色主题刷新后保留", async ({ page }) => {
  await visit(page, "/");

  await page.getByRole("button", { name: "切换主题" }).click();
  await page.getByRole("menuitemradio", { name: "深色" }).click();
  await expect(page.locator("html")).toHaveClass(/\bdark\b/u);

  await page.reload({ waitUntil: "networkidle" });
  await expect(page.locator("html")).toHaveClass(/\bdark\b/u);
});
