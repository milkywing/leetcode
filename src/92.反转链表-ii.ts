/*
 * @lc app=leetcode.cn id=92 lang=typescript
 *
 * [92] 反转链表 II
 */

import { ListNode } from './model/node';

// @lc code=start
/**
 * 方案A：找到 left 的上一个节点 prevLeft，和 right 的下一个节点 afterRight，
 * 对 [left..right] 区域的链表进行反转，然后接回 prevLeft 和 afterRight 后返回
 *
 * 方案B：找到 left 的上一个节点 prevLeft，开始遍历 [left..right] 区域，
 */
function reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {
  if (left === right) {
    return head;
  }

  const dummyHead = new ListNode(0);
  dummyHead.next = head;
  let prevLeft = dummyHead;
  // 找到 left 的前一个节点
  for (let i = 0; i < left - 1; i++) {
    prevLeft = prevLeft.next!;
  }

  // prevLeft->1->2->3->4->，假设要反转的区域是 1-4 区域的 4 个数
  // 使用一个变量 cur 锁定 left 节点（上面的例子中为 1），使用另外一个变量 next 锁定 cur 的下一个节点，
  // 把 next 节点抽离，放到 prevLeft 节点后面。然后把 next 节点重新设置为 cur 的下一个节点，重复前面的操作，例子如下：
  // prevLeft->2->1->3->4->、prevLeft->3->2->1->4->、、prevLeft->4->3->2->1->

  // 变量 cur 锁定 left 节点
  const cur = prevLeft.next!;
  for (let i = 0; i < right - left; i++) {
    // 变量 next 锁定 cur 的下一个节点
    const next = cur.next!;
    // 抽离 next 节点放到 prevLeft 节点后面：
    // 1. cur 节点跳过 next节点 指向 next 节点的下一个节点
    // 2. next 节点放到 prevLef 节点后面
    cur.next = next.next;
    next.next = prevLeft.next;
    prevLeft.next = next;
  }

  return dummyHead.next;
}
// @lc code=end
