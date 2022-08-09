/*
 * @lc app=leetcode.cn id=692 lang=typescript
 * https://leetcode.cn/problems/top-k-frequent-words/description/
 * [692] 前K个高频单词
 */

// @lc code=start

interface HeapItem {
  word: string;
  count: number;
}

/**
 * 方案A（本解）：先使用 map 统计各个单词的词频，然后使用大小为 k 的小顶堆维护频率最大的 k 个单词
 * 方案B：魔改小顶堆，使其支持更新某个节点的频率并自动维持堆结构（可参考堆优化的 dijkstra）
 */
function topKFrequent(words: string[], k: number): string[] {
  // 统计词频
  const map = new Map<string, number>();
  words.forEach((word) => {
    map.set(word, (map.get(word) ?? 0) + 1);
  });

  // 小顶堆，根据词频排序，如果词频相同则采用字典序排序
  const pq = new PriorityQueue<HeapItem>([], (a, b) => {
    if (a.count === b.count) {
      return b.word.localeCompare(a.word);
    }
    return a.count - b.count;
  });

  map.forEach((count, word) => {
    // 维护大小为 k 的小顶堆
    pq.enqueue({ word, count });
    if (pq.size > k) {
      pq.dequeue();
    }
  });

  const result: string[] = [];

  // 最后堆中的值即是题目所求 topk
  while (pq.size) {
    result.push(pq.dequeue()!.word);
  }

  // 出堆是频率小和字典序大优先，因此这里需要反序
  return result.reverse();
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

  /** 当前优先值 */
  public get top(): T | undefined {
    return this.heap[0];
  }

  /** 优先队列大小 */
  public get size(): number {
    return this.heap.length;
  }

  public isEmpty(): boolean {
    return this.size === 0;
  }

  /** 入队 */
  public enqueue(...elements: T[]): void {
    elements.forEach((element) => {
      this.heap.push(element);
      this.shiftUp(this.size - 1);
    });
  }

  /** 出队 */
  public dequeue(): T | undefined {
    if (this.size === 0) return undefined;
    if (this.size === 1) return this.heap.pop();
    const result = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.shiftDown(0);
    return result;
  }

  /** 向上调整结点维持堆结构 */
  private shiftUp(index: number): void {
    if (index <= 0 || index >= this.size) return;
    let i = index;
    let parentI = (index - 1) >> 1;

    while (parentI >= 0 && this.compare(this.heap[i], this.heap[parentI]) < 0) {
      [this.heap[i], this.heap[parentI]] = [this.heap[parentI], this.heap[i]];
      i = parentI;
      parentI = (i - 1) >> 1;
    }
  }

  /** 向下调整结点维持堆结构 */
  private shiftDown(index: number): void {
    const heapSize = this.size;
    if (index < 0 || index >= heapSize) return;
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
// @lc code=end
