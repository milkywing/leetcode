/*
 * @lc app=leetcode.cn id=162 lang=typescript
 *
 * [162] 寻找峰值
 */

// @lc code=start
function findPeakElement(nums: number[]): number {
  const length = nums.length;
  if (length === 1) return 0;
  let [left, right] = [0, length - 1];

  while (left < right) {
    const mid = (left + right) >> 1;
    if (nums[mid] > nums[mid + 1]) {
      // [mid,mid+1]是单调下降，说明 mid 左侧（包含mid）肯定有峰值，在左半部分搜索
      right = mid;
    } else {
      // [mid,mid+1]是单调上升，说明 mid+1 右侧（含mid+1）肯定有峰值，在右半部分搜索
      left = mid + 1;
    }
  }

  return right;
}
// @lc code=end
