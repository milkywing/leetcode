import { expect } from 'chai';
import { bubbleSort, heapSort, insertionSort, mergeSort, quickSort, radixSort, selectionSort } from '../sort';
import { randomArray } from '../sort/utils';

/** 待排序数组集 */
let targetArrays: number[][];
/** 标准排序数组集 */
let standardArrays: number[][];

describe('排序方法测试', () => {
  beforeEach(() => {
    targetArrays = Array.from({ length: 100 }, () => randomArray(50, { min: -100, max: 100 }));
    standardArrays = targetArrays.map((arr) => [...arr].sort((a, b) => a - b));
  });

  it('冒泡排序', () => {
    targetArrays.forEach((targetArray, index) => {
      expect(bubbleSort([...targetArray])).to.deep.equal(standardArrays[index]);
    });
  });

  it('选择排序', () => {
    targetArrays.forEach((targetArray, index) => {
      expect(selectionSort([...targetArray])).to.deep.equal(standardArrays[index]);
    });
  });

  it('插入排序', () => {
    targetArrays.forEach((targetArray, index) => {
      expect(insertionSort([...targetArray])).to.deep.equal(standardArrays[index]);
    });
  });

  it('归并排序', () => {
    targetArrays.forEach((targetArray, index) => {
      expect(mergeSort([...targetArray])).to.deep.equal(standardArrays[index]);
    });
  });

  it('快速排序', () => {
    targetArrays.forEach((targetArray, index) => {
      expect(quickSort([...targetArray])).to.deep.equal(standardArrays[index]);
    });
  });

  it('堆排序', () => {
    targetArrays.forEach((targetArray, index) => {
      expect(heapSort([...targetArray])).to.deep.equal(standardArrays[index]);
    });
  });

  it('基数排序', () => {
    targetArrays.forEach((targetArray, index) => {
      expect(radixSort([...targetArray])).to.deep.equal(standardArrays[index]);
    });
  });
});
