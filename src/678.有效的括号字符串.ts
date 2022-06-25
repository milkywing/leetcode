/*
 * @lc app=leetcode.cn id=678 lang=typescript
 *
 * [678] 有效的括号字符串
 */

// @lc code=start
/**
 * 使用双栈结构，一个栈存左括号，一个栈存星号，
 * 当遇到右括号时，优先从左括号栈中匹配，左括号栈为空时从星号栈中匹配，双栈都为空无法匹配，说明是无效字符串，
 * 字遍历完字符串后让剩下的左括号和剩下的星号（当作右括号）进行匹配，如果左括号被匹配完了，是有效字符串，否则是无效字符串
 */
function checkValidString(str: string): boolean {
  // 左括号栈和星号栈（存储字符下标）
  const leftBracketStack: number[] = [];
  const starStack: number[] = [];

  for (let i = 0; i < str.length; i++) {
    if (str[i] === '(') {
      leftBracketStack.push(i);
    } else if (str[i] === '*') {
      starStack.push(i);

      // 下面是遇到右括号的情况，优先从左括号栈中匹配，星号栈次之
    } else if (leftBracketStack.length) {
      leftBracketStack.pop();
    } else if (starStack.length) {
      starStack.pop();
    } else {
      return false;
    }
  }

  // 字符串遍历完后，让剩下的左括号和星号（当作右括号）匹配，并且要求左括号的位置在星号位置的左方
  while (leftBracketStack.length && starStack.length) {
    if (leftBracketStack.pop()! > starStack.pop()!) {
      return false;
    }
  }

  // 如果左括号和星号匹配匹配完后还剩左括号，说明是无效字符串
  return !leftBracketStack.length;
}
// @lc code=end
