/*
 * @lc app=leetcode.cn id=62 lang=typescript
 *
 * [62] 不同路径
 */

// @lc code=start
/** 递归改表查询动态规划 */
function uniquePaths(m: number, n: number): number {
  const dp = Array.from({ length: m }, () => Array.from({ length: n }, () => 0));

  for (let i = 0; i < m; i++) dp[i][n - 1] = 1;
  for (let i = 0; i < n; i++) dp[m - 1][i] = 1;

  for (let i = m - 2; i >= 0; i--) {
    for (let j = n - 2; j >= 0; j--) {
      dp[i][j] = dp[i + 1][j] + dp[i][j + 1];
    }
  }

  return dp[0][0];
}

/** 递归版本，从(row,col)出发，前往(m-1,n-1)的走法数量 */
const uniquePathsCore = (m: number, n: number, row: number, col: number): number => {
  if (row >= m || col >= n) return 0;
  if (row === m - 1 && col === n - 1) return 1;

  return uniquePathsCore(m, n, row + 1, col) + uniquePathsCore(m, n, row, col + 1);
};
// @lc code=end
