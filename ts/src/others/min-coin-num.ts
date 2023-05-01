/**
 * 【问题】给定一堆带面值的硬币（可能重复）coins，和一个值 amount，求组成这个值的最小硬币数
 */
export const minCoinNum = (coins: number[], amount: number): number => {
  return minCoinNumCore(coins, 0, amount);
};

/**
 * 从左到右尝试模型：
 * index 表示当前正在考虑是否使用面值的索引，还剩 [index+1..length-1] 范围的面值没考虑，rest 表示当要达到 amount 还差的值
 * 函数返回基于 [index..length-1] 范围内面值， 还差 rest 情况下使用的最小硬币数
 */
const minCoinNumCore = (coins: number[], index: number, rest: number): number => {
  // baseCase1：如果已经凑出来了，则不需要硬币了，提前终止
  if (rest === 0) return 0;
  // baseCase2：如果已经凑过头了（不管硬币选完没有），说明本次组合是凑不出来的，提前终止，返回正无穷
  if (rest < 0) return +Infinity;

  // baseCase3：这里 rest>0，硬币选完了，凑不出来，返回正无穷
  if (index === coins.length) {
    return +Infinity;
  }

  const withoutCoin = minCoinNumCore(coins, index + 1, rest);
  const withCoin = 1 + minCoinNumCore(coins, index + 1, rest - coins[index]);
  return Math.min(withoutCoin, withCoin);
};

/** 递归改表查询动态规划 */
const minCoinNumDp = (coins: number[], amount: number) => {
  const coinNum = coins.length;
  // 行-index；列-rest
  const dp: number[][] = Array.from({ length: coinNum + 1 }, () => Array.from({ length: amount + 1 }));

  // 两个 baseCase 初始化
  for (let i = 0; i <= coinNum; i++) {
    dp[i][0] = 0;
  }
  for (let i = 1; i <= amount; i++) {
    dp[coinNum][i] = +Infinity;
  }

  // 从下至上，从左到右填表
  for (let index = coinNum - 1; index >= 0; index--) {
    for (let rest = 1; rest <= amount; rest++) {
      const withoutCoin = dp[index + 1][rest];
      const withCoin = 1 + (dp[index + 1][rest - coins[index]] ?? +Infinity);
      dp[index][rest] ??= Math.min(withoutCoin, withCoin);
    }
  }

  return dp[0][amount];
};
