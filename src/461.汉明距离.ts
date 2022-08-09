/*
 * @lc app=leetcode.cn id=461 lang=typescript
 * https://leetcode.cn/problems/hamming-distance/description/
 * [461] 汉明距离
 */

// @lc code=start
/** 异或之后统计 1 的个数 */
function hammingDistance(x: number, y: number): number {
  let xNORy = x ^ y;
  let result = 0;

  while (xNORy) {
    xNORy &= xNORy - 1;
    result++;
  }

  return result;
}
// @lc code=end
