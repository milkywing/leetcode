/*
 * @lc app=leetcode.cn id=148 lang=typescript
 * https://leetcode.cn/problems/sort-list/description/
 * [148] 排序链表
 */

import { ListNode } from './model/node';

// @lc code=start
/** 方案A（本解）：使用迭代 */
function sortList(head: ListNode | null): ListNode | null {
  if (!head?.next) return head;
  // 创建哑节点
  const dummyHead = new ListNode(0);
  dummyHead.next = head;

  // 首先计算链表的长度
  let length = 0;
  let curr: ListNode | null = head;
  while (curr) {
    length++;
    curr = curr.next;
  }

  // 【核心思想】
  // 1.从头到尾对 restArea 进行扫描（第一次可以认为 restArea 为原始链表），切两刀切出三个区域，leftArea（长度step）、rightArea（长度step）、restArea
  // 2.对 leftArea 和 rightArea 进行排序合并生成 sortArea，此时链表变成 sortArea、restArea
  // 3.对 restArea 重复上述操作直到 restArea 消失
  // 4.将 step 乘以 2，重复上述操作，step 超过链表长度时，结束
  for (let step = 1; step < length; step *= 2) {
    // curr 记录未排序区域的头节点
    curr = dummyHead.next;
    // tail 记录已排序的区域的尾节点
    let tail = dummyHead;

    // 从头到尾遍历链表，
    while (curr) {
      // 从未排序区域按 step 为长度切分出 leftArea 和 rightArea
      const left = curr;
      const right = cutList(left, step);
      // curr 指向接下来未排序区域的头节点
      curr = cutList(right, step);

      // 将已排序区域链接到新生成的 sortArea 上
      tail.next = mergeTwoLists(left, right);
      // tail 前进到新的已排序区域的尾节点
      while (tail.next) {
        tail = tail.next;
      }
    }
  }

  return dummyHead.next;
}

/** 断链操作，将链表切掉前 k 个节点，并返回后半部分的链表头 */
const cutList = (head: ListNode | null, k: number): ListNode | null => {
  let curr = head;
  let count = k;
  while (count > 0 && curr) {
    curr = curr.next;
    count--;
  }
  if (!curr) return null;

  const currNext = curr.next;
  curr.next = null;
  return currNext;
};

/** 方案B：类似于数组，可以类比使用归并排序，将链表分成两半，对两半进行排序后的结果进行连接 */
function sortListB(head: ListNode | null): ListNode | null {
  if (!head?.next) return head;

  // 使用快慢指针找到中点，将链表分成两半
  let slow = head;
  let fast = head;
  while (fast.next?.next) {
    slow = slow.next!;
    fast = fast.next.next;
  }
  const mid = slow;
  const midNext = mid.next;
  mid.next = null;

  // 对两半进行排序
  return mergeTwoLists(sortListB(head), sortListB(midNext));
}

/** 将两个有序链表合并为一个有序链表 */
const mergeTwoLists = (list1: ListNode | null, list2: ListNode | null): ListNode | null => {
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
};
// @lc code=end
