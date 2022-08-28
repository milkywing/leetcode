/*
 * @lc app=leetcode.cn id=86 lang=typescript
 * https://leetcode.cn/problems/partition-list/solution/
 * [86] 分隔链表
 */
// LINKLIST

import { ListNode } from './model/node';

// @lc code=start
function partition(head: ListNode | null, x: number): ListNode | null {
  // 创建两个链表，smallHead 存放小于 x 的节点，bigHead 存放大于等于 x 的节点
  const smallHead = new ListNode(0);
  const largeHead = new ListNode(0);
  let [p, pSmall, pLarge] = [head, smallHead, largeHead];

  while (p) {
    if (p.val < x) {
      pSmall.next = new ListNode(p.val);
      pSmall = pSmall.next;
    } else {
      pLarge.next = new ListNode(p.val);
      pLarge = pLarge.next;
    }
    p = p.next;
  }

  // 如果 largeHead 是非空链表，把 smallHead 和 largeHead 链接起来
  if (largeHead.next) {
    pSmall.next = largeHead.next;
  }

  return smallHead.next;
}
// @lc code=end
