/*
 * @lc app=leetcode.cn id=136 lang=typescript
 *
 * [136] 只出现一次的数字
 */

// @lc code=start
/** 利用异或特性，同数异或得 0，0 异或任何数得本身，将所有数全异或起来即可 */
function singleNumber(nums: number[]): number {
  let result = 0;

  nums.forEach((num) => {
    result ^= num;
  });

  return result;
}
// @lc code=end
