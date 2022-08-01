/*
 * @lc app=leetcode.cn id=4 lang=typescript
 * https://leetcode.cn/problems/median-of-two-sorted-arrays/description/
 * [4] 寻找两个正序数组的中位数
 */

// @lc code=start
/**
 * 方案A（本解）：对于长度和为 len 的两个数组，求中位数的过程可以转化为第 k 小的数（当长度和为奇数，k = (len+1)/2；当长度和为偶数，k1 = len/2, k2 = len/2 +1）
 * 方案B：将两个数组合成为整体有序数组，然后直接求中位数
 */
function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  const sumLength = nums1.length + nums2.length;
  // 奇数
  if (sumLength % 2) {
    return getKthMin(nums1, nums2, (sumLength + 1) >> 1);
  }
  // 偶数
  return (getKthMin(nums1, nums2, sumLength / 2) + getKthMin(nums1, nums2, sumLength / 2 + 1)) / 2;
}

const getKthMin = (nums1: number[], nums2: number[], k: number): number => {
  if (!nums1.length) return nums2[k - 1];
  if (!nums2.length) return nums1[k - 1];
  if (k === 1) return Math.min(nums1[0], nums2[0]);
  /**
   * 核心思想，想求两个有序数组中的第 k 小(target)，只要排除 k-1 个更小的数即可
   * 1. 第一次从任一数组中可以排除 step = k/2 个比 target 小的数，记录已经排除个数 checkNum = step
   * 2. 第二次继续从任一数组中排除 step = (k-checkNum)/2 个比 target 小的数，记录已经排除个数 checkNum += step
   * 3. 如此循环直至任一数组被排除完，或 checkNum === k - 1 时停止
   */

  let step = k >> 1;
  let checkNum = 0;
  // 使用两个指针分别记录两个数组已经被排除的值，指针左侧是已经被排除的，指针指向的是两个数组要相互比较的值
  let [p1, p2] = [0, 0];

  const [length1, length2] = [nums1.length, nums2.length];
  while (checkNum < k) {
    // 当任一数组率先被排除完（设其长度为len），另外一个数组中的第 k-len 小即为目标
    if (p1 >= length1) return nums2[k - length1 - 1];
    if (p2 >= length2) return nums1[k - length2 - 1];
    // 当已经排除 k-1 个更小值，下一个值就是目标了，从两个数组中取小的值
    if (checkNum === k - 1) return Math.min(nums1[p1], nums2[p2]);

    if (p1 + step - 1 < length1 && p2 + step - 1 < length2) {
      // 【1】加上 step 后两个数组都不会越界，排除小的那个
      if (nums1[p1 + step - 1] < nums2[p2 + step - 1]) {
        p1 += step;
      } else {
        p2 += step;
      }
      checkNum += step;
    } else if (p1 + step - 1 >= length1) {
      // 【2】加上 step 后 nums1 会越界
      if (nums1[length1 - 1] < nums2[p2 + step - 1]) {
        // 如果 nums1 是小的那个，排除剩下值
        p1 = length1;
        checkNum += length1 - p1;
      } else {
        p2 += step;
        checkNum += step;
      }
    } else if (nums1[p1 + step - 1] < nums2[length2 - 1]) {
      // 【3】加上 step 后 nums2 会越界，
      p1 += step;
      checkNum += step;
    } else {
      // 如果 nums2 是小的那个，排除剩下值
      p2 = length2;
      checkNum += length2 - p2;
    }

    // 更新步长
    step = (k - checkNum) >> 1;
  }

  return 0;
};
// @lc code=end
