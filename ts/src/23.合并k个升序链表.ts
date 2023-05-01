/*
 * @lc app=leetcode.cn id=23 lang=typescript
 * https://leetcode.cn/problems/merge-k-sorted-lists/description/
 * [23] 合并K个升序链表
 */
// LINKLIST

import { ListNode } from './model/node';

// @lc code=start
/** 参考归并排序，只是merge操作不一样，合并两个有序链表+分治即可 */
function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  const length = lists.length;
  if (length === 0) return null;
  if (length === 1) return lists[0];

  const mid = length >> 1;
  const leftArea = lists.slice(0, mid);
  const rightArea = lists.slice(mid);

  return mergeTwoLists(mergeKLists(leftArea), mergeKLists(rightArea));
}

/** 有序链表合并操作，参考【21.合并两个有序链表】 */
const mergeTwoLists = (list1: ListNode | null, list2: ListNode | null): ListNode | null => {
  const dummyHead = new ListNode(0);
  let curr = dummyHead;
  // 双指针便利两个链表
  let [p1, p2] = [list1, list2];

  while (p1 && p2) {
    if (p1.val < p2.val) {
      curr.next = p1;
      p1 = p1.next;
    } else {
      curr.next = p2;
      p2 = p2.next;
    }
    curr = curr.next;
  }

  curr.next = p1 || p2;

  return dummyHead.next;
};
// @lc code=end
