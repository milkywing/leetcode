/*
 * @lc app=leetcode.cn id=16 lang=typescript
 * https://leetcode.cn/problems/3sum-closest/description/
 * [16] 最接近的三数之和
 */

// @lc code=start
/** 和【15.三数之和】类似，使用一个变量记录距离 target 最近的和，并且在遍历过程中更新 */
function threeSumClosest(nums: number[], target: number): number {
  const length = nums.length;
  nums.sort((a, b) => a - b);

  let result = +Infinity;

  for (let i = 0; i < length; i++) {
    // 跳过重复的 nums[i]
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let [left, right] = [i + 1, length - 1];
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === target) return target;
      // 更新最近和
      if (Math.abs(sum - target) < Math.abs(result - target)) {
        result = sum;
      }

      if (sum > target) {
        // left->right是递增的，这里说明 nums[right] 太大了，需要左移，顺便跳过重复值
        while (left < right && nums[right] === nums[right - 1]) right--;
        right--;
      } else {
        // left->right是递增的，这里说明 nums[left] 太小了，需要右移，顺便跳过重复值
        while (left < right && nums[left] === nums[left + 1]) left++;
        left++;
      }
    }
  }

  return result;
}
// @lc code=end
