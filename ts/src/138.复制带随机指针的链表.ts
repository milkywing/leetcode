/*
 * @lc app=leetcode.cn id=138 lang=typescript
 * https://leetcode.cn/problems/copy-list-with-random-pointer/
 * [138] 复制带随机指针的链表
 */
// LINKLIST

// @lc code=start
class RandNode {
  public val: number;

  public next: RandNode | null;

  public random: RandNode | null;

  constructor(val?: number, next?: RandNode, random?: RandNode) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
    this.random = random === undefined ? null : random;
  }
}

/**
 * 解题关键：让拷贝节点 A' 和被拷贝节点 A 建立联系，通过 A 得知 A'，以便于拷贝 A 的随机指针。
 * 解法1：通过 Map 让 A' 和 A 建立联系
 * 解法2：让 A' 紧接 A，通过位置上的关系建立联系
 */
function copyRandomList(head: RandNode | null): RandNode | null {
  if (!head) return null;

  // 遍历一遍链表，将拷贝节点放到被拷贝节点之后
  // 此时链表结构为 A->A'->B->B'->C->C'->...
  let p1: RandNode | null = head;
  while (p1) {
    const nextOrigin = p1.next;
    const copyNode = new RandNode(p1.val);
    p1.next = copyNode;
    copyNode.next = nextOrigin;
    p1 = nextOrigin;
  }

  // 通过双指针遍历，一次取出一对拷贝节点（p1指被拷贝节点，p1Clone指拷贝节点），进行随机指针的拷贝
  p1 = head;
  while (p1) {
    const p1Clone: RandNode = p1.next!;
    if (p1.random) {
      // 【注意】此时 p1.random 是原随机节点，他的下一个节点 p1.random 就是拷贝的随机节点
      p1Clone.random = p1.random.next;
    }

    // 迁移到下一对节点
    p1 = p1Clone.next;
  }

  // 记录拷贝链表的头节点
  const copyHead = head.next;
  // 将原链表和拷贝链表分离，这里 p1 遍历原链表，p1Clone 遍历拷贝链表，nextOrigin 指向下一个被拷贝节点
  p1 = head;
  while (p1?.next?.next) {
    const p1Clone: RandNode = p1.next!;
    const nextOrigin = p1Clone.next!;

    p1.next = nextOrigin;
    p1Clone.next = nextOrigin.next;

    p1 = nextOrigin;
  }
  // 补上原链表的尾部 null
  p1.next = null;

  return copyHead;
}
// @lc code=end
