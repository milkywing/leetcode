/*
 * @lc app=leetcode.cn id=441 lang=typescript
 * https://leetcode.cn/problems/arranging-coins/description/
 * [441] 排列硬币
 */
// BINARYSEARCH

// @lc code=start
/**
 * 方案A（本解）：二分法，在 [1,n] 区间，取中点 mid，如果 n >= mid(1+mid)/2，继续对右边进行二分，知道 n < mid(1+mid)/2，此时 mid-1 为所求解
 * 方案B：可转换为数学问题，求等差数列和 x(1+x)/2 <= n 的解，并向下取整
 */
function arrangeCoins(n: number): number {
  let [left, right] = [1, n];

  while (left < right) {
    // 因为left = mid，所以这里取中点要偏右，否则有可能会陷入死循环
    const mid = (left + right + 1) >>> 1;
    if (n >= (mid * (mid + 1)) / 2) {
      left = mid;
    } else {
      right = mid - 1;
    }
  }

  return right;
}
// @lc code=end
