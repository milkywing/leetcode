/*
 * @lc app=leetcode.cn id=115 lang=typescript
 *
 * [115] 不同的子序列
 */

// @lc code=start
/**
 * 方案A（本解）：递归改动态规划
 * 方案B：暴力递归
 */
function numDistinct(s: string, t: string): number {
  const [sLength, tLength] = [s.length, t.length];
  // 行方向对应源字符串，列方向对应目标字符串
  // 可以做压缩优化
  const dp: number[][] = Array.from({ length: sLength + 1 }).map(() => Array(tLength + 1));

  // 两个baseCase填充
  for (let col = 0; col <= tLength; col++) {
    dp[sLength][col] = 0;
  }
  for (let row = 0; row <= sLength; row++) {
    dp[row][tLength] = 1;
  }

  for (let row = sLength - 1; row >= 0; row--) {
    for (let col = tLength - 1; col >= 0; col--) {
      if (s[row] === t[col]) {
        dp[row][col] = dp[row + 1][col + 1] + dp[row + 1][col];
      } else {
        dp[row][col] = dp[row + 1][col];
      }
    }
  }

  return dp[0][0];
}

/**
 * 从左到右尝试模型：
 */
const numDistinctB = (s: string, t: string): number => {
  // baseCase1：目标字符都匹配完了，得到一种方案
  if (t.length === 0) return 1;
  // baseCase2：目标字符串还没匹配完，源字符串就用光了，方案不通
  if (s.length === 0) return 0;

  // 如果源字符串头和目标字符串头相同，右两个互斥选择
  // 1.选择匹配，继续考虑两个字符串去除头之后的不同的子序列个数
  // 2.不选择匹配，只有源字符串去除头，继续考虑两个字符串的不同的子序列个数
  // 两种互斥情况加起来
  if (s[0] === t[0]) {
    return numDistinct(s.slice(1), t.slice(1)) + numDistinct(s.slice(1), t);
  }
  // 如果源字符串头和目标字符串头不相同，不能匹配，只有源字符串去除头，继续考虑两个字符串的不同的子序列个数
  return numDistinct(s.slice(1), t);
};
// @lc code=end
