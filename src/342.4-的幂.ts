/*
 * @lc app=leetcode.cn id=342 lang=typescript
 *
 * [342] 4的幂
 */

// @lc code=start
/**
 * 方案A：4^n = (2^2)^n = 2^2n，即一个数如果是 4 的幂，他的二进制肯定只有一个 1，且这个 1 的位置只能在 2n 位置，可以先提取取最右侧的 1，然后与上 101010...，看下结果是否为 1
 * 方案B：如果一个数 n 是 4 的幂，那等效于 n 是 2 的幂，且 n % 3 === 1
 */
function isPowerOfFour(n: number): boolean {
  return n === (n & -n) && n > 0 && (n & 0x55555555) === n;

  // return n === (n & -n) && n > 0 && n % 3 === 1;
}
// @lc code=end
