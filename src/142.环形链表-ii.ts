/*
 * @lc app=leetcode.cn id=142 lang=typescript
 *
 * [142] 环形链表 II
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
// 数学解释https://leetcode.cn/problems/linked-list-cycle-ii/solution/linked-list-cycle-ii-kuai-man-zhi-zhen-shuang-zhi-/
function detectCycle(head: ListNode | null): ListNode | null {
  let slow: ListNode | null = head;
  let fast: ListNode | null = head;
  // 快慢指针遍历链表，相交后停止
  while (true) {
    // 快指针走完了，说明没环
    if (!fast?.next) return null;
    slow = slow!.next;
    fast = fast.next!.next;
    if (slow === fast) {
      break;
    }
  }
  // 慢指针维持在相遇点，将快指针重置回头部，一起单步遍历，交点就是入环点
  fast = head;

  while (fast !== slow) {
    slow = slow!.next;
    fast = fast!.next;
  }

  return fast;
}
// @lc code=end
