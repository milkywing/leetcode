/*
 * @lc app=leetcode.cn id=1423 lang=typescript
 * https://leetcode.cn/problems/maximum-points-you-can-obtain-from-cards/description/
 * [1423] 可获得的最大点数
 */

// @lc code=start
/**
 * 无论怎么拿，最后剩下的点数肯定是连续的，可以使用滑动窗口求区域和的最小值，
 * 获取和最大值 = 总点数合 - 区域和最小值
 */
function maxScore(cardPoints: number[], k: number): number {
  const pointLength = cardPoints.length;
  // 滑动窗口大小 pointLength - k
  const windowSize = pointLength - k;
  // 将滑动窗口放在最左侧，开始向右滑动
  let curWindowSum = cardPoints.slice(0, windowSize).reduce((acc, cur) => acc + cur, 0);
  let minWindowSum = curWindowSum;

  // 总点数和
  let totalPointSum = curWindowSum;

  for (let i = windowSize; i < pointLength; i++) {
    // 窗口每向右滑一位，增加从右侧进入窗口的元素值，并减少从左侧离开窗口的元素值
    curWindowSum += cardPoints[i] - cardPoints[i - windowSize];
    totalPointSum += cardPoints[i];
    // 记住当前窗口的最小值
    minWindowSum = Math.min(minWindowSum, curWindowSum);
  }

  return totalPointSum - minWindowSum;
}
// @lc code=end
