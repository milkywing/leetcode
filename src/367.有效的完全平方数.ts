/*
 * @lc app=leetcode.cn id=367 lang=typescript
 * https://leetcode.cn/problems/valid-perfect-square/description/
 * [367] 有效的完全平方数
 */

// @lc code=start
/** 二分在 [0,num] 区间内看能否找到 targe，使得 target**2 为 num */
function isPerfectSquare(num: number): boolean {
  let [left, right] = [0, num];

  while (left <= right) {
    const mid = (left + right) >> 1;
    const pow = mid ** 2;
    if (pow === num) return true;
    if (pow < num) left = mid + 1;
    else right = mid - 1;
  }

  return false;
}
// @lc code=end
