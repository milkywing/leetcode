/*
 * @lc app=leetcode.cn id=88 lang=typescript
 * https://leetcode.cn/problems/merge-sorted-array/description/
 * [88] 合并两个有序数组
 */

// @lc code=start
/**
 Do not return anything, modify nums1 in-place instead.
 */
/** 参考归并排序的merge操作 */
function merge(nums1: number[], m: number, nums2: number[], n: number): void {
  // 双指针分别从右往左遍历 nums1 和 nums2
  // 逆向遍历是为了从尾部开始填充 nums1，避免申请额外空间
  let [p1, p2] = [m - 1, n - 1];
  let targetIndex = m + n - 1;

  while (p1 >= 0 && p2 >= 0) {
    // 两个指针中取值大的，相等的话优先取 p2 保持稳定性，然后对应指针左移
    if (nums1[p1] <= nums2[p2]) {
      nums1[targetIndex] = nums2[p2];
      p2--;
    } else {
      nums1[targetIndex] = nums1[p1];
      p1--;
    }
    targetIndex--;
  }

  // 将 nums2 剩余未遍历的值回填
  while (p2 >= 0) {
    nums1[targetIndex] = nums2[p2];
    p2--;
    targetIndex--;
  }
}
// @lc code=end
