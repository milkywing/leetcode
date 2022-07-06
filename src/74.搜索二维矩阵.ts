/*
 * @lc app=leetcode.cn id=74 lang=typescript
 *
 * [74] 搜索二维矩阵
 */

// @lc code=start
/** 先在第一列上对行进行二分搜索找到目标行，再在目标行上进行二分搜索找目标值 */
function searchMatrix(matrix: number[][], target: number): boolean {
  const rowNum = matrix.length;
  const colNum = matrix[0].length;

  // 通过二分法找到最后一个小于等于目标值的行
  let [upper, lower] = [0, rowNum - 1];
  while (upper < lower) {
    const mid = Math.floor((upper + lower + 1) / 2);
    if (matrix[mid][0] === target) return true;
    if (matrix[mid][0] > target) {
      lower = mid - 1;
    } else {
      upper = mid;
    }
  }

  const targetRow = upper;

  // 再在目标行上进行二分搜索找目标值
  let [left, right] = [0, colNum - 1];
  while (left <= right) {
    const mid = Math.floor((left + right + 1) / 2);
    if (matrix[targetRow][mid] === target) {
      return true;
    }
    if (matrix[targetRow][mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return false;
}
// @lc code=end
