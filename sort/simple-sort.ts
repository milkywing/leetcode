import { randomArray, range, swap } from './utils';

/** 冒泡排序——O(n^2)——稳定 */
export const bubbleSort = (arr: number[]) => {
  const arrLength = arr.length;
  // 为位置 i 找到本轮冒泡的最大值
  for (let i = arrLength - 1; i > 0; i--) {
    // 对 [0, i] 位置的值进行冒泡，较大值向后移动
    range(0, i).forEach((j) => {
      if (arr[j] > arr[j + 1]) swap(arr, j, j + 1);
    });
  }

  return arr;
};

/** 选择排序——O(n^2)——不稳定 */
export const selectionSort = (arr: number[]) => {
  const arrLength = arr.length;
  // 从左到右，为位置 i 找到本轮选择的最小值（最后一个位置可以忽略）
  range(0, arrLength - 1).forEach((i) => {
    // 对 [i+1, arrLength-1] 位置的值进行选择，记住最小值的位置
    let minIndex = i;
    range(i + 1, arrLength).forEach((j) => {
      if (arr[j] < arr[minIndex]) minIndex = j;
    });
    // 将本轮选择的最小值放到位置 i
    swap(arr, i, minIndex);
  });

  return arr;
};

/** 插入排序——O(n^2)——稳定 */
export const insertionSort = (arr: number[]) => {
  const arrLength = arr.length;
  // 从第二个位置开始，为位置 i 找到本轮插入的位置
  range(1, arrLength).forEach((i) => {
    // 对 [0, i] 位置的值进行插入，较大值向后移动
    let j = i - 1;
    while (j >= 0 && arr[j] > arr[j + 1]) {
      swap(arr, j, j + 1);
      j--;
    }
  });

  return arr;
};

/** 校验排序算法的准确性 */
const testSort = () => {
  const allPass = range(0, 100).every(() => {
    const originArray = randomArray(100, { min: -50, max: 50 });
    // 标准排序
    const sortedArray = [...originArray].sort((a, b) => a - b);
    // 冒泡排序
    const bubbleSortedArray = bubbleSort([...originArray]);
    // 选择排序
    const selectionSortedArray = selectionSort([...originArray]);
    // 插入排序
    const insertionSortedArray = insertionSort([...originArray]);

    const singlePass = sortedArray.every((value, index) => {
      if (bubbleSortedArray[index] !== value) return false;
      if (selectionSortedArray[index] !== value) return false;
      if (insertionSortedArray[index] !== value) return false;
      return true;
    });

    return singlePass;
  });

  if (allPass) console.log('校验通过');
};

testSort();
