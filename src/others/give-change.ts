/**
 * 给定一组面值的货币（不限张数）和一个值 n，求 n 找零方法数：
 * [0..index-1] 中的面值为已经选择过，现在开始选择使用 arr[index] 面值
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
