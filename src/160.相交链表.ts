/*
 * @lc app=leetcode.cn id=160 lang=typescript
 * https://leetcode.cn/problems/intersection-of-two-linked-lists/description/
 * [160] 相交链表
 */

import { ListNode } from './model/node';

// @lc code=start
/**
 * 求无环相交链表的交点：
 * 遍历两条链表记录长度，如果两条链表的尾节点不相同，则两条链表不相交；长链表先走长度差值步，然后两条链表同时走，相遇点就是交点
 *
 * 【扩展】如果相交链表可能有环，首先通过【160】求得两个链表的入环节点，跟据入环节点的情况组合分别讨论：
 * 1.两个链表都没有入环，则转化为求无环相交链表的交点；
 * 2.两个链表中只有一个有入环，两个链表肯定不相交
 * 3.两个链表都入环，分三种情况
 *    3.1 入环点相同，则截取入环点以上的部分，对上部分求无环相交链表的交点
 *    3.2 让其中一个链表从其入环点再走一圈，如果一圈之内不能遇到另一个入环点，说明是独立链表不相交（入环点不同，且分别在独立环上）
 *    3.3 其他情况（入环点不同，且在同一个环），返回任意一个入环节点即可
 */
function getIntersectionNode(headA: ListNode | null, headB: ListNode | null): ListNode | null {
  let p1 = headA;
  let p2 = headB;
  let lenDiff = 0;
  while (p1?.next) {
    lenDiff++;
    p1 = p1.next;
  }
  while (p2?.next) {
    lenDiff--;
    p2 = p2.next;
  }
  // 如果两条链表的尾节点不相同，则两条链表不相交
  if (p1 !== p2) return null;

  // 下面处理相交情况
  // p1 指向长链表头，p2 指向另一个链表头（短链表头）
  p1 = lenDiff > 0 ? headA : headB;
  p2 = p1 === headA ? headB : headA;

  lenDiff = Math.abs(lenDiff);

  // 长链表先走长度差值步，然后两条链表同时走，相遇点就是交点
  while (lenDiff--) {
    p1 = p1!.next;
  }
  while (p1 !== p2) {
    p1 = p1!.next;
    p2 = p2!.next;
  }

  return p1;
}
// @lc code=end
