/*
 * @lc app=leetcode.cn id=867 lang=typescript
 * https://leetcode.cn/problems/transpose-matrix/description/
 * [867] 转置矩阵
 */

// @lc code=start
/** 简单的矩阵转置 */
function transpose(matrix: number[][]): number[][] {
  const rowNum = matrix.length;
  const colNum = matrix[0].length;
  const result: number[][] = Array.from({ length: colNum }, () => Array.from({ length: rowNum }, () => 0));

  for (let i = 0; i < rowNum; i++) {
    for (let j = 0; j < colNum; j++) {
      result[j][i] = matrix[i][j];
    }
  }

  return result;
}
// @lc code=end
