/*
 * @lc app=leetcode.cn id=300 lang=typescript
 *
 * [300] 最长递增子序列
 */

// @lc code=start
/** 递归改动态规划 */
function lengthOfLIS(nums: number[]): number {
  const length = nums.length;
  if (length <= 1) return length;

  let result = 0;
  // dp[i] 记录以 nums[i] 为结尾的最长递增子序列长度
  const dp: number[] = Array(length).fill(0);
  dp[0] = 1;

  for (let i = 1; i < length; i++) {
    // 无论如何以 nums[i] 为结尾的最长递增子序列长度至少为 1
    dp[i] = 1;
    for (let j = 0; j < i; j++) {
      // 考虑 i 前面的每个位置 j，如果 j、i 形成递增关系，dp[i] = max(dp[i], dp[j]+1)
      if (nums[i] > nums[j]) dp[i] = Math.max(dp[i], dp[j] + 1);
    }
    // 计算出 dp[i] 后，记录其最大值
    result = Math.max(result, dp[i]);
  }

  return result;
}

const lengthOfLISB = (nums: number[]): number => {
  return lengthOfLISBCore(nums, -Infinity, 0);
};

/**
 * 从左到右尝试模型：
 * prevValue 表示当前序列的最后一个值（当前最大值），后序的递增序列只能从 prevValue 开始
 * i 表示当前正在考虑是否选择第 i 个数，如果第 i 个数大于 prevValue，说明第 i 个数是可以选择的；当然也可以不选择，两种选择互斥选较大值
 * 函数返回 [index..length-1] 从 prevValue 开始的最长递增子序列长度
 */
const lengthOfLISBCore = (nums: number[], prevValue: number, index: number): number => {
  if (index === nums.length) return 0;

  const curValue = nums[index];
  const take = curValue > prevValue ? 1 + lengthOfLISBCore(nums, curValue, index + 1) : 0;
  const notTake = lengthOfLISBCore(nums, prevValue, index + 1);

  return Math.max(take, notTake);
};
// @lc code=end
