/*
 * @lc app=leetcode.cn id=200 lang=typescript
 *
 * [200] 岛屿数量
 */

// @lc code=start
/** 使用队列广度遍历方案，遇到值为 1 的值就从该点执行广度遍历扩散 */
function numIslands(grid: string[][]): number {
  if (!grid.length) return 0;
  const rowLength = grid.length;
  const colLength = grid[0].length;
  let islandNum = 0;

  for (let i = 0; i < rowLength; i++) {
    for (let j = 0; j < colLength; j++) {
      // 寻找新的区域（岛）起点
      if (isOne(grid, i, j)) {
        // 区域遍历起点，岛数加 1
        islandNum++;
        grid[i][j] = '0';
        // 队列存放当前遍历点的相邻点位置
        const queue: [number, number][] = [[i, j]];
        while (queue.length) {
          const [row, col] = queue.shift()!;
          // 执行扩散操作，当前遍历点的非 0 的相邻点推入队列，并重置为 0，避免重复扩散
          if (row - 1 >= 0 && isOne(grid, row - 1, col)) {
            queue.push([row - 1, col]);
            grid[row - 1][col] = '0';
          }
          if (row + 1 < rowLength && isOne(grid, row + 1, col)) {
            queue.push([row + 1, col]);
            grid[row + 1][col] = '0';
          }
          if (col - 1 >= 0 && isOne(grid, row, col - 1)) {
            queue.push([row, col - 1]);
            grid[row][col - 1] = '0';
          }
          if (col + 1 < colLength && isOne(grid, row, col + 1)) {
            queue.push([row, col + 1]);
            grid[row][col + 1] = '0';
          }
        }
      }
    }
  }

  return islandNum;
}

/** 判断某一格是否是 1 */
const isOne = (grid: string[][], i: number, j: number): boolean => {
  return grid[i][j] === '1';
};
// @lc code=end
