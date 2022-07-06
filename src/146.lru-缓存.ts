/*
 * @lc app=leetcode.cn id=146 lang=typescript
 *
 * [146] LRU 缓存
 */

// @lc code=start
interface LinkListNode {
  key: number;
  value: number;

  prev?: LinkListNode;
  next?: LinkListNode;
}

/**
 * 使用双向链表表示最近和最久的概念：头节点表示当前最近，尾节点表示当前最久，
 * 配合 map 来记录 key 到节点的映射，
 * 1.LRU-get：直接从 map 中获取到对应节点 targetNode，然后将节点移到头
 * 2.LRU-put：检查 map 中是否有对应节点：
 *   2.1 现有节点：更新节点值，然后将节点移动到头
 *   2.2 新节点：如果容量已经满了，先移除一个尾，然后创建节点插到头；如果容量未满，直接插到头
 */
class LRUCache {
  /** cache 大小 */
  private capacity: number;

  /** 双端链表 */
  public dummyHead: LinkListNode;

  public dummyTail: LinkListNode;

  public linkListLength = 0;

  /** 记录 key 到节点的映射 */
  private keyNodeMap = new Map<number, LinkListNode>();

  constructor(capacity: number) {
    // 创建 dummyHead 和 dummyTail
    this.dummyHead = { key: -1, value: -1 };
    this.dummyTail = { key: -1, value: -1 };
    this.dummyHead.next = this.dummyTail;
    this.dummyTail.prev = this.dummyHead;

    this.capacity = capacity;
  }

  public get(key: number): number {
    const node = this.keyNodeMap.get(key);
    // 如果能取到，将节点移动到头
    if (node) {
      this.moveNodeToFirst(node);
      return node.value;
    }

    return -1;
  }

  public put(key: number, value: number): void {
    const node = this.keyNodeMap.get(key);
    // 更新现有节点，并将节点移动到头
    if (node) {
      node.value = value;
      this.moveNodeToFirst(node);
      return;
    }

    // 插入新节点
    const newNode: LinkListNode = { key, value };
    this.keyNodeMap.set(key, newNode);
    // 容量已经满了，先移除一个尾，然后创建节点插到头
    if (this.capacity === this.linkListLength) {
      this.keyNodeMap.delete(this.dummyTail.prev!.key);
      this.removeLastNode();
      this.addNodeToFirst(newNode);
      return;
    }
    // 容量未满，直接插到头
    this.addNodeToFirst(newNode);
  }

  /** 添加节点到头 */
  private addNodeToFirst(node: LinkListNode): void {
    node.next = this.dummyHead.next;
    node.prev = this.dummyHead;

    this.dummyHead.next!.prev = node;
    this.dummyHead.next = node;

    this.linkListLength++;
  }

  /** 移除指定节点 */
  private removeNode(node: LinkListNode): boolean {
    if (node.prev && node.next) {
      node.next.prev = node.prev;
      node.prev.next = node.next;
      this.linkListLength--;

      return true;
    }

    return false;
  }

  /** 移除尾节点 */
  private removeLastNode(): void {
    // 空节点不操作
    if (!this.linkListLength) return;
    this.removeNode(this.dummyTail.prev!);
  }

  /** 将现有节点移动到头 */
  private moveNodeToFirst(node: LinkListNode): void {
    if (this.removeNode(node)) this.addNodeToFirst(node);
  }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
// @lc code=end
