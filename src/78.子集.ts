/*
 * @lc app=leetcode.cn id=78 lang=typescript
 * https://leetcode.cn/problems/subsets/description/
 * [78] 子集
 */
// BACKTRACK

// @lc code=start
let result: number[][] = [];

function subsets(nums: number[]): number[][] {
  result = [];
  subsetsCore(nums, 0, []);

  return result;
}

/** 从左到右尝试模型 */
const subsetsCore = (nums: number[], index: number, subset: number[]): void => {
  // 所有值都考虑过了，生成一个子集
  if (index === nums.length) {
    result.push([...subset]);
    return;
  }

  // 选取当前值
  subset.push(nums[index]);
  subsetsCore(nums, index + 1, subset);
  // 不取去当前值，把之前选去的值去掉恢复
  subset.pop();
  subsetsCore(nums, index + 1, subset);
};
// @lc code=end
