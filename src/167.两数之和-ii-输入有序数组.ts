/*
 * @lc app=leetcode.cn id=167 lang=typescript
 * https://leetcode.cn/problems/two-sum-ii-input-array-is-sorted/description/
 * [167] 两数之和 II - 输入有序数组
 */

// @lc code=start
function twoSum(numbers: number[], target: number): number[] {
  let [left, right] = [0, numbers.length - 1];

  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) return [left + 1, right + 1];
    if (sum < target) {
      left++;
    } else {
      right--;
    }
  }

  return [-1, -1];
}
// @lc code=end
