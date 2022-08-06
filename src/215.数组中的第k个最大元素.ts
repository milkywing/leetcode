/*
 * @lc app=leetcode.cn id=215 lang=typescript
 * https://leetcode.cn/problems/kth-largest-element-in-an-array/description/
 * [215] 数组中的第K个最大元素
 */

import { PriorityQueue } from './base-structure/priority-queue';

// @lc code=start
/**
 * 方案A（本解）：快排划分，因快排的每一次划分都会把基准值放置到正确的位置，对于升序排序，在划分阶段如果某个基准值被放到了 len - k 位置，直接返回该基准值即可
 * 方案B：第 k 个最大元素，可以维护一个大顶堆，然后移除 k-1 个堆顶，此时堆顶即是所求
 */
function findKthLargest(nums: number[], k: number): number {
  const len = nums.length;
  const targetIndex = len - k;
  let [left, right] = [0, len - 1];

  while (true) {
    const [pivotLeft, pivotRight] = partition(nums, left, right);
    if (targetIndex > pivotRight) {
      // 目标位置在基准区域右边，对右边进行划分
      left = pivotRight + 1;
      // 为下一次划分随机选择一个基准值
      swap(nums, left + Math.floor(Math.random() * (right - left + 1)), right);
    } else if (targetIndex < pivotLeft) {
      // 目标位置在基准区域左边，对左边进行划分
      right = pivotLeft - 1;
      // 为下一次划分随机选择一个基准值
      swap(nums, left + Math.floor(Math.random() * (right - left + 1)), right);
    } else {
      // 目标位置在基准区域内，直接返回
      return nums[targetIndex];
    }
  }
}

/** 快排的划分操作，返回划分后的基准区间 */
const partition = (nums: number[], left: number, right: number) => {
  const pivot = nums[right];
  let pLess = left - 1;
  let pMore = right;
  let i = left;

  while (i < pMore) {
    if (nums[i] < pivot) {
      swap(nums, i, pLess + 1);
      pLess++;
      i++;
    } else if (nums[i] > pivot) {
      swap(nums, i, pMore - 1);
      pMore--;
    } else {
      i++;
    }
  }

  // 将尾部基准值放到大区的左边界，使其回归等于区
  swap(nums, pMore, right);

  // 此时，pLess+1、pMore 即为等于基准值区边界
  return [pLess + 1, pMore];
};

/** 交换数组的两个数值 */
const swap = (arr: number[], i: number, j: number) => {
  if (i === j) return;
  arr[i] ^= arr[j];
  arr[j] ^= arr[i];
  arr[i] ^= arr[j];
};
// @lc code=end

/** 大顶堆解法 */
const findKthLargest2 = (nums: number[], k: number): number => {
  const maxHeap = new PriorityQueue(nums, (a, b) => b - a);

  for (let i = 0; i < k - 1; i++) {
    maxHeap.dequeue();
  }

  return maxHeap.top!;
};
