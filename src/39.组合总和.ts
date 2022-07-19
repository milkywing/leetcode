/*
 * @lc app=leetcode.cn id=39 lang=typescript
 *
 * [39] 组合总和
 */

// @lc code=start
let result: number[][] = [];

function combinationSum(candidates: number[], target: number): number[][] {
  result = [];
  combinationSumCore(candidates, 0, target, []);
  return result;
}

const combinationSumCore = (candidates: number[], index: number, rest: number, combine: number[]): void => {
  // 下面的代码已经确保 rest>=0
  // baseCase1：凑够了，生成一个组合
  if (rest === 0) {
    result.push([...combine]);
    return;
  }
  // baseCase2：所有数值都考虑过了，rest 还是大于 0，说明非法组合
  if (index === candidates.length) return;

  // 对于当前的数值，尝试使用若干次
  for (let n = 0; candidates[index] * n <= rest; n++) {
    let count = 0;
    // 选择 n 次数值
    while (count !== n) {
      combine.push(candidates[index]);
      count++;
    }
    combinationSumCore(candidates, index + 1, rest - candidates[index] * n, combine);
    // 吐回 n 次数值恢复
    while (count) {
      combine.pop();
      count--;
    }
  }
};
// @lc code=end
