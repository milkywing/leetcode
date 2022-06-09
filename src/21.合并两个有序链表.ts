/*
 * @lc app=leetcode.cn id=21 lang=typescript
 *
 * [21] 合并两个有序链表
 */

class ListNode {
  public val: number;

  public next: ListNode | null;

  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// @lc code=start
/** 迭代法 */
function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  // 创建一个新的头节点
  const preHead = new ListNode(Number.NEGATIVE_INFINITY);
  // curr 从头节点出发，负责在两个列表中穿行，跟随小的值，走过的路径形成目标链表
  let curr = preHead;
  // 双指针便利两个链表
  let [p1, p2] = [list1, list2];

  while (p1 && p2) {
    if (p1.val < p2.val) {
      curr.next = p1;
      p1 = p1.next;
    } else {
      curr.next = p2;
      p2 = p2.next;
    }
    curr = curr.next;
  }

  // 把还未遍历完的链表的剩余部分接到 curr.next 上
  curr.next = p1 || p2;

  return preHead.next;
}
// @lc code=end

/** 递归法，很好理解 */
function mergeTwoLists2(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  if (!list1 || !list2) {
    return list1 || list2;
  }
  if (list1.val < list2.val) {
    list1.next = mergeTwoLists2(list1.next, list2);
    return list1;
  }
  list2.next = mergeTwoLists2(list1, list2.next);
  return list2;
}
