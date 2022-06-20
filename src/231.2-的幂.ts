/*
 * @lc app=leetcode.cn id=231 lang=typescript
 *
 * [231] 2 的幂
 */

// @lc code=start
/**
 * 方案A：如果一个数 n 是 2 的幂，那么它的二进制表示中，只有一个 1，取最右侧的 1 看下是否和 n 相等（需要排除非正数的情况）
 * 方案B：如果一个数 n 是 2 的幂，那么它的二进制表示中，那 n-1 & n 的结果为 0（需要排除非正数的情况）
 */
function isPowerOfTwo(n: number): boolean {
  return n === (n & -n) && n > 0;
}
// @lc code=end
