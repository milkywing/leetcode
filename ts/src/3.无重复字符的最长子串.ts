/*
 * @lc app=leetcode.cn id=3 lang=typescript
 * https://leetcode.cn/problems/longest-substring-without-repeating-characters/description/
 * [3] 无重复字符的最长子串
 */

// @lc code=start
/** 因为之串时连续的，因此可以使用动态大小的滑动窗口，记录窗口最大时刻的值，具体实现可以使用双指针 */
function lengthOfLongestSubstring(s: string): number {
  const len = s.length;
  if (len <= 1) return len;

  let max = 1;
  let [p1, p2] = [0, 0];
  // 记录当前窗口内的字符
  const set = new Set<string>();

  // 当左指针（包括左指针）后面的字符数量少于当前最长子串长度的时候，可提前结束
  while (p2 < len && len - p1 > max) {
    const rightChar = s[p2];
    // 右指针遇到新字符，纳入窗口中并更新最大窗口，右指针右移
    if (!set.has(rightChar)) {
      set.add(rightChar);
      max = Math.max(p2 - p1 + 1, max);
      p2++;
      continue;
    }

    // 右指针遇到了重复字符，只能让左指针不停的右移，指导把重复的字符甩走
    while (set.has(rightChar)) {
      set.delete(s[p1]);
      p1++;
    }
  }

  return max;
}
// @lc code=end
