/*
 * @lc app=leetcode.cn id=455 lang=typescript
 * https://leetcode.cn/problems/assign-cookies/description/
 * [455] 分发饼干
 */

// @lc code=start
/**
 * 贪心解法：
 * 按照孩子的胃口从小到大的顺序依次满足每个孩子，且对于每个孩子，应该选择可以满足这个孩子的胃口且尺寸最小的饼干
 */
function findContentChildren(g: number[], s: number[]): number {
  // 胃口和饼干都升序排序
  g.sort((a, b) => a - b);
  s.sort((a, b) => a - b);
  const cookieNum = s.length;
  let curCookieIndex = 0;
  let curKidIndex = 0;

  // 当前还有饼干，且还有没考虑的孩子
  while (curKidIndex < g.length && curCookieIndex < cookieNum) {
    // 当前饼干不能满足当前孩子，尝试找到能满足的最小饼干
    while (curCookieIndex < cookieNum && g[curKidIndex] > s[curCookieIndex]) {
      curCookieIndex++;
    }
    // 当前孩子找到了满足的最小饼干，
    if (curCookieIndex < cookieNum) {
      curKidIndex++;
      curCookieIndex++;
    }
  }

  return curKidIndex;
}
// @lc code=end
