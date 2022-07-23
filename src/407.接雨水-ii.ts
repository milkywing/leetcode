/*
 * @lc app=leetcode.cn id=407 lang=typescript
 *
 * [407] 接雨水 II
 */

// @lc code=start
interface HeapItem {
  /** 行位置 */
  x: number;
  /** 列位置 */
  y: number;
  /** 高度 */
  height: number;
}

function trapRainWater(heightMap: number[][]): number {
  const n = heightMap.length;
  const m = heightMap[0].length;
  // 只有一行/一列，装不了水
  if (n * m === 0) return 0;

  // 使用一个小顶对维护一个围墙，方便统计内部水的数量
  const minHeap = new PriorityQueue<HeapItem>([], (a, b) => a.height - b.height);
  // 用一个二维数组记录每个位置计算过水量没有
  const visited: boolean[][] = Array.from({ length: n }, () => Array(m).fill(false));

  // 先吧最外一圈放进堆里，作为初始围墙
  for (let j = 0; j < m; j++) {
    minHeap.enqueue({ x: 0, y: j, height: heightMap[0][j] }, { x: n - 1, y: j, height: heightMap[n - 1][j] });
    visited[0][j] = true;
    visited[n - 1][j] = true;
  }
  for (let i = 1; i < n - 1; i++) {
    minHeap.enqueue({ x: i, y: 0, height: heightMap[i][0] }, { x: i, y: m - 1, height: heightMap[i][m - 1] });
    visited[i][0] = true;
    visited[i][m - 1] = true;
  }

  let result = 0;
  // 方向数组，方便计算某个位置四周的位置
  const directions = [-1, 0, 1, 0, -1];

  while (!minHeap.isEmpty()) {
    // 从围墙中弹出一个最低的位置
    const curMinWall = minHeap.dequeue()!;
    // 看下该位置的周围四个位置能不能灌水
    for (let k = 0; k < 4; k++) {
      const [x, y] = [curMinWall.x + directions[k], curMinWall.y + directions[k + 1]];
      // 如果周围的位置无越界并且没计算过水量，开始计算
      if (x >= 0 && x < n && y >= 0 && y < m && !visited[x][y]) {
        // 如果最低的墙比周围的位置高，说明能往该位置灌水
        if (curMinWall.height > heightMap[x][y]) {
          result += curMinWall.height - heightMap[x][y];
        }
        // 无论该位置灌没灌水，该位置会作为新的围墙进堆，而且高度和 curMinWall 取大者
        minHeap.enqueue({
          x,
          y,
          height: Math.max(curMinWall.height, heightMap[x][y]),
        });
        // 将该位置标记为计算过
        visited[x][y] = true;
      }
    }
  }

  return result;
}

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
// @lc code=end
