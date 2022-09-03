/*
 * @lc app=leetcode.cn id=322 lang=typescript
 * https://leetcode.cn/problems/coin-change/description/
 * [322] 零钱兑换
 */
// DYNAMIC

// @lc code=start
/** 递归改动态规划 */
function coinChange(coins: number[], amount: number): number {
  // 空间压缩优化
  const dp: number[] = Array(amount + 1).fill(+Infinity);
  // baseCase填充
  dp[0] = 0;

  for (let coinIndex = coins.length - 1; coinIndex >= 0; coinIndex--) {
    for (let j = coins[coinIndex]; j <= amount; j++) {
      dp[j] = Math.min(dp[j], 1 + dp[j - coins[coinIndex]]);
    }
  }

  return dp[amount] === +Infinity ? -1 : dp[amount];
}

const coinChangeB = (coins: number[], amount: number): number => {
  const result = minCoinNumCore(coins, 0, amount);
  return result === +Infinity ? -1 : result;
};

/**
 * 从左到右尝试模型（会超时）
 * i 表示当前正在考虑使用第 i 个硬币，可以选择使用任意个；rest 表示当前剩余找零数
 * 函数返回 [i..length-1] 范围硬币凑出 rest 的最低硬币数，如果没法凑出，返回正无穷
 */
const minCoinNumCore = (coins: number[], index: number, rest: number): number => {
  // 下面的逻辑已经确保 rest 不会小于0

  // baseCase：如果硬币考虑完后 rest 为 0，说明是一种有效组合；否则返回负无穷表示无效组合
  if (index === coins.length) {
    return rest === 0 ? 0 : +Infinity;
  }

  let minCount = minCoinNumCore(coins, index + 1, rest);
  // 使用当前硬币时在总值不超过 rest 时可以用若干个
  for (let n = 1; n * coins[index] <= rest; n++) {
    // minCoinNumCore 无效组合时会返回正无穷，在 Math.min 时会被自动跳过
    minCount = Math.min(minCount, n + minCoinNumCore(coins, index + 1, rest - n * coins[index]));
  }

  return minCount;
};
// @lc code=end
