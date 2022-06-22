/*
 * @lc app=leetcode.cn id=20 lang=typescript
 *
 * [20] 有效的括号
 */

// @lc code=start
function isValid(s: string): boolean {
  // 奇数长度字符串肯定不合法
  if (s.length % 2) return false;

  const bracketMap = new Map([
    ['(', ')'],
    ['[', ']'],
    ['{', '}'],
  ]);

  const stack: string[] = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const char of s) {
    if (bracketMap.has(char)) stack.push(char);
    else if (bracketMap.get(stack.pop()!) !== char) return false;
  }

  return !stack.length;
}
// @lc code=end
