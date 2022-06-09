/*
 * @lc app=leetcode.cn id=141 lang=typescript
 *
 * [141] 环形链表
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
