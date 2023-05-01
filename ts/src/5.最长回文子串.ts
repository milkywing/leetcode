/*
 * @lc app=leetcode.cn id=5 lang=typescript
 * https://leetcode.cn/problems/longest-palindromic-substring/solution/
 * [5] 最长回文子串
 */

// @lc code=start

/**
 * 方案A（本解）：中心扩展法
 * 方案B：manacher算法
 */
function longestPalindrome(s: string): string {
  if (s.length <= 1) return s;
  const length = s.length;

  // 从中心向两边扩展的指针
  let [left, right] = [0, 0];
  // 从中心扩展出来的回文串的长度
  let len = 1;
  // 记录最大回文串的长度和起点
  let maxLen = 1;
  let maxStartIndex = 0;

  // 遍历字符串的每个位置，尝试以该位置为中心进行扩展
  for (let i = 1; i < length; i++) {
    left = i - 1;
    right = i + 1;
    // 第一个和第二个循环是为了把中心两边相同的字符都扩展了先（可同时兼容符串奇偶长度）
    while (left >= 0 && s[i] === s[left]) {
      len++;
      left--;
    }
    while (right < length && s[i] === s[right]) {
      len++;
      right++;
    }
    // 利用回文的对称性，两侧指针同时开始向两边扩展
    while (left >= 0 && right < length && s[left] === s[right]) {
      len += 2;
      left--;
      right++;
    }

    // 扩展结束，更新最大回文串的长度和起点
    if (len > maxLen) {
      maxLen = len;
      maxStartIndex = left + 1;
    }

    // 重置回文长度，准备下一次扩展
    len = 1;
  }

  return s.slice(maxStartIndex, maxStartIndex + maxLen);
}
// @lc code=end
