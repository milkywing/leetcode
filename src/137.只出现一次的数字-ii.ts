/*
 * @lc app=leetcode.cn id=137 lang=typescript
 *
 * [137] 只出现一次的数字 II
 */

// @lc code=start
/**
 * 假设出现一次的数为 x，其他数都出现了 3 次，
 * 现在考虑每个数二进制的1-32位，统计每位上 1/0 出现的次数，因为其他数都出现了 3 次，所以该位上的和模 3 后的余数即为 x 该位上值
 */
function singleNumber(nums: number[]): number {
  let result = 0;
  for (let i = 0; i < 32; i++) {
    let bitSum = 0;
    nums.forEach((num) => {
      bitSum += (num >>> i) & 1;
    });
    result |= bitSum % 3 << i;
  }

  return result;
}
// @lc code=end
