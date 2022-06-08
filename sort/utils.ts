/* eslint-disable no-param-reassign */

/** 生成[start, end)区间的整数序列 */
export const range = (start: number, end: number) => Array.from({ length: end - start }, (_, i) => start + i);

/** 生成[0, end)区间的整数序列 */
export const rangeFromZero = (end: number) => range(0, end);

/** 生成指定长度的随机整数序列 */
export const randomArray = (length: number, { min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER }) =>
  Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);

/** 交换数组的两个数值 */
export const swap = (arr: number[], i: number, j: number) => {
  if (i === j) return;
  arr[i] ^= arr[j];
  arr[j] ^= arr[i];
  arr[i] ^= arr[j];
};
