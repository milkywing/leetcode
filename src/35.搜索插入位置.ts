/*
 * @lc app=leetcode.cn id=35 lang=typescript
 *
 * [35] 搜索插入位置
 */

// @lc code=start
/** 找到第一个大于等于 target 的值的位置 */
function searchInsert(nums: number[], target: number): number {
  let [left, right] = [0, nums.length];

  while (left <= right) {
    const mid = (left + right) >> 1;
    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return left;
}
// @lc code=end
