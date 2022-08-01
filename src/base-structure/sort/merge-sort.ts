// 递归复杂度估计 master 公式 ：T(N) = a*T(N/b) + O(N^d)
// log(b, a) > d => T(N) = O(N^log(b, a))
// log(b, a) = d => T(N) = O(N^d * logN)
// log(b, a) < d => T(N) = O(N^d)

/** 归并排序——O(n*log n)——稳定 */
export const mergeSort = (arr: number[]): number[] => {
  return mergeSortCore(arr, 0, arr.length);
};

const mergeSortCore = (arr: number[], left: number, right: number): number[] => {
  if (right - left <= 1) return arr.slice(left, right);

  // 将数组分成两半，对两半进行递归归并排序
  const mid = (left + right) >>> 1;
  const leftSorted = mergeSortCore(arr, left, mid);
  const rightSorted = mergeSortCore(arr, mid, right);

  // 排好序的两半合并为整体有序
  return merge(leftSorted, rightSorted);
};

/** 排序核心，将有序的两部分合并为整体有序 */
const merge = (left: number[], right: number[]): number[] => {
  const result: number[] = [];
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      // 相等时也优先靠背左侧的，维持稳定性
      result.push(left.shift()!);
    } else {
      result.push(right.shift()!);
    }
  }

  result.push(...left, ...right);
  return result;
};
