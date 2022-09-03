/*
 * @lc app=leetcode.cn id=63 lang=typescript
 * https://leetcode.cn/problems/unique-paths-ii/
 * [63] 不同路径 II
 */
// DYNAMIC

// @lc code=start
/** 递归改动态规划 */
function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
  const [length1, length2] = [obstacleGrid.length, obstacleGrid[0].length];

  const dp = Array.from({ length: length1 }).map(() => Array(length2).fill(0));

  // 【注意】重点关注这里的初始化

  // 终点如果没有障碍，则终点到终点可达形成一条路径，否则不可达无路径
  dp[length1 - 1][length2 - 1] = obstacleGrid[length1 - 1][length2 - 1] ? 0 : 1;

  for (let i = length1 - 2; i >= 0; i--) {
    // 考虑最后一列的每一个位置，只能往下走，可达的条件是下方没有障碍（逆序填充）
    if (obstacleGrid[i][length2 - 1] === 1 || dp[i + 1][length2 - 1] === 0) {
      dp[i][length2 - 1] = 0;
    } else {
      dp[i][length2 - 1] = 1;
    }
  }

  for (let i = length2 - 1; i >= 0; i--) {
    // 考虑最后一行的每一个位置，只能往右走，可达的条件是右方没有障碍（逆序填充）
    if (obstacleGrid[length1 - 1][i] === 1 || dp[length1 - 1][i + 1] === 0) {
      dp[length1 - 1][i] = 0;
    } else {
      dp[length1 - 1][i] = 1;
    }
  }

  for (let row = length1 - 2; row >= 0; row--) {
    for (let col = length2 - 2; col >= 0; col--) {
      if (obstacleGrid[row][col]) {
        dp[row][col] = 0;
      } else {
        dp[row][col] = dp[row + 1][col] + dp[row][col + 1];
      }
    }
  }

  return dp[0][0];

  // 空间压缩
  // const dp = Array(length2).fill(0);
  // dp[length2 - 1] = obstacleGrid[length1 - 1][length2 - 1] ? 0 : 1;

  // for (let row = length1 - 1; row >= 0; row--) {
  //   for (let col = length2 - 1; col >= 0; col--) {
  //     if (obstacleGrid[row][col]) {
  //       dp[col] = 0;
  //     } else if (col + 1 < length2) {
  //       dp[col] += dp[col + 1];
  //     }
  //   }
  // }

  // return dp[0];
}

function uniquePathsWithObstaclesB(obstacleGrid: number[][]): number {
  return uniquePathsWithObstaclesCoreB(obstacleGrid, 0, 0, obstacleGrid.length - 1, obstacleGrid[0].length - 1);
}

const uniquePathsWithObstaclesCoreB = (
  obstacleGrid: number[][],
  x: number,
  y: number,
  desX: number,
  desY: number,
): number => {
  if (x > desX || y > desY) return 0;
  // 【注意】下面这两个顺序不能随便换
  if (obstacleGrid[x][y]) return 0;
  if (x === desX && y === desY) return 1;

  return (
    uniquePathsWithObstaclesCoreB(obstacleGrid, x + 1, y, desX, desY) +
    uniquePathsWithObstaclesCoreB(obstacleGrid, x, y + 1, desX, desY)
  );
};
// @lc code=end
