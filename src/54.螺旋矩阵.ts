/*
 * @lc app=leetcode.cn id=54 lang=typescript
 *
 * [54] 螺旋矩阵
 */

// @lc code=start
/**
 * 以左上角为原点建立坐标系，定一个左上角点(topLeftX,topLeftY)和右下角点(bottomRightX,bottomRightY)，
 * 两个点定义了一个矩形，从左上角点顺时针遍历矩形边上的点，把这些点放入一个数组，
 * 遍历完后让左上角点向右下方移动，让右下角点向左上方移动，如果两点位于同一行或同一列，遍历两点间的值；如果两点错开了，停止
 */
function spiralOrder(matrix: number[][]): number[] {
  const result: number[] = [];
  const rowNum = matrix.length;
  const colNum = matrix[0].length;
  let [topLeftX, topLeftY] = [0, 0];
  let [bottomRightX, bottomRightY] = [colNum - 1, rowNum - 1];

  while (topLeftX <= bottomRightX && topLeftY <= bottomRightY) {
    // 两点是同一列
    if (topLeftX === bottomRightX) {
      for (let y = topLeftY; y <= bottomRightY; y++) {
        result.push(matrix[y][topLeftX]);
      }
      break;
    }
    // 两点是同一列
    if (topLeftY === bottomRightY) {
      for (let x = topLeftX; x <= bottomRightX; x++) {
        result.push(matrix[topLeftY][x]);
      }
      break;
    }
    // 顺时针打印组成矩形的四条边
    let [x, y] = [topLeftX, topLeftY];
    while (x < bottomRightX) {
      result.push(matrix[y][x]);
      x++;
    }
    while (y < bottomRightY) {
      result.push(matrix[y][x]);
      y++;
    }
    while (x > topLeftX) {
      result.push(matrix[y][x]);
      x--;
    }
    while (y > topLeftY) {
      result.push(matrix[y][x]);
      y--;
    }
    topLeftX++;
    topLeftY++;
    bottomRightX--;
    bottomRightY--;
  }

  return result;
}
// @lc code=end
