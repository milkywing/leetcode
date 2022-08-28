/*
 * @lc app=leetcode.cn id=24 lang=typescript
 * https://leetcode.cn/problems/swap-nodes-in-pairs/description/
 * [24] 两两交换链表中的节点
 */
// LINKLIST

import { ListNode } from './model/node';

// @lc code=start
function swapPairs(head: ListNode | null): ListNode | null {
  // 节点长度小于 2，直接返回
  if (!head?.next) return head;
  // 创建哑节点
  const dummyHead = new ListNode(0);
  dummyHead.next = head;

  // p1 从哑节点开始遍历（步长2），交换 p1 后面的两个节点
  let p1 = dummyHead;

  while (p1.next?.next) {
    // ahead、behind 是交换前的前后两个节点
    const ahead = p1.next!;
    const behind = ahead.next!;

    // 交换
    p1.next = behind;
    ahead.next = behind.next;
    behind.next = ahead;

    // 交换完成后 ahead 是后节点，p1 需移动到 ahead
    p1 = ahead;
  }

  return dummyHead.next;
}
// @lc code=end
