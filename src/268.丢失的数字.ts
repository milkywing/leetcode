/*
 * @lc app=leetcode.cn id=268 lang=typescript
 *
 * [268] 丢失的数字
 */

// @lc code=start
/** 等差数列公式求预期和，然后预期和减去数组内的值 */
function missingNumber(nums: number[]): number {
  const length = nums.length;
  let expectSum = (length * (length + 1)) / 2;

  nums.forEach((num) => {
    expectSum -= num;
  });

  return expectSum;
}
// @lc code=end
