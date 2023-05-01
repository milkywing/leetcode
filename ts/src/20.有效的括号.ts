/*
 * @lc app=leetcode.cn id=20 lang=typescript
 * https://leetcode.cn/problems/valid-parentheses/description/
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

  // 使用栈来记录遇到过的左括号
  const stack: string[] = [];

  // 核心思想：利用括号的最近匹配原则，遇到右括号后，必须进入配对环节，和最近的左括号进行匹配，如果不配对说明是无效字符串
  // eslint-disable-next-line no-restricted-syntax
  for (const char of s) {
    if (bracketMap.has(char)) stack.push(char);
    else if (bracketMap.get(stack.pop()!) !== char) return false;
  }

  return !stack.length;
}
// @lc code=end
