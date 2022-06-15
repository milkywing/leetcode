/*
 * @lc app=leetcode.cn id=46 lang=typescript
 *
 * [46] 全排列
 */

// @lc code=start
function permute(nums: number[]): number[][] {
  if (nums.length === 0) return [];

  const result: number[][] = [];
  permuteCore(nums, 0, result);

  return result;
}

/**
 * 核心思想：对于序列 [n1, n2, n3] 的组合，可以拆解为[n1]+[n2, n3]的组合 、[n2]+[n1, n3]的组合 、[n3]+[n1, n2]的组合，
 * 同理，加号后面的序列可以重复上述过程，直到加号后面的序列为空。
 * 1. nums 中 [0..i-1] 的元素为之前的选择，[i..nums.length-1] 的元素未组合过
 * 2. 按上面的思想求 [i..nums.length-1] 区域的组合，从该区域中选择一个元素作为 i 位置的选择然后转换为求 [i+1..nums.length-1] 区域的组合
 * 3. 重复上述过程，直到 i === nums.length，即所有元素都已经被选择过
 */
const permuteCore = (nums: number[], i: number, result: number[][]): void => {
  // 如果 i === nums.length，即所有元素都已经被选择过，的到一个组合保存起来
  if (i === nums.length) {
    result.push(nums.slice());
    return;
  }

  // 用于记录 i 位置放过的值
  const numsHasTried: Set<number> = new Set();
  for (let j = i; j < nums.length; j++) {
    // 如果 j 位置的值已经 在 i 位置被放过了，舍弃重复组合
    if (numsHasTried.has(nums[j])) continue;
    numsHasTried.add(nums[j]);
    // 选择 i 位置的值
    [nums[i], nums[j]] = [nums[j], nums[i]];
    // 求 [i+1..nums.length-1] 区域的组合
    permuteCore(nums, i + 1, result);
    // 恢复 i、j 位置原来的值
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }
};
// @lc code=end
