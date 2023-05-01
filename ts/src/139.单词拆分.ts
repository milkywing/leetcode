/*
 * @lc app=leetcode.cn id=139 lang=typescript
 * https://leetcode.cn/problems/word-break/description/
 * [139] 单词拆分
 */
// DYNAMIC

// @lc code=start
/** 递归改动态规划 */
function wordBreak(s: string, wordDict: string[]): boolean {
  const optionalLengths = new Set<number>();
  wordDict.forEach((word) => optionalLengths.add(word.length));

  const dp: boolean[] = Array(s.length + 1).fill(false);
  dp[s.length] = true;

  for (let i = s.length - 1; i >= 0; i--) {
    // eslint-disable-next-line no-restricted-syntax
    for (const length of optionalLengths) {
      const endIndex = i + length;
      if (endIndex <= s.length && wordDict.includes(s.slice(i, endIndex)) && dp[endIndex]) {
        dp[i] = true;
        break;
      }
    }
  }

  return dp[0];
}

function wordBreakB(s: string, wordDict: string[]): boolean {
  // 统计 wordDict 中出现的单词长度集
  const optionalLengths = new Set<number>();
  wordDict.forEach((word) => optionalLengths.add(word.length));
  return wordBreakCore(s, wordDict, optionalLengths, 0);
}

/** 从左到右尝试模型 */
const wordBreakCore = (s: string, wordDict: string[], optionalLengths: Set<number>, index: number) => {
  if (s.length === index) return true;

  // 只截取单词长度集中的长度进行匹配尝试
  // eslint-disable-next-line no-restricted-syntax
  for (const length of optionalLengths) {
    const endIndex = index + length;
    if (
      endIndex <= s.length &&
      wordDict.includes(s.slice(index, endIndex)) &&
      wordBreakCore(s, wordDict, optionalLengths, endIndex)
    ) {
      return true;
    }
  }

  // 所有截取方案都无法匹配，说明无法拆分
  return false;
};
// @lc code=end
