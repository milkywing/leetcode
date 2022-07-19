/*
 * @lc app=leetcode.cn id=40 lang=typescript
 *
 * [40] 组合总和 II
 */

// @lc code=start
let result: number[][] = [];

/** 数值中有重复值但求组合时又要去重 */
function combinationSum2(candidates: number[], target: number): number[][] {
  result = [];
  // 【关键1】升序排序
  candidates.sort((a, b) => a - b);
  combinationSum2Core(candidates, 0, target, []);
  return result;
}

const combinationSum2Core = (candidates: number[], index: number, rest: number, combine: number[]): void => {
  // 下面的代码已经确保 rest>=0
  // baseCase1：凑够了，生成一个组合
  if (rest === 0) {
    result.push([...combine]);
    return;
  }
  // baseCase2：后面的数值开始大于非零 rest 了，由于升序的原因，后面已经没机会凑出有效组合了
  if (candidates[index] > rest) return;
  // baseCase3：所有数值都考虑过了，rest 还是大于 0，说明非法组合
  if (index === candidates.length) return;

  // 【核心思想】：对于 candidates 中连续相等的 n 个数值，为了避免重复组合，需要在分别只取0个、1个、2个...n个的情况下，跳过相等值后求组合
  // 比如对于[1,1,1,2,3,4]中3个连续相等的1，需要求以下四种情况下的组合
  // 1.选0个1，从[2,3,4]开始求组合
  // 2.选1个1，继续在[2,3,4]求组合
  // 3.选2个1，继续在[2,3,4]求组合
  // 4.选3个1，继续在[2,3,4]求组合

  // 核心思想逻辑，如果不是很理解的话可以看看【40E1.组合总和-ii】另一种实现
  for (let j = index; j < candidates.length && candidates[j] <= rest; j++) {
    // 【关键2】选了当前值后，跳过后续相等的值
    if (j > index && candidates[j] === candidates[j - 1]) continue;

    combine.push(candidates[j]);
    combinationSum2Core(candidates, j + 1, rest - candidates[j], combine);
    combine.pop();
  }
};
// @lc code=end
