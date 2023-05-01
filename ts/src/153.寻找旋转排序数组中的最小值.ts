/*
 * @lc app=leetcode.cn id=153 lang=typescript
 * https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array/
 * [153] 寻找旋转排序数组中的最小值
 */
// BINARYSEARCH

// @lc code=start
/** 目标是找到右单调区的最小值（右单调区的最左值） */
function findMin(nums: number[]): number {
  let [left, right] = [0, nums.length - 1];

  while (left < right) {
    const mid = (left + right) >>> 1;

    if (nums[mid] < nums[right]) {
      // 中点落在右单调区
      right = mid;
    } else {
      // 中点落在左单调区
      left = mid + 1;
    }
  }

  return nums[left];
}
// @lc code=end
