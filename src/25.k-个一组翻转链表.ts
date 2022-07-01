/*
 * @lc app=leetcode.cn id=25 lang=typescript
 *
 * [25] K 个一组翻转链表
 */

import { ListNode } from './model/node';

// @lc code=start
function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
  const dummyHead = new ListNode(0);
  dummyHead.next = head;

  // 当前翻转组的第一个节点的前一个节点（或者说前一个组的最后一个节点）
  let preGroupEnd: ListNode | null = dummyHead;

  while (preGroupEnd?.next) {
    // 当前翻转组的第一个节点
    const curGroupStart = preGroupEnd.next;
    // 当前翻转组的最后一个节点
    let curGroupEnd: ListNode | null = preGroupEnd;
    // 找到当前翻转组的最后一个节点，如果当前组长度小于 k，说明是当前组是最后的小尾巴，不做处理，终止循环
    for (let i = 0; i < k && curGroupEnd; i++) {
      curGroupEnd = curGroupEnd.next;
    }
    if (!curGroupEnd) break;

    // 记录下一个翻转组的第一个节点，然后断开当前组和下一个组的连接
    const nextGroupStart = curGroupEnd.next;
    curGroupEnd.next = null;

    // 对当前组进行翻转，此时 curGroupEnd 会成为组头，curGroupStart 会成为组尾
    reverseList(curGroupStart);
    // 将翻转后的组根前后部分接上
    preGroupEnd.next = curGroupEnd;
    curGroupStart.next = nextGroupStart;

    // 更新 preGroupEnd 指向当前组尾，对下个组进行反转
    preGroupEnd = curGroupStart;
  }

  return dummyHead.next;
}

const reverseList = (head: ListNode | null): ListNode | null => {
  let prev: ListNode | null = null;
  let curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  return prev;
};
// @lc code=end
