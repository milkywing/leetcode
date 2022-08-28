/*
 * @lc app=leetcode.cn id=374 lang=typescript
 * https://leetcode.cn/problems/guess-number-higher-or-lower/description/
 * [374] 猜数字大小
 */
// BINARYSEARCH

// @lc code=start
function guessNumber(n: number): number {
  let [left, right] = [1, n];

  while (left <= right) {
    const mid = (left + right) >>> 1;
    if (guess(mid) === 0) return mid;
    if (guess(mid) < 0) right = mid - 1;
    else left = mid + 1;
  }

  return -1;
}
// @lc code=end
const guess = (num: number) => 0;
