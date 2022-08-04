/*
 * @lc app=leetcode.cn id=40 lang=typescript
 * https://leetcode.cn/problems/combination-sum-ii/description/
 * [40] 组合总和 II
 */

// @lc code=start
let result: number[][] = [];
const freqMap = new Map<number, number>();

/** 数值中有重复值但求组合时又要去重 */
function combinationSum2(candidates: number[], target: number): number[][] {
  result = [];
  freqMap.clear();
  // 【关键1】升序排序
  candidates.sort((a, b) => a - b);
  // 统计每个数值的出现频率
  candidates.forEach((num) => {
    if (freqMap.has(num)) freqMap.set(num, freqMap.get(num)! + 1);
    else freqMap.set(num, 1);
  });
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

  // 当前数值的出现频率
  const curNumFreq = freqMap.get(candidates[index])!;
  // 最多可以选去多少个当前数值
  const curNumMaxSelectNum = Math.min(curNumFreq, Math.floor(rest / candidates[index]));
  // 核心思想逻辑
  for (let n = 0; n <= curNumMaxSelectNum; n++) {
    let count = 0;
    // 选择 n 次数值
    while (count !== n) {
      combine.push(candidates[index]);
      count++;
    }
    combinationSum2Core(candidates, index + curNumFreq, rest - candidates[index] * n, combine);
    // 吐回 n 次数值恢复
    while (count) {
      combine.pop();
      count--;
    }
  }
};
// @lc code=end
