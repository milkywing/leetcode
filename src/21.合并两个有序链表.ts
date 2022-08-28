/*
 * @lc app=leetcode.cn id=21 lang=typescript
 * https://leetcode.cn/problems/merge-two-sorted-lists/description/
 * [21] 合并两个有序链表
 */
// LINKLIST

import { ListNode } from './model/node';

// @lc code=start

/**
 * 方案A（本解）：迭代
 * 方案B：递归
 */
function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  // 创建一个新的头节点
  const preHead = new ListNode(Number.NEGATIVE_INFINITY);
  // curr 从头节点出发，负责在两个列表中穿行，跟随小的值，走过的路径形成目标链表
  let curr = preHead;
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

  // 把还未遍历完的链表的剩余部分接到 curr.next 上
  curr.next = p1 || p2;

  return preHead.next;
}

function mergeTwoListsB(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  if (!list1 || !list2) {
    return list1 || list2;
  }
  // 当前两个链表中取一个头小的头，然后对两条链的剩下区域进行递归
  if (list1.val < list2.val) {
    list1.next = mergeTwoListsB(list1.next, list2);
    return list1;
  }
  list2.next = mergeTwoListsB(list1, list2.next);
  return list2;
}

// @lc code=end
