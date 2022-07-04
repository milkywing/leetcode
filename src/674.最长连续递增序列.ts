/*
 * @lc app=leetcode.cn id=674 lang=typescript
 *
 * [674] 最长连续递增序列
 */

// @lc code=start
function findLengthOfLCIS(nums: number[]): number {
  let result = 1;
  // 当前最长连续递增序列
  let count = 1;
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i + 1] > nums[i]) {
      // 发现递增 count++
      count++;
    } else {
      // 递增被破坏，重置count
      count = 1;
    }
    // 记录最长连续递增序列
    result = Math.max(result, count);
  }

  return result;
}
// @lc code=end
