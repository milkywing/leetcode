// 递归复杂度估计 master 公式 ：T(N) = a*T(N/b) + O(N^d)
// log(b, a) > d => T(N) = O(N^log(b, a))
// log(b, a) = d => T(N) = O(N^d * logN)
// log(b, a) < d => T(N) = O(N^d)

/** 排序核心，将有序的两部分合并为整体有序 */
const merge = (left: number[], right: number[]) => {
  const result: number[] = [];
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift()!);
    } else {
      result.push(right.shift()!);
    }
  }

  return result.concat(left, right);
};

/** 归并排序——O(n*log n)——不稳定 */
export const mergeSort = (arr: number[]): number[] => {
  const arrLength = arr.length;
  if (arrLength < 2) {
    return arr;
  }
  // 将数组分成两半
  const middle = Math.floor(arrLength / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  // 对两半进行归并排序（递归），并将结果合并为整体有序
  return merge(mergeSort(left), mergeSort(right));
};
