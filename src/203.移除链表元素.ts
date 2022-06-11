/*
 * @lc app=leetcode.cn id=203 lang=typescript
 *
 * [203] 移除链表元素
 */

import { ListNode } from './model/node';

// @lc code=start
function removeElements(head: ListNode | null, val: number): ListNode | null {
  // 创建哑节点
  const dummyHead = new ListNode(0);
  dummyHead.next = head;

  // p1 从哑节点开始遍历
  let p1 = dummyHead;
  while (p1.next) {
    if (p1.next.val === val) {
      // 发现 p1 的下一个节点是要删除的节点，删除
      p1.next = p1.next.next;
    } else {
      // 否则 p1 移动到下一个节点
      p1 = p1.next;
    }
  }

  return dummyHead.next;
}
// @lc code=end
