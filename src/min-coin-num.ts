/** 给定一堆带面值的硬币（可能重复），和一个值，求组成这个值的最小硬币数 */
export const minCoinNum = (coins: number[], amount: number): number => {
  return minCoinNumCore(coins, 0, amount);
};

/**
 * [0..index-1] 上的硬币已做出选择（已确定要或不要），rest 表示还剩多少值需要凑出来，现在对于第 index 个硬币，做出要或不要的选择
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
