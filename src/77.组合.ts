/*
 * @lc app=leetcode.cn id=77 lang=typescript
 *
 * [77] 组合
 */

// @lc code=start
let result: number[][] = [];
function combine(n: number, k: number): number[][] {
  result = [];
  combineCore(n, 0, k, []);
  return result;
}

const combineCore = (n: number, index: number, rest: number, oneCase: number[]): void => {
  // 剩余可选数量不足以填补 rest，提前结束
  if (rest > n - index) return;
  // 选够了，生成一个组合
  if (rest === 0) {
    result.push(oneCase.slice());
    return;
  }

  // 选择当前数
  oneCase.push(index + 1);
  combineCore(n, index + 1, rest - 1, oneCase);
  oneCase.pop();
  // 不选择当前数
  combineCore(n, index + 1, rest, oneCase);
};
// @lc code=end
