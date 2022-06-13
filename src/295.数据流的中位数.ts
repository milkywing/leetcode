/*
 * @lc app=leetcode.cn id=295 lang=typescript
 *
 * [295] 数据流的中位数
 */

// @lc code=start
/**
 * 维护一个【小顶堆存储比中位数大的数】和【大顶堆存储比中位数小的数】，放入的第一个数放入小顶堆，
 * 每接收一个数 num，若比中位数小，则放入小顶堆，否则放入大顶堆，并维持小顶堆大小比大顶堆大1或相等
 * 取中位数时，小顶堆大小若比大顶堆的大（当奇数时），取小顶堆的堆顶；两堆大小相等（当偶数时），取两堆的堆顶的平均值。
 */
class MedianFinder {
  /** 使用一个大顶堆存储比中位数小的数 */
  private smallerQue = new PriorityQueue<number>([], (a, b) => b - a);

  /** 使用一个小顶堆存储比中位数大的数 */
  private biggerQue = new PriorityQueue<number>();

  public addNum(num: number): void {
    const smallerQueSize = this.smallerQue.size;
    const biggerQueSize = this.biggerQue.size;
    if (!smallerQueSize && !biggerQueSize) {
      this.smallerQue.enqueue(num);
      return;
    }

    // 考虑smaller(1、4)、bigger(8, 10)，中位数为6
    // 1.若 num 比中位数6小，num 直接放入smaller
    // 2.若 num 比中位数6大，但比 bigger 中的最小值小，比中位数6小，num 直接放入smaller
    // 3.若 num 比中位数6大，且比 bigger 中的最小值大，需把 num 放入 bigger，然后把 bigger 中的最小值放入 smaller
    // 即可以先将 num 放入 bigger，再将 bigger 中的最小值放入 smaller
    if (smallerQueSize === biggerQueSize) {
      this.biggerQue.enqueue(num);
      this.smallerQue.enqueue(this.biggerQue.dequeue()!);
    } else {
      // 考虑smaller(1、3)、bigger(5)，中位数为3
      // 1.若 num 比中位数3大，num 直接放入 bigger
      // 2.若 num 比中位数3小，需把 num 放入 smaller，然后把 smaller 中的最大值放入 bigger
      // 即可以先将 num 放入 smaller，再将 smaller 中的最大值放入 bigger
      this.smallerQue.enqueue(num);
      this.biggerQue.enqueue(this.smallerQue.dequeue()!);
    }
  }

  public findMedian(): number {
    if (this.smallerQue.size === this.biggerQue.size) {
      return (this.smallerQue.top! + this.biggerQue.top!) / 2;
    }
    return this.smallerQue.top!;
  }
}

/** 基于堆实现的优先队列（默认小优先） */
class PriorityQueue<T = number> {
  /** 元素集 */
  private heap: T[] = [];

  // eslint-disable-next-line class-methods-use-this
  private compare: (a: T, b: T) => number = (a: unknown, b: unknown) => {
    if (typeof a === 'number' && typeof b === 'number') {
      return a - b;
    }
    throw Error('非基础类型请提供比较器');
  };

  constructor(elements?: T[], compare?: (a: T, b: T) => number) {
    this.compare = compare ?? this.compare;
    if (elements) this.enqueue(...elements);
  }

  /** 入队 */
  public enqueue(...elements: T[]): void {
    elements.forEach((element) => {
      this.heap.push(element);
      this.heapifyUp(this.heap.length - 1);
    });
  }

  /** 出队 */
  public dequeue(): T | undefined {
    if (this.heap.length === 0) return undefined;
    if (this.heap.length === 1) return this.heap.pop();
    const result = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.heapifyDown(0);
    return result;
  }

  /** 当前优先值 */
  public get top(): T | undefined {
    return this.heap[0];
  }

  /** 优先队列大小 */
  public get size(): number {
    return this.heap.length;
  }

  /** 向上调整结点维持堆结构 */
  private heapifyUp(index: number): void {
    if (index <= 0 || index >= this.heap.length) return;
    let i = index;
    let parentI = (index - 1) >> 1;

    while (parentI >= 0 && this.compare(this.heap[i], this.heap[parentI]) < 0) {
      [this.heap[i], this.heap[parentI]] = [this.heap[parentI], this.heap[i]];
      i = parentI;
      parentI = (i - 1) >> 1;
    }
  }

  /** 向下调整结点维持堆结构 */
  private heapifyDown(index: number): void {
    const heapSize = this.heap.length;
    if (index < 0 || index >= this.heap.length) return;
    let i = index;
    // 当前被调整节点的左孩子下标
    let left = (i << 1) + 1;

    // 完全二叉树的特性，若左孩子不存在，则右孩子不存在。该条件用于判断是否有儿子
    while (left < heapSize) {
      // 交换目标下标
      const right = left + 1;
      let targetIndex = right < heapSize && this.compare(this.heap[right], this.heap[left]) < 0 ? right : left;
      targetIndex = this.compare(this.heap[targetIndex], this.heap[i]) < 0 ? targetIndex : i;

      // 若交换目标是本身，结束向下调整
      if (targetIndex === i) break;

      // 被调整节点和交换目标交换，继续向下调整
      [this.heap[i], this.heap[targetIndex]] = [this.heap[targetIndex], this.heap[i]];
      i = targetIndex;
      left = (i << 1) + 1;
    }
  }
}

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */
// @lc code=end
