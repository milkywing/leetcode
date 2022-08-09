/*
 * @lc app=leetcode.cn id=518 lang=typescript
 * https://leetcode.cn/problems/coin-change-2/description/
 * [518] 零钱兑换 II
 */

// @lc code=start
/**
 * 其实是【70.爬楼梯】变种，不再限制步幅，
 * 递归改动态规划：
 */
function change(amount: number, coins: number[]): number {
  // 空间压缩优化
  const dp: number[] = Array(amount + 1).fill(0);
  // baseCase填充
  dp[0] = 1;

  for (let coinIndex = coins.length - 1; coinIndex >= 0; coinIndex--) {
    for (let j = coins[coinIndex]; j <= amount; j++) {
      dp[j] += dp[j - coins[coinIndex]];
    }
  }

  return dp[amount];
}

const changeB = (amount: number, coins: number[]): number => {
  // 未空间压缩优化，行方向对应硬币，列方向对应
  const [rowNum, colNum] = [coins.length + 1, amount + 1];
  const dp: number[][] = Array.from({ length: rowNum }).map(() => Array(colNum).fill(0));

  // baseCase填充
  dp[coins.length][0] = 1;

  for (let rowIndex = coins.length - 1; rowIndex >= 0; rowIndex--) {
    for (let colIndex = 0; colIndex < colNum; colIndex++) {
      // 【优化】使用 preSum 省略了 1..n 张硬币的尝试的组合数量
      const preSum = colIndex - coins[rowIndex] < 0 ? 0 : dp[rowIndex][colIndex - coins[rowIndex]];
      dp[rowIndex][colIndex] = dp[rowIndex + 1][colIndex] + preSum;
    }
  }

  return dp[0][amount];
};

/**
 * 从左到右尝试模型：
 * i 表示当前正在考虑使用第 i 个硬币，可以选择使用任意个；rest 表示当前剩余找零数
 * 函数返回 [i..length-1] 范围硬币凑出 rest 的组合数量
 */
const changeCore = (coins: number[], index: number, rest: number) => {
  // baseCase：当所有硬币都考虑过后，如果剩余找零为 0，生成一个有效组合
  if (index === coins.length) return rest === 0 ? 1 : 0;

  let count = 0;
  // 考虑当前硬币 coins[index]，只要不超过剩余找零，就可以使用任意张面值为 arr[index] 的货币，
  // 统计累加每种张数选择下的组合数量
  for (let n = 0; n * coins[index] <= rest; n++) {
    count += changeCore(coins, index + 1, rest - n * coins[index]);
  }

  return count;
};
// @lc code=end
