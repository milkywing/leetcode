/*
 * @lc app=leetcode.cn id=32 lang=typescript
 * https://leetcode.cn/problems/longest-valid-parentheses/description/
 * [32] 最长有效括号
 */
// DYNAMIC

// @lc code=start
/**
 * 有效子串肯定是以')'结尾，现在申请一个数组 dp，dp[i] 表示以第 i 个字符结尾的最长有效括号子串的长度。
 * 1.当 str[i] === '(' 时，dp[i] 必为 0，
 * 2.当 str[i] === ')' 时，考虑  xxxx?XXXX) 的情况，XXXX 为以第 i-1 个字符结尾的最长有效括号子串，
 * 当 ? 位置是 ')'，直接得到 dp[i] = 0；当 ? 位置是 '('，dp[i] 至少为 dp[i-1] + 2，此时如果 xxxx 也是有效括号子串，加上他的长度
 */

function longestValidParentheses(str: string): number {
  const length = str.length;
  const dp: number[] = Array(length).fill(0);
  let result = 0;

  for (let i = 1; i < length; i++) {
    if (str[i] === '(') {
      dp[i] = 0;
    } else {
      // 考虑 ? 的位置
      const matchIndex = i - dp[i - 1] - 1;
      if (matchIndex >= 0 && str[matchIndex] === '(') {
        dp[i] = dp[i - 1] + 2;
        if (matchIndex - 1 >= 0) dp[i] += dp[matchIndex - 1];
      }
    }

    result = Math.max(result, dp[i]);
  }

  return result;
}

const longestValidParenthesesB = (str: string): number => {
  // 始终让栈底记录「最后一个没有被匹配的右括号的下标」
  const stack: number[] = [-1];
  let i = 0;
  let result = 0;

  while (i < str.length) {
    if (str[i] === '(') {
      stack.push(i);
    } else {
      // 遇到右括号，尝试弹出左括号匹配
      stack.pop();
      // 如果发现弹出后栈为空，说明当前右括号没有找到对应的左括号匹配，放到栈底中
      if (!stack.length) {
        stack.push(i);
      } else {
        // 正常匹配流程，计算当前有效字符串长度
        result = Math.max(result, i - stack[stack.length - 1]);
      }
    }
    i++;
  }

  return result;
};
// @lc code=end
