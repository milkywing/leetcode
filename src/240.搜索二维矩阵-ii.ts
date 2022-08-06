/*
 * @lc app=leetcode.cn id=240 lang=typescript
 * https://leetcode.cn/problems/search-a-2d-matrix-ii/description/
 * [240] 搜索二维矩阵 II
 */

// @lc code=start
/**
 * 从右上角开始，进行 Z 字查找（查找时只能向左或者向下运动直到找到目标值，如果查找时越界了，说明没有）
 * 0. 从右上角开始，rowIndex = 0, colIndex = matrix[0].length - 1
 * 1. 从 colIndex 开始向左进行行查找，往左找到第一个小于 target 的位置 rowIndex
 * 2. 从 rowIndex 开始向下进行列查找，找到第一个大于 target 的位置 colIndex
 * 3. 重复 1 和 2，直到 rowIndex 和 colIndex 越界或者找到目标值
 */
function searchMatrix(matrix: number[][], target: number): boolean {
  const rowNum = matrix.length;
  const colNum = matrix[0].length;
  let [rowIndex, colIndex] = [0, colNum - 1];

  while (rowIndex < rowNum && colIndex >= 0) {
    if (matrix[rowIndex][colIndex] === target) return true;
    if (matrix[rowIndex][colIndex] > target) {
      // 向左进行查找
      colIndex--;
    } else {
      // 向下进行列查找
      rowIndex++;
    }
  }

  // 越界说明找不到
  return false;
}
// @lc code=end
