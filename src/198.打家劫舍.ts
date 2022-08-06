/*
 * @lc app=leetcode.cn id=198 lang=typescript
 * https://leetcode.cn/problems/house-robber/description/
 * [198] 打家劫舍
 */

// @lc code=start
/**
 * 方案A（本解）：递归改动态规划
 * 方案B：暴力递归
 */
function rob(nums: number[]) {
  const length = nums.length;
  const dp = new Array(length).fill(0);
  // 这里递推公式严格依赖 dp[i-1]和dp[i-2]，其实可以优化成两个变量存储
  dp[length - 1] = nums[length - 1];
  dp[length - 2] = Math.max(nums[length - 1], nums[length - 2]);

  for (let i = length - 3; i >= 0; i--) {
    dp[i] = Math.max(dp[i + 1], dp[i + 2] + nums[i]);
  }

  return dp[0];
}

const rob2 = (nums: number[]): number => {
  if (nums.length < 3) return Math.max(...nums);

  return robCore(nums, 0);
};

/**
 * 从左到右尝试模型：
 * i 表示当前正在考虑是否偷第 i 个房子没偷的话可以从 i+1 房子开始偷，偷了下次只能从 i+2 房子开始偷，
 * 函数返回 [i..length-1] 能抢劫的最大金额
 */
const robCore = (nums: number[], i: number): number => {
  const length = nums.length;
  if (i === length - 1) return nums[length - 1];
  if (i === length - 2) return Math.max(nums[length - 1], nums[length - 2]);

  // 偷第 i 个房子和不偷第 i 个房子，哪个收益大选哪个
  return Math.max(robCore(nums, i + 1), robCore(nums, i + 2) + nums[i]);
};
// @lc code=end
