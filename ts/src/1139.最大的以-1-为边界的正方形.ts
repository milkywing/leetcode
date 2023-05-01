/*
 * @lc app=leetcode.cn id=1139 lang=typescript
 * https://leetcode.cn/problems/largest-1-bordered-square/description/
 * [1139] 最大的以 1 为边界的正方形
 */

// @lc code=start
/**
 * 生成两个辅助数组：right[i][j] 表示 (i,j) 右方连续（包括自身）出现 1 的个数，down[i][j] 表示 (i,j) 下方连续（包括自身）出现 1 的个数，
 * 之后进行正方形判定时直接查表即可
 */
function largest1BorderedSquare(grid: number[][]) {
  const row = grid.length;
  const col = grid[0].length;

  const right = Array.from({ length: row + 1 }, () => Array(col + 1).fill(0));
  const down = Array.from({ length: row + 1 }, () => Array(col + 1).fill(0));

  // 生成 right 数组
  for (let i = 0; i < row; i++) {
    for (let j = col - 1; j >= 0; j--) {
      right[i][j] = grid[i][j] ? right[i][j + 1] + 1 : 0;
    }
  }

  // 生成 down 数组
  for (let j = 0; j < col; j++) {
    for (let i = row - 1; i >= 0; i--) {
      down[i][j] = grid[i][j] ? down[i + 1][j] + 1 : 0;
    }
  }

  let maxLen = 0;
  // 尝试并验证所有可能的正方形，并记录最大正方形
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      // 确定正方形的左上角点
      if (!grid[i][j]) continue;
      for (let k = 0; k <= Math.min(row - i, col - j); k++) {
        // 确定正方形边长，然后验证正方形
        if (right[i][j] >= k + 1 && down[i][j] >= k + 1 && right[i + k][j] >= k + 1 && down[i][j + k] >= k + 1) {
          maxLen = Math.max(maxLen, k + 1);
        }
      }
    }
  }

  return maxLen ** 2;
}
// @lc code=end
