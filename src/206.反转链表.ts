/*
 * @lc app=leetcode.cn id=206 lang=typescript
 *
 * [206] 反转链表
 */

import { ListNode } from './model/node';

// @lc code=start
function reverseList(head: ListNode | null): ListNode | null {
  // 三指针逐步向后移动
  // prev指向当前节点的左方节点，curr指向当前节点，需要把 prev->curr 换成 curr->prev
  // next指向当前节点的右方节点，避免 curr 换向时丢失右方节点
  let prev: ListNode | null = null;
  let curr: ListNode | null = head;
  while (curr) {
    const next = curr.next;
    // 对当前节点换向，然后三指针整体前移
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}
// @lc code=end
