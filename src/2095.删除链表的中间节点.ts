/*
 * @lc app=leetcode.cn id=2095 lang=typescript
 *
 * [2095] 删除链表的中间节点
 */

import { ListNode } from './model/node';

// @lc code=start
/** 题中描述的中点在偶数情况下是偏右的，使用快慢指针找中点的前一个节点 */
function deleteMiddle(head: ListNode | null): ListNode | null {
  if (!head?.next) return null;

  // 创建哑节点
  const dummyHead = new ListNode(0);
  dummyHead.next = head;

  let fast = dummyHead;
  let slow = dummyHead;
  // 快慢指针从哑节点出发，快指针结束后 slow 指向中点的前一个节点
  while (fast?.next?.next) {
    fast = fast.next.next;
    slow = slow.next!;
  }

  slow.next = slow.next!.next;

  return head;
}
// @lc code=end
