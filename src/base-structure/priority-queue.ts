/** 基于堆实现的优先队列（默认小优先） */
export class PriorityQueue<T = number> {
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

  /** 当前优先值 */
  public get top(): T | undefined {
    return this.heap[0];
  }

  /** 优先队列大小 */
  public get size(): number {
    return this.heap.length;
  }

  public isEmpty(): boolean {
    return this.heap.length === 0;
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
      // 记录被调整节点及其子节点中最大值的下标
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
