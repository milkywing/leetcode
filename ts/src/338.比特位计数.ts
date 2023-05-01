/*
 * @lc app=leetcode.cn id=338 lang=typescript
 * https://leetcode.cn/problems/counting-bits/description/
 * [338] 比特位计数
 */

// @lc code=start
/**
 * 方案A：参考【191.位-1-的个数】逐个计数
 * 方案B（本解）：当前数的1个数 = 当前数最低位1变0后的1的个数 + 1
 */
function countBits(n: number): number[] {
  const result: number[] = Array(n + 1).fill(0);

  for (let i = 1; i < result.length; i++) {
    result[i] = result[i & (i - 1)] + 1;
  }

  return result;
}
// @lc code=end
