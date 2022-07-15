/*
 * @lc app=leetcode.cn id=611 lang=typescript
 *
 * [611] 有效三角形的个数
 */

// @lc code=start
/** 升序排序，先选取大边和中边，再从中边左侧选取小边 */
function triangleNumber(nums: number[]): number {
  const length = nums.length;
  if (length < 3) return 0;

  let result = 0;

  // 先来升序排序
  nums.sort((a, b) => a - b);

  // 以 nums[i] 为大边，在 i 的左侧寻找中边和小边，使其满足 小边+中边 > 大边
  for (let i = 2; i < length; i++) {
    // 以 nums[j] 为中边，在 j 的左侧寻找小边 nums[k]，
    // 可以用二分查找优化，在 [0,j-1] 区间找到第一个位置 t 满足 nums[t] + nums[j] > nums[i] 的位置，[t,j-1]区间的值都可以作为小边
    for (let j = i - 1; j >= 0; j--) {
      let [left, right] = [0, j - 1];

      while (left <= right) {
        const mid = (left + right) >> 1;
        if (nums[mid] + nums[j] > nums[i]) {
          right = mid - 1;
        } else {
          left = mid + 1;
        }
      }
      result += j - left;
    }
  }

  return result;
}

const triangleNumberB = (nums: number[]): number => {
  const length = nums.length;
  if (length < 3) return 0;

  let result = 0;

  // 先来升序排序
  nums.sort((a, b) => a - b);

  // 以 nums[i] 为大边，在 i 的左侧寻找中边和小边，使其满足 小边+中边 > 大边
  for (let i = 2; i < length; i++) {
    // 以 nums[j] 为中边，在 j 的左侧寻找小边 nums[k]：
    // 【优化】k，j 组成左右双指针向中间遍历，每次固定一个 j，
    // 让 k 不断向右走（不用归位），找到第一个位置找到第一个位置 t 满足 nums[t] + nums[j] > nums[i] 的位置，[t,j-1] 区间的值都可以作为小边，
    // 然后让 j 左移，继续让 k 走
    for (let j = i - 1, k = 0; k < j; j--) {
      while (k < j && nums[k] + nums[j] <= nums[i]) k++;
      result += j - k;
    }
  }

  return result;
};
// @lc code=end
