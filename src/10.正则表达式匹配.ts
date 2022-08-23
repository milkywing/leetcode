/*
 * @lc app=leetcode.cn id=10 lang=typescript
 * https://leetcode.cn/problems/regular-expression-matching/
 * [10] 正则表达式匹配
 */

// @lc code=start
function isMatch(s: string, p: string): boolean {
  return isMatchCore(s, 0, p, 0);
}

/** 从左到右尝试模型 */
const isMatchCore = (s: string, index1: number, p: string, index2: number) => {
  const [length1, length2] = [s.length, p.length];
  // baseCase 如果两个字符串都遍历完了，表示匹配成功
  if (length1 === index1 && length2 === index2) return true;

  // 首先看下首个字母是否匹配
  let matchFirst: boolean;
  if (length1 === index1) {
    matchFirst = false;
  } else {
    matchFirst = !!(s[index1] === p[index2] || p[index2] === '.');
  }

  if (matchFirst) {
    // 首个字母匹配，且 p 的第二个字符是 *，有两种尝试方法
    // 1. 可以选择让 * 匹配 0 次，p 前进两格
    // 2. 可以选择让 * 匹配一次 s 头，s 前进一格
    if (index2 + 1 < length2 && p[index2 + 1] === '*') {
      //
      return isMatchCore(s, index1, p, index2 + 2) || isMatchCore(s, index1 + 1, p, index2);
    }
    // 只是单纯的字母匹配，一起前进
    return isMatchCore(s, index1 + 1, p, index2 + 1);
  }

  // 首个字母不匹配，需要看下 p 的第二个字符是否是 *
  // 如果 p 的第二个字符是 *，还是有机会继续尝试的，让 * 匹配 0 次，p 前进两格
  if (index2 + 1 < length2 && p[index2 + 1] === '*') {
    return isMatchCore(s, index1, p, index2 + 2);
  }

  // 首个字母不匹配，后面有没有 * ，没机会匹配了
  return false;
};
// @lc code=end
