/*
 * @lc app=leetcode.cn id=2 lang=typescript
 * https://leetcode.cn/problems/add-two-numbers/description/
 * [2] 两数相加
 */

import { ListNode } from './model/node';

// @lc code=start
function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  const dummyHead = new ListNode(0);
  let [p1, p2, curr] = [l1, l2, dummyHead];
  // 进位
  let carry = 0;

  while (p1 || p2) {
    // 对于已经遍历到尾部的指针，认为其值为 0
    const sum = (p1 ? p1.val : 0) + (p2 ? p2.val : 0) + carry;
    // 当前位和超过 10，产生进位
    carry = Math.trunc(sum / 10);
    // 生成当前位
    curr.next = new ListNode(sum % 10);
    curr = curr.next;

    // 已经遍历到尾部的指针维持 null 值
    p1 = p1 ? p1.next : null;
    p2 = p2 ? p2.next : null;
  }

  return dummyHead.next;
}
// @lc code=end
