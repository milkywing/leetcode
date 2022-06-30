/*
 * @lc app=leetcode.cn id=70 lang=typescript
 *
 * [70] 爬楼梯
 */

// @lc code=start
function climbStairs(n: number): number {
  if (n === 1) return 1;
  if (n === 2) return 2;
  let frontValue = 1;
  let backValue = 2;
  let result = 0;
  for (let i = 3; i <= n; i++) {
    result = frontValue + backValue;
    frontValue = backValue;
    backValue = result;
  }

  return result;
}

/** 树形DP问题，很明显看出是斐波那契问题，可转化为矩阵快速幂求解 */
const climbStairs2 = (n: number): number => {
  if (n === 1) return 1;
  if (n === 2) return 2;
  return climbStairs(n - 1) + climbStairs(n - 2);
};
// @lc code=end
