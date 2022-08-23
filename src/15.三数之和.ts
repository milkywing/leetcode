/*
 * @lc app=leetcode.cn id=15 lang=typescript
 * https://leetcode.cn/problems/3sum/description/
 * [15] 三数之和
 */

// IMPORTANT
// @lc code=start
function threeSum(nums: number[]): number[][] {
  const length = nums.length;
  if (length < 3) return [];
  const result: number[][] = [];
  // 升序排序
  nums.sort((a, b) => a - b);

  // 遍历每一个值，为 nums[i] 找到另外两个数使得三数之和为 0
  for (let i = 0; i < length; i++) {
    // nums[i] 已经大于 0 了，说明右边的数肯定大于 0 了，不可能找到更多的三元组，提前返回
    if (nums[i] > 0) return result;
    // 跳过重复的 nums[i]
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    // 双指针，对 num[i] 右边的区域进行两边向中间的遍历
    let [left, right] = [i + 1, length - 1];
    while (left < right) {
      if (nums[i] + nums[left] + nums[right] === 0) {
        // 满足要求的三元组
        result.push([nums[i], nums[left], nums[right]]);
        // 跳过 left、right 指针重复值
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;

        left++;
        right--;
      } else if (nums[i] + nums[left] + nums[right] > 0) {
        // left->right是递增的，这里说明 nums[right] 太大了，需要左移
        right--;
      } else {
        // left->right是递增的，这里说明 nums[left] 太小了，需要右移
        left++;
      }
    }
  }

  return result;
}
// @lc code=end
