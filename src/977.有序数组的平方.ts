/*
 * @lc app=leetcode.cn id=977 lang=typescript
 * https://leetcode.cn/problems/squares-of-a-sorted-array/description/
 * [977] 有序数组的平方
 */

// @lc code=start
/**
 * 方案A：先找到正负数分界线，然后从分界线向两边遍历，选择平方值大的正序填充数组
 * 方案B（本解）：双指针从两边向中间遍历，选择平方值大的逆序填充数组（因为题目给的数组，其绝对值肯定是两侧向中间递减的）
 */
function sortedSquares(nums: number[]): number[] {
  const length = nums.length;
  const result: number[] = Array(length);
  let [p1, p2] = [0, length - 1];
  let targetIndex = length - 1;

  while (p1 <= p2) {
    const [absP1, absP2] = [Math.abs(nums[p1]), Math.abs(nums[p2])];
    if (absP1 < absP2) {
      result[targetIndex] = absP2 ** 2;
      p2--;
    } else {
      result[targetIndex] = absP1 ** 2;
      p1++;
    }
    targetIndex--;
  }

  return result;
}
// @lc code=end
