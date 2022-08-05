/*
 * @lc app=leetcode.cn id=494 lang=typescript
 * https://leetcode.cn/problems/target-sum/description/
 * [494] 目标和
 */

// @lc code=start

/**
 * 方案A（本解）：动态规划
 * 方案B：暴力递归（直接递归/转 01 背包问题）
 */

/** 01 背包递归转动态规划 */
function findTargetSumWays(nums: number[], target: number): number {
  // 【特例优化】
  // 1. 如果 F 大于sum，不可能实现，返回0
  // 2. F + sum 不是偶数，不能被二整除，返回0
  const sum = nums.reduce((acc, cur) => acc + cur);
  if (Math.abs(target) > Math.abs(sum) || (target + sum) % 2) return 0;
  const f = (target + sum) / 2;
  const dp: number[] = Array(f + 1).fill(0);
  dp[0] = 1;

  nums.reverse().forEach((num) => {
    for (let i = f; i >= num; i--) {
      dp[i] += dp[i - num];
    }
  });

  return dp[f];
}

const findTargetSumWaysB1 = (nums: number[], target: number): number => {
  // 【特例优化】
  // 1. 如果 F 大于sum，不可能实现，返回0
  // 2. F + sum 不是偶数，不能被二整除，返回0
  const sum = nums.reduce((acc, cur) => acc + cur);
  if (Math.abs(target) > Math.abs(sum) || (target + sum) % 2) return 0;

  return findTargetSumWaysCoreB1(nums, 0, (target + sum) / 2);
};

/**
 * 【核心思想】：
 * 假设划分出两批数，一批是要加的数，他们的和为 x；另一批是要减的数，他们的和是 y，
 * 已知数组总和 sum = x + y ，目标表达式和 F = x - y，推出 x = (F + sum) / 2，
 * 转化为 01 背包问题：从数组中选出一批数，使其和为 (F + sum) / 2。可进一步转化为动态规划解法
 */
const findTargetSumWaysCoreB1 = (nums: number[], index: number, restSum: number) => {
  if (index === nums.length) {
    return restSum === 0 ? 1 : 0;
  }

  return (
    findTargetSumWaysCoreB1(nums, index + 1, restSum) + findTargetSumWaysCoreB1(nums, index + 1, restSum - nums[index])
  );
};

const findTargetSumWaysB2 = (nums: number[], target: number): number => {
  return findTargetSumWaysCoreB2(nums, 0, target);
};

/**
 * 从左到右尝试模型：
 * index 表示当前正在考虑的数值，可以选择加上他或减去他，对应的 restSum 也要减去相应的值
 * 函数返回 [index..length-1] 能产生 restSum 的目标和数量
 */
const findTargetSumWaysCoreB2 = (nums: number[], index: number, restSum: number) => {
  if (index === nums.length) {
    return restSum === 0 ? 1 : 0;
  }

  return (
    findTargetSumWaysCoreB2(nums, index + 1, restSum - nums[index]) +
    findTargetSumWaysCoreB2(nums, index + 1, restSum + nums[index])
  );
};
// @lc code=end
