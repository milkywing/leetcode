/*
 * @lc app=leetcode.cn id=33 lang=typescript
 *
 * [33] 搜索旋转排序数组
 */

// @lc code=start
/** 旋转后的数组会形成左右两个单调区域，在二分取中点时，需要先确定中点在左单调区还是右单调区 */
function search(nums: number[], target: number): number {
  const length = nums.length;
  if (length === 0) return -1;
  if (length === 1) return nums[0] === target ? 0 : -1;
  let [left, right] = [0, length - 1];

  while (left <= right) {
    const mid = (left + right) >> 1;
    if (nums[mid] === target) return mid;
    if (nums[mid] >= nums[left]) {
      // 说明中点在左单调区，[left..mid] 肯定是单调的，如果 target 在这个范围内，移动右指针收缩范围，
      // 否则移动左指针
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
      // 下面是中点在右单调区，[mid...right] 肯定是单调的，如果 target 在这个范围内，移动左指针收缩范围
      // 否则移动右指针
    } else if (nums[mid] < target && target <= nums[right]) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}
// @lc code=end
