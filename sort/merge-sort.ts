import { randomArray, range } from './utils';

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
export const mergeSort = (arr: number[]) => {
  const arrLength = arr.length;
  if (arrLength < 2) {
    return arr;
  }
  // 将数组分成两半
  const middle = Math.floor(arrLength / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  // 对两半进行归并排序，并将结果合并为整体有序
  return merge(mergeSort(left), mergeSort(right));
};

/** 校验排序算法的准确性 */
const testSort = () => {
  const allPass = range(0, 100).every(() => {
    const originArray = randomArray(100, { min: -50, max: 50 });
    // 标准排序
    const sortedArray = [...originArray].sort((a, b) => a - b);
    // 归并排序
    const mergeSortedArray = mergeSort([...originArray]);

    const singlePass = sortedArray.every((value, index) => {
      if (mergeSortedArray[index] !== value) return false;
      return true;
    });

    return singlePass;
  });

  if (!allPass) throw Error('排序算法有误');
};

testSort();
