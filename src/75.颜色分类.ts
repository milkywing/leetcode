/*
 * @lc app=leetcode.cn id=75 lang=typescript
 * https://leetcode.cn/problems/sort-colors/description/
 * [75] 颜色分类
 */

// @lc code=start
/**
 Do not return anything, modify nums in-place instead.
 */
/** 参考快排的partition操作 */
function sortColors(nums: number[]): void {
  const length = nums.length;
  // 将白色 1 作为基准，将 0 放在左边，2 放在右边
  let [pCur, pLess, pMore] = [0, -1, length];
  const pivot = 1;

  while (pCur < pMore) {
    if (nums[pCur] < pivot) {
      [nums[pLess + 1], nums[pCur]] = [nums[pCur], nums[pLess + 1]];
      pLess++;
      pCur++;
    } else if (nums[pCur] > pivot) {
      [nums[pMore - 1], nums[pCur]] = [nums[pCur], nums[pMore - 1]];
      pMore--;
    } else {
      pCur++;
    }
  }
}
// @lc code=end
