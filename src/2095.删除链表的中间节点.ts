/*
 * @lc app=leetcode.cn id=2095 lang=typescript
 *
 * [2095] 删除链表的中间节点
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

/** 题中描述的中点在偶数情况下是偏右的，使用快慢指针找中点 */
function deleteMiddle(head: ListNode | null): ListNode | null {
  if (!head?.next) return null;

  let fast = head;
  let slow = head;
  // prev 记录中间节点的前一个节点
  let prev: ListNode | null = null;
  while (fast?.next?.next) {
    fast = fast.next.next;
    prev = slow;
    slow = slow.next!;
  }

  // 如果是偶数情况，取偏右值作为中点
  if (fast?.next) {
    prev = slow;
    slow = slow.next!;
  }

  prev!.next = slow!.next;

  return head;
}
// @lc code=end
