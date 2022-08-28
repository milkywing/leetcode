/*
 * @lc app=leetcode.cn id=19 lang=typescript
 * https://leetcode.cn/problems/remove-nth-node-from-end-of-list/description/
 * [19] 删除链表的倒数第 N 个结点
 */
// LINKLIST

import { ListNode } from './model/node';

// @lc code=start
function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  if (!head?.next) return null;

  const dummyHead = new ListNode(0);
  dummyHead.next = head;

  // 通过快慢指针定位到被删节点的前一个节点（倒数第 n+1 个节点）
  let fast = dummyHead;
  let slow = dummyHead;

  // 快指针先走 n 步，然后快慢指针一起走，快指针走完后慢指针就是被删节点的前一个节点
  for (let i = 0; i < n && fast.next; i++) {
    fast = fast?.next;
  }

  while (fast?.next) {
    fast = fast.next;
    slow = slow.next!;
  }

  // 删除被删节点
  slow.next = slow.next!.next;
  return dummyHead.next;
}
// @lc code=end
