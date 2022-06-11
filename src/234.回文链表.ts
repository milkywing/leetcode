/*
 * @lc app=leetcode.cn id=234 lang=typescript
 *
 * [234] 回文链表
 */

import { ListNode } from './model/node';

// @lc code=start
function isPalindrome(head: ListNode | null): boolean {
  if (!head || !head.next) return true;

  // 快慢指针找到中点（奇数情况会恰好中点，偶数情况会偏前一）
  let fast = head;
  let slow = head;
  while (fast?.next?.next) {
    fast = fast.next.next;
    slow = slow.next!;
  }

  // 记住中点的下一个节点并让中点指向空
  let p1: ListNode | null = null;
  let p2 = slow.next;
  let p3: ListNode | null = null;
  // 此时链表结构为 L->...->Mid(slow)  R1(p1)...->RN
  //                        ↓
  //                      null
  slow.next = null;

  // 使用三指针 p1、p2、p3 将中点后半部分反转
  while (p2) {
    p3 = p2.next;
    p2.next = p1;
    p1 = p2;
    p2 = p3;
  }
  // 此时链表结构为 L->...->Mid(slow)  R1<-...<-RN(p1)
  //                        ↓
  //                      null

  // 默认为回文
  let result = true;
  // 双指针p2、p3从两边向中间遍历，如果不相等，则不是回文
  p2 = head;
  p3 = p1;
  while (p2 && p3) {
    if (p2.val !== p3.val) {
      result = false;
      break;
    }
    p2 = p2.next;
    p3 = p3.next;
  }

  // 恢复链表结构，让后半部分反转回来
  let p0: ListNode | null = null;
  while (p1) {
    p2 = p1.next;
    p1.next = p0;
    p0 = p1;
    p1 = p2;
  }

  return result;
}
// @lc code=end
