/*
 * @lc app=leetcode.cn id=22 lang=typescript
 * https://leetcode.cn/problems/generate-parentheses/description/
 * [22] 括号生成
 */

// @lc code=start
let result: string[] = [];

function generateParenthesis(n: number): string[] {
  result = [];
  generateParenthesisCore(n, '', 0, 0);
  return result;
}

const generateParenthesisCore = (n: number, str: string, leftBracketNum: number, rightBracketNum: number) => {
  // baseCase1：生成过程中，右括号数量不能超过左括号数量，括号数量不能超过 n（非法组合）
  if (leftBracketNum < rightBracketNum || leftBracketNum > n) return;
  // 下面已经确保 n >= leftBracketNum >= rightBracketNum

  // baseCase2：到达目标长度，生成一种组合
  if (str.length === n * 2) {
    result.push(str);
    return;
  }

  // 当前位置分别尝试放置左括号和右括号
  generateParenthesisCore(n, `${str}(`, leftBracketNum + 1, rightBracketNum);
  generateParenthesisCore(n, `${str})`, leftBracketNum, rightBracketNum + 1);
};
// @lc code=end
