import { swap } from './utils';

// IMPORTANT
// 排序核心，默认取right位置的值作为基准，对[left, right]区间的数进行划分，使其按【小于基准、等于基准、大于基准】排序，并返回等于基准值区边界，本质是把基准值放到正确的位置
const partition = (arr: number[], left: number, right: number) => {
  const pivot = arr[right];

  // 小于基准区域的右边界指针
  let pLess = left - 1;
  // 大于基准区域左边界指针
  let pMore = right;
  // 从左到右的遍历指针（等于基准区域右边界）
  let i = left;

  // 只要遍历指针和大区指针还未相遇，说明还未完成排序
  while (i < pMore) {
    if (arr[i] < pivot) {
      // 当前值小于基准，把当前值和小区的后一个值替换，小区右扩，遍历指针右移动
      swap(arr, i, pLess + 1);
      pLess++;
      i++;
    } else if (arr[i] > pivot) {
      // 当前值大于基准，把当前值和大区的前一个值替换，大区左扩，【遍历指针保持不动】
      swap(arr, i, pMore - 1);
      pMore--;
    } else {
      // 当前值等于基准，遍历指针右移
      i++;
    }
  }
  // 将尾部基准值放到大区的左边界，使其回归等于区
  swap(arr, right, pMore);

  // 此时，pLess+1、pMore 即为等于基准值区边界
  return [pLess + 1, pMore];
};

const quickSortCore = (arr: number[], left: number, right: number) => {
  // 终止条件：不符合 left < right
  if (left >= right) return;

  // [left, right]区间随机选择一个数，并和区间最后一个值交换，作为基准值
  swap(arr, left + Math.floor(Math.random() * (right - left + 1)), right);
  // 使用基准值对[left, right]区间的数进行划分，获取划分后基准边界值
  const [pivotLeft, pivotRight] = partition(arr, left, right);
  // 对边界两侧的区间进行快排（递归）
  quickSortCore(arr, left, pivotLeft - 1);
  quickSortCore(arr, pivotRight + 1, right);
};

/** 快排——O(n*log n)——不稳定 */
export const quickSort = (arr: number[]) => {
  const arrLength = arr.length;
  if (arrLength < 2) return arr;
  quickSortCore(arr, 0, arrLength - 1);

  return arr;
};
