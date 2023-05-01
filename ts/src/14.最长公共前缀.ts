/*
 * @lc app=leetcode.cn id=14 lang=typescript
 * https://leetcode.cn/problems/longest-common-prefix/description/
 * [14] 最长公共前缀
 */

// @lc code=start
/**
 * 方案A（本解）：横向两两扫描
 * 方案B：分治扫描
 */
function longestCommonPrefix(strs: string[]): string {
  const length = strs.length;
  if (length === 1) return strs[0];

  let prefix = strs[0];
  for (let i = 1; i < length; i++) {
    prefix = commonPrefix(prefix, strs[i]);
    // 如果当前公共前缀归空了，直接可以提前终止了
    if (!prefix) break;
  }

  return prefix;
}

const longestCommonPrefixB = (strs: string): string => {
  const length = strs.length;
  if (length === 1) return strs[0];

  const mid = length >> 1;
  const leftArea = strs.slice(0, mid);
  const rightArea = strs.slice(mid);

  return commonPrefix(longestCommonPrefixB(leftArea), longestCommonPrefixB(rightArea));
};

/** 求两个字符串的公共前缀 */
const commonPrefix = (str1: string, str2: string): string => {
  const minLength = Math.min(str1.length, str2.length);
  for (let i = 0; i < minLength; i++) {
    if (str1[i] !== str2[i]) return str1.slice(0, i);
  }

  return str1.slice(0, minLength);
};
// @lc code=end
