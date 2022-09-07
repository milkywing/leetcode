/**
 * 位置连续的数组组成一个堆（完全二叉树），对于位置i，其左孩子为2i+1，右孩子为2i+2，父节点为(i-1)/2
 * 大顶堆：父节点的值大于子节点的值的堆，通过构造大顶堆并逐一取出根节点，可完成排序
 */
import { rangeFromZero, swap } from './utils';

// IMPORTANT
/** 向上调整位置 i 的节点，维持大顶堆 */
const shiftUp = (arr: number[], index: number) => {
  // index 为被调整节点下标
  let parentIndex = (index - 1) >>> 1;

  // 被调整的节点只要小于父节点，就一直跟父节点交换（向上调整）
  while (index > 0 && arr[parentIndex] < arr[index]) {
    swap(arr, parentIndex, index);
    index = parentIndex;
    parentIndex = (index - 1) >>> 1;
  }
};

/** 向下调整位置 i 的节点，维持大顶堆 */
const shiftDown = (arr: number[], i: number, heapSize: number) => {
  // index 为被调整节点下标
  let index = i;
  // 当前被调整节点的左孩子下标
  let left = (index << 1) + 1;

  // 完全二叉树的特性，若左孩子不存在，则右孩子不存在。该条件用于判断是否有儿子
  while (left < heapSize) {
    // 记录被调整节点及其子节点中最大值的下标
    const rightIndex = left + 1;
    let maxIndex = rightIndex < heapSize && arr[rightIndex] > arr[left] ? rightIndex : left;
    maxIndex = arr[maxIndex] > arr[index] ? maxIndex : index;

    // 若最大值就是本身，结束向下调整
    if (maxIndex === index) {
      break;
    }

    // 被调整节点与最大孩子节点交换，继续向下调整
    swap(arr, index, maxIndex);
    index = maxIndex;
    left = (index << 1) + 1;
  }
};

/** 堆排序——O(n*log n)——不稳定 */
export const heapSort = (arr: number[]) => {
  const arrLength = arr.length;

  // 构建大顶堆方案1：扫描数组，把当前值作二叉树的尾节点，并对其进行向上调整，构造大顶堆
  rangeFromZero(arrLength).forEach((i) => shiftUp(arr, i));

  // 构建大顶堆方案2：对当前二叉树从下到上，从右到左进行对每个节点进行向下调整，构造大顶堆
  // for (let i = arrLength - 1; i >= 0; i--) {
  //   shiftDown(arr, i, arrLength);
  // }

  // 堆大小决定了当前可视堆
  let heapSize = arrLength;

  while (heapSize > 0) {
    // 将堆顶跟堆最后一个元素交换，并将堆大小减一
    // 这里同时也是逐步取出最大值，从尾部向头部放置，实现升序
    swap(arr, 0, heapSize - 1);
    heapSize--;
    // 对被顶到堆顶的新节点（原堆的最后一个元素）进行向下调整，维持大顶堆
    shiftDown(arr, 0, heapSize);
  }

  return arr;
};
