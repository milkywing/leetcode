/*
 * @lc app=leetcode.cn id=14 lang=typescript
 *
 * [14] 最长公共前缀
 */

// @lc code=start
/** 求两个字符串的公共前缀+分治即可 */
function longestCommonPrefix(strs: string[]): string {
  const length = strs.length;
  if (length === 1) return strs[0];

  const mid = length >> 1;
  const leftArea = strs.slice(0, mid);
  const rightArea = strs.slice(mid);

  return commonPrefix(longestCommonPrefix(leftArea), longestCommonPrefix(rightArea));
}

/** 求两个字符串的公共前缀 */
const commonPrefix = (str1: string, str2: string): string => {
  const minLength = Math.min(str1.length, str2.length);
  for (let i = 0; i < minLength; i++) {
    if (str1[i] !== str2[i]) return str1.slice(0, i);
  }

  return str1.slice(0, minLength);
};
// @lc code=end
