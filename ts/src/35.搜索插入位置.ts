/*
 * @lc app=leetcode.cn id=35 lang=typescript
 * https://leetcode.cn/problems/search-insert-position/description/
 * [35] 搜索插入位置
 */
// BINARYSEARCH

// @lc code=start
/** 找到第一个大于等于 target 的值的位置 */
function searchInsert(nums: number[], target: number): number {
  let [left, right] = [0, nums.length];

  while (left < right) {
    const mid = (left + right) >> 1;
    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return left;
}
// @lc code=end
