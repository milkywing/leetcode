/*
 * @lc app=leetcode.cn id=1143 lang=typescript
 * https://leetcode.cn/problems/longest-common-subsequence/description/
 * [1143] 最长公共子序列
 */

// @lc code=start
/**
 * 方案A（本解）：递归改动态规划
 * 方案B：暴力递归
 */
function longestCommonSubsequence(text1: string, text2: string): number {
  const [text1Length, text2Length] = [text1.length, text2.length];
  // 行方向对应text1，列方向对应text2
  const dp: number[][] = Array.from({ length: text1Length + 1 }).map(() => Array(text2Length + 1).fill(0));

  for (let row = text1Length - 1; row >= 0; row--) {
    for (let col = text2Length - 1; col >= 0; col--) {
      if (text1[row] === text2[col]) {
        dp[row][col] = 1 + dp[row + 1][col + 1];
      } else {
        dp[row][col] = Math.max(dp[row][col + 1], dp[row + 1][col]);
      }
    }
  }

  return dp[0][0];
}

const longestCommonSubsequenceB = (text1: string, text2: string): number => {
  return longestCommonSubsequenceBCore(text1, 0, text2, 0);
};

/**
 * 从左到右尝试模型：
 */
const longestCommonSubsequenceBCore = (text1: string, index1: number, text2: string, index2: number): number => {
  // baseCase：任意字符串为空返回0
  if (text1.length === index1 || text2.length === index2) return 0;

  // 如果两字符串的第一个字符相同，纳入子序列中，继续考虑两个字符串去除头之后的最长子序列
  if (text1[index1] === text2[index1]) {
    return 1 + longestCommonSubsequenceBCore(text1, index1 + 1, text2, index2 + 1);
  }
  // 如果两字符串的第一个字不相相同，分别考虑两个字符串分别去除头之后的最长子序列，取较大值
  return Math.max(
    longestCommonSubsequenceBCore(text1, index1, text2, index2 + 1),
    longestCommonSubsequenceBCore(text1, index1 + 1, text2, index2),
  );
};
// @lc code=end
