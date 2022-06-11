/*
 * @lc app=leetcode.cn id=141 lang=typescript
 *
 * [141] 环形链表
 */

import { ListNode } from './model/node';

// @lc code=start
/** 使用快慢指针，快指针走到尽头则没环；两指针相遇则有环 */
function hasCycle(head: ListNode | null): boolean {
  let slow = head;
  let fast = head;
  while (fast?.next) {
    slow = slow!.next;
    fast = fast.next!.next;
    if (slow === fast) {
      return true;
    }
  }

  return false;
}
// @lc code=end
