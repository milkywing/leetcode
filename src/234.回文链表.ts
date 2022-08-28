/*
 * @lc app=leetcode.cn id=234 lang=typescript
 * https://leetcode.cn/problems/palindrome-linked-list/description/
 * [234] 回文链表
 */
// LINKLIST

import { ListNode } from './model/node';

// @lc code=start
function isPalindrome(head: ListNode | null): boolean {
  if (!head || !head.next) return true;

  // 快慢指针找到中点（奇数情况会恰好中点，偶数情况会偏前一）
  let fast = head;
  let slow = head;
  while (fast.next?.next) {
    fast = fast.next.next;
    slow = slow.next!;
  }

  // 以中点为分界线切割链表，分为左右两半部分
  const midNode = slow;
  const rightHead = midNode.next!;
  midNode.next = null;

  // 将右半部分反转，然后 p1, p2 同时遍历两条链表，如果中途发现值不相等，说明不是回文
  let p1: ListNode | null = head;
  let p2: ListNode | null = revertList(rightHead);
  // 默认为回文
  let result = true;
  while (p1 && p2) {
    if (p1.val !== p2.val) {
      result = false;
      break;
    }
    p1 = p1.next;
    p2 = p2.next;
  }

  // 将右半部分反转恢复
  midNode.next = revertList(rightHead);

  return result;
}

const revertList = (head: ListNode | null): ListNode | null => {
  let curNode: ListNode | null = head;
  let preNode: ListNode | null = null;

  while (curNode) {
    const nextNode = curNode.next;
    curNode.next = preNode;
    preNode = curNode;
    curNode = nextNode;
  }

  return preNode;
};
// @lc code=end
