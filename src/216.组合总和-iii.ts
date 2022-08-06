/*
 * @lc app=leetcode.cn id=216 lang=typescript
 * https://leetcode.cn/problems/combination-sum-iii/description/
 * [216] 组合总和 III
 */

// @lc code=start
let result: number[][] = [];
function combinationSum3(k: number, n: number): number[][] {
  result = [];
  if (n > 45) return result;
  combinationSum3Core(0, k, n, []);
  return result;
}

const combinationSum3Core = (index: number, restNum: number, rest: number, combine: number[]): void => {
  // restNum 和 rest 都归 0 了，生成一个组合
  if (restNum === 0 && rest === 0) {
    result.push([...combine]);
    return;
  }
  // restNum 和 rest 有没归 0 的，但是 index 已经到头了，放弃组合
  if (index === 9) return;

  // 「优化」：利用升序的特性，如果 rest 已经比当前值小了，那之后怎么选都没机会了，放弃组合
  const curValue = index + 1;
  if (rest < curValue) return;

  // 选择当前数
  combine.push(curValue);
  combinationSum3Core(index + 1, restNum - 1, rest - curValue, combine);
  combine.pop();
  // 不选当前数
  combinationSum3Core(index + 1, restNum, rest, combine);
};
// @lc code=end
