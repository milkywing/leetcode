/*
 * @lc app=leetcode.cn id=90 lang=typescript
 * https://leetcode.cn/problems/subsets-ii/
 * [90] 子集 II
 */

// @lc code=start
let result: number[][] = [];

/**
 * 参考【40.组合总和-ii】，
 * 对数组升序排序，对于连续相等的 n 个数值 x，需要一次性做出选择 0个、1个、2个...n个 x，然后从下一个非重复数值开始选择
 */
function subsetsWithDup(nums: number[]): number[][] {
  result = [];
  // 【关键】升序排序
  nums.sort((a, b) => a - b);
  subsetsWithDupCore(nums, 0, []);
  return result;
}

const subsetsWithDupCore = (nums: number[], index: number, subset: number[]) => {
  // 所有值都考虑过了，生成一个子集
  if (index === nums.length) {
    result.push([...subset]);
    return;
  }

  // 统计当前值出现的次数
  let curNumCount = 1;
  for (let i = index + 1; i < nums.length; i++) {
    if (nums[i] === nums[i - 1]) curNumCount++;
    else break;
  }

  // 一次性做出选择 0个、1个、2个...n个 x
  for (let n = 0; n <= curNumCount; n++) {
    let count = 0;
    // 选择 n 次数值
    while (count !== n) {
      subset.push(nums[index]);
      count++;
    }
    subsetsWithDupCore(nums, index + curNumCount, subset);
    // 吐回 n 次数值恢复
    while (count) {
      subset.pop();
      count--;
    }
  }
};
// @lc code=end
