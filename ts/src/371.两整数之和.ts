/*
 * @lc app=leetcode.cn id=371 lang=typescript
 * https://leetcode.cn/problems/sum-of-two-integers/description/
 * [371] 两整数之和
 */

// @lc code=start
/**
 * 使用位运算实现加法：异或得到无进位和 s，与得到进位 c，
 * 转求 s' = s + (c << 1)，
 * 对 s' 的计算重复上述操作直到无进位
 */
function getSum(a: number, b: number): number {
  let s = a ^ b;
  let c = a & b;
  while (c !== 0) {
    c <<= 1;
    [s, c] = [s ^ c, s & c];
  }

  return s;
}
// @lc code=end
