/*
 * @lc app=leetcode.cn id=32 lang=typescript
 *
 * [32] 最长有效括号
 */

// @lc code=start
/**
 * 【引导1】子串肯定是以')'结尾，现在申请一个数组 dp，dp[i] 表示以第 i 个字符结尾的最长有效括号子串的长度。
 * 1.当 str[i] === '(' 时，dp[i] 必为 0，
 * 2.当 str[i] === ')' 时，考虑  xxxx?XXXX) 的情况，XXXX 为以第 i-1 个字符结尾的最长有效括号子串，
 * 当 ? 位置是 ')'，直接得到 dp[i] = 0；当 ? 位置是 '('，dp[i] 至少为 dp[i-1] + 2，此时如果 xxxx 也是有效括号子串，加上他的长度
 */

function longestValidParentheses(str: string): number {
  const length = str.length;
  const dp: number[] = Array(length).fill(0);
  let result = 0;

  for (let i = 0; i < length; i++) {
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
// @lc code=end
