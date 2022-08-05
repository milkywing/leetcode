/*
 * @lc app=leetcode.cn id=191 lang=typescript
 * https://leetcode.cn/problems/number-of-1-bits/description/
 * [191] 位1的个数
 */

// @lc code=start
// 把最右侧的 1 变 0，直到归 0
function hammingWeight(n: number): number {
  let result = 0;

  while (n) {
    // 把最右侧的 1 变 0
    n &= n - 1;
    result++;
  }

  return result;
}
// @lc code=end
