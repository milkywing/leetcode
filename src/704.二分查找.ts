/*
 * @lc app=leetcode.cn id=704 lang=typescript
 * https://leetcode.cn/problems/binary-search/description/
 * [704] 二分查找
 */

// @lc code=start
function search(nums: number[], target: number): number {
  let [left, right] = [0, nums.length];

  while (left <= right) {
    const mid = (left + right) >> 1;
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1;
}
// @lc code=end
