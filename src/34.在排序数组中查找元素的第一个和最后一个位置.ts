/*
 * @lc app=leetcode.cn id=34 lang=typescript
 *
 * [34] 在排序数组中查找元素的第一个和最后一个位置
 */

// @lc code=start
/**
 * 先后找到 target 的左边界 leftIndex，检查左边界的值是否为 target，不满足直接返回 [-1,-1]，满足则寻找 rightIndex
 */
function searchRange(nums: number[], target: number): number[] {
  const length = nums.length;
  if (length === 0) return [-1, -1];
  if (length === 1) return nums[0] === target ? [0, 0] : [-1, -1];

  let [left, right] = [0, nums.length - 1];
  // 找到 target 的左边界 leftIndex，即找到第一个大于等于 target 的位置（参考【35】）
  while (left <= right) {
    const mid = (left + right) >> 1;
    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  // 左边界值不是 target，直接返回 [-1,-1]
  const leftIndex = left;
  if (nums[leftIndex] !== target) return [-1, -1];

  // 找到 target 的右边界 rightIndex，即第一个大于 target 的位置 - 1
  [left, right] = [0, nums.length - 1];
  while (left <= right) {
    const mid = (left + right) >> 1;
    if (nums[mid] <= target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  const rightIndex = left - 1;

  return [leftIndex, rightIndex];
}
// @lc code=end
