/*
 * @lc app=leetcode.cn id=122 lang=typescript
 * https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/description/
 * [122] 买卖股票的最佳时机 II
 */

// @lc code=start
/** 把所有上升区间的钱都赚了就行了 */
function maxProfit(prices: number[]): number {
  let result = 0;

  for (let i = 0; i < prices.length - 1; i++) {
    if (prices[i + 1] > prices[i]) result += prices[i + 1] - prices[i];
  }

  return result;
}
// @lc code=end
