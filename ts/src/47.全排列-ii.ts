/*
 * @lc app=leetcode.cn id=47 lang=typescript
 * https://leetcode.cn/problems/permutations-ii/description/
 * [47] 全排列 II
 */

// @lc code=start
let result: number[][] = [];

/** 核心思想参考【46.全排列】，在本题中 nums 可能会出现重复数值，排列时需要舍弃重复组合 */
function permuteUnique(nums: number[]): number[][] {
  result = [];
  permuteUniqueCore(nums, 0);
  return result;
}

const permuteUniqueCore = (nums: number[], i: number): void => {
  if (i === nums.length) {
    result.push([...nums]);
    return;
  }

  // 使用一个集合记录 i 位置放过的数值
  const numsHasTried = new Set<number>();
  for (let j = i; j < nums.length; j++) {
    // 如果 j 位置的值已经 在 i 位置被放过了，舍弃重复组合
    if (numsHasTried.has(nums[j])) continue;
    numsHasTried.add(nums[j]);

    [nums[i], nums[j]] = [nums[j], nums[i]];
    permuteUniqueCore(nums, i + 1);
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }
};
// @lc code=end
