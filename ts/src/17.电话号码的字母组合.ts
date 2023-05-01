/*
 * @lc app=leetcode.cn id=17 lang=typescript
 * https://leetcode.cn/problems/letter-combinations-of-a-phone-number/description/
 * [17] 电话号码的字母组合
 */
// BACKTRACK

// @lc code=start
const digitAlphaMap = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];
let result: string[] = [];

function letterCombinations(digits: string): string[] {
  result = [];
  if (!digits) return result;
  letterCombinationsCore(digits, 0, '');
  return result;
}

const letterCombinationsCore = (digits: string, index: number, combine: string) => {
  if (digits.length === index) {
    result.push(combine);
    return;
  }

  const alpha = digitAlphaMap[digits[index]];

  // eslint-disable-next-line no-restricted-syntax
  for (const char of alpha) {
    letterCombinationsCore(digits, index + 1, `${combine}${char}`);
  }
};
// @lc code=end
