/*
 * @lc app=leetcode.cn id=213 lang=typescript
 * https://leetcode.cn/problems/house-robber-ii/description/
 * [213] 打家劫舍 II
 */

// @lc code=start
/**
 * 基本跟【198】一致，但是可以拆分出两种情况：
 * 1. 如果偷了第一间房子，那最大可以偷 nums[0] + [2..length-2] 能抢劫的最大金额
 * 2. 如果不偷第一间房子，那最大可以偷 [1..length-1] 能抢劫的最大金额
 * 选择两种情况的较大值即可
 */
function rob(nums: number[]): number {
  const length = nums.length;
  if (length <= 3) return Math.max(...nums);

  return Math.max(robDp(nums.slice(2, -1)) + nums[0], robDp(nums.slice(1)));
}

const robDp = (nums: number[]): number => {
  const length = nums.length;
  if (length < 3) return Math.max(...nums);

  let backValue = nums[length - 1];
  let frontValue = Math.max(nums[length - 1], nums[length - 2]);

  for (let i = length - 3; i >= 0; i--) {
    [frontValue, backValue] = [Math.max(frontValue, backValue + nums[i]), frontValue];
  }

  return frontValue;
};
// @lc code=end
