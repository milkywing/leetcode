import { connectTwoNodesUnDirected, createNode, Node } from '../model/graph';
import { dijkstra } from './undirected-graph';

/** 堆优化 D 算法 */
export const dijkstraWithHeap = (start: Node): Map<Node, number> => {
  const nodeMinHeap = new NodeHeap();
  // 起点距离初始化为 0，放入小根堆中
  nodeMinHeap.insertOrUpdateOrIgnore(start, 0);
  // result[n] 记录了当前从起点到节点 n 的最短路径长度，起点距离初始化为 0
  const result: Map<Node, number> = new Map();

  while (!nodeMinHeap.isEmpty) {
    // 未求得最短路径的点里取一个距离最小的节点 minN
    const { node: minNode, distance } = nodeMinHeap.pop()!;
    // 考虑 minN 的每一条关联边
    minNode.edges.forEach((edge) => {
      nodeMinHeap.insertOrUpdateOrIgnore(edge.to, distance + edge.weight);
    });

    result.set(minNode, distance);
  }

  return result;
};

/** 每个节点及其距离的记录 */
interface NodeRecord {
  node: Node;
  distance: number;
}

/** 魔改小根堆 */
class NodeHeap {
  private static readonly NodeIndexOfPopped = -1;

  /** 堆元素集 */
  private records: NodeRecord[] = [];

  /** 堆元素到对应下标的映射，用于快速从堆中索引节点记录，如果一个节点被弹出去了，将其 index 置为 -1 */
  private nodeIndexMap = new Map<Node, number>();

  /** 堆大小 */
  private get size(): number {
    return this.records.length;
  }

  /** 堆是否为空 */
  public get isEmpty(): boolean {
    return this.size === 0;
  }

  /**
   * 1.对于不在堆中的节点，进行堆插入操作；
   * 2.对于在堆中未求得最短距离的节点，进行堆更新操作
   * 3.对于在堆中已求得最短距离的节点，忽略
   */
  public insertOrUpdateOrIgnore(node: Node, distance: number): void {
    // 如果一个节点从来没有进入过堆，创建该节点并插入到堆中，记录该节点在堆中的下标
    if (!this.hasEntered(node)) {
      this.records.push({ node, distance });
      this.nodeIndexMap.set(node, this.size - 1);
      this.shiftUp(this.size - 1);
      return;
    }
    // 如果一个节点已经在堆里了，首先获取其下标，更新节点距离，然后调整堆
    if (this.inHeap(node)) {
      const index = this.nodeIndexMap.get(node)!;
      this.records[index].distance = Math.min(this.records[index].distance, distance);
      this.shiftUp(index);
    }
  }

  /** 弹出未求得最短距离的节点中最小距离的记录 */
  public pop(): NodeRecord | undefined {
    if (this.size === 0) return undefined;

    const poppedRecord = this.records[0];
    this.swap(0, this.size - 1);
    this.records.pop();
    // 将节点标记为已弹出
    this.nodeIndexMap.set(poppedRecord.node, NodeHeap.NodeIndexOfPopped);
    this.shiftDown(0);

    return poppedRecord;
  }

  /** 堆向上调整 */
  private shiftUp(index: number): void {
    if (index < 0 || index >= this.size) return;

    let i = index;
    let p = (i - 1) >> 1;

    while (p >= 0 && this.records[i].distance < this.records[p].distance) {
      this.swap(i, p);
      i = p;
      p = (i - 1) >> 1;
    }
  }

  /** 堆向下调整 */
  private shiftDown(index: number): void {
    if (index < 0 || index >= this.size) return;

    let i = index;
    let leftI = (i << 1) + 1;

    // 完全二叉树的特性，若左孩子不存在，则右孩子不存在。该条件用于判断是否有儿子
    while (leftI < this.size) {
      // 记录被调整节点及其子节点中最大值的下标
      const rightI = leftI + 1;
      let minimumIndex =
        rightI < this.size && this.records[rightI].distance < this.records[leftI].distance ? rightI : leftI;
      minimumIndex = this.records[minimumIndex].distance < this.records[i].distance ? minimumIndex : i;

      // 若交换目标是本身，结束向下调整
      if (minimumIndex === i) break;

      // 被调整节点与最大孩子节点交换，继续向下调整
      this.swap(i, minimumIndex);
      i = minimumIndex;
      leftI = (i << 1) + 1;
    }
  }

  /** 该节点是否进入过堆（现在可能还在堆里，也可能被弹出去了） */
  public hasEntered(node: Node): boolean {
    return this.nodeIndexMap.has(node);
  }

  /** 该节点是否在堆里 */
  public inHeap(node: Node): boolean {
    return this.hasEntered(node) && this.nodeIndexMap.get(node) !== NodeHeap.NodeIndexOfPopped;
  }

  /** 【注意】所有交换堆元素的操作都要用该方法 */
  private swap(index1: number, index2: number): void {
    if (index1 === index2) return;
    // 除了交换元素位置，还需要更新节点下标映射
    this.nodeIndexMap.set(this.records[index1].node, index2);
    this.nodeIndexMap.set(this.records[index2].node, index1);
    [this.records[index1], this.records[index2]] = [this.records[index2], this.records[index1]];
  }
}

// test
const n1 = createNode(1);
const n2 = createNode(2);
const n3 = createNode(3);
const n4 = createNode(4);
const n5 = createNode(5);

connectTwoNodesUnDirected(n1, n2, 5);
connectTwoNodesUnDirected(n1, n3, 10);
connectTwoNodesUnDirected(n1, n4, 6);

connectTwoNodesUnDirected(n2, n3, 1);
connectTwoNodesUnDirected(n3, n4, 1);

connectTwoNodesUnDirected(n2, n5, 10);
connectTwoNodesUnDirected(n3, n5, 1);
connectTwoNodesUnDirected(n4, n5, 2);

dijkstra(n1).forEach((val, key) => console.log(key.value, val));
console.log('====');
dijkstraWithHeap(n1).forEach((val, key) => console.log(key.value, val));
