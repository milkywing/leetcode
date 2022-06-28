/**
 * 【问题】给定一组面值的货币（不限张数）和一个值 n，求 n 找零方法数
 */

/**
 * 从左到右尝试模型：
 * index 表示当前正在考虑是否使用面值的索引，还剩 [index+1..length-1] 范围的面值没考虑，rest 表示当前剩余找零，
 * 函数返回基于 [index..length-1] 范围内面值， rest 的找零方法数
 */
export const giveChange = (arr: number[], index: number, rest: number): number => {
  // 如果所有面值都已经选择，判断找零是否完成
  if (index === arr.length) return rest === 0 ? 1 : 0;

  let count = 0;

  // 只要不超过剩余找零，就可以使用任意张面值为 arr[index] 的货币
  for (let i = 0; i * arr[index] <= rest; i++) {
    count += giveChange(arr, index + 1, rest - i * arr[index]);
  }

  return count;
};
