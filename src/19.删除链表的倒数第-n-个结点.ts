/*
 * @lc app=leetcode.cn id=19 lang=typescript
 *
 * [19] 删除链表的倒数第 N 个结点
 */

import { ListNode } from './model/node';

// @lc code=start
function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  if (!head?.next) return null;

  // 通过快慢指针定位到被删节点的前一个节点（倒数第 n+1 个节点）
  let fast = head;
  let slow = head;
  // 如果不计长度处理特殊情况的话，可以在头节点前插一个哑节点
  let len = 1;

  // 快指针先走 n 步，然后快慢指针一起走，快指针走完后慢指针就是被删节点的前一个节点
  for (let i = 0; i < n && fast.next; i++, len++) {
    fast = fast?.next;
  }

  while (fast?.next) {
    fast = fast.next;
    slow = slow.next!;
    len++;
  }

  // 删除的是第一个节点
  if (len === n) return head.next;

  // 删除的是非第一个节点
  // 删除被删节点
  slow.next = slow.next!.next;
  return head;
}
// @lc code=end
