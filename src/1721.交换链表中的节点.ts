/*
 * @lc app=leetcode.cn id=1721 lang=typescript
 *
 * [1721] 交换链表中的节点
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
function swapNodes(head: ListNode | null, k: number): ListNode | null {
  let fast = head;
  let slow = head;
  // 先让快指针走到第k个节点，并记录这个需要交换的节点
  for (let i = 0; i < k - 1; i++) {
    fast = fast!.next;
  }
  const swapNode1 = fast!;
  // 快慢指针一起走，直到快指针到达尾部，此时慢指针就是倒数第k个节点，记录这个需要交换的节点
  while (fast?.next) {
    fast = fast.next;
    slow = slow!.next;
  }

  const swapNode2 = slow!;

  [swapNode1.val, swapNode2.val] = [swapNode2.val, swapNode1.val];
  return head;
}
// @lc code=end
