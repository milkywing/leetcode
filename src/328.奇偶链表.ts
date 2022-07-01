/*
 * @lc app=leetcode.cn id=328 lang=typescript
 *
 * [328] 奇偶链表
 */

import { ListNode } from './model/node';

// @lc code=start
function oddEvenList(head: ListNode | null): ListNode | null {
  if (!head?.next?.next) return head;

  const dummyHead = new ListNode(0);
  dummyHead.next = head;

  // 当前奇数区的最后一个节点，开始时为第一个节点
  let oddEnd = head;

  // 偶数区的第一个节点，一定为第二个节点
  const eventStart = head.next;
  // 当前偶数区的最后一个节点，开始时为第二个节点
  let evenEnd = head.next;

  while (evenEnd.next) {
    // 扩充奇数区，将下一个奇数节点拼在当前奇数区的尾部，然后更新 oddEnd
    const nextOdd = evenEnd.next;
    oddEnd.next = nextOdd;
    oddEnd = nextOdd;

    // 扩充偶数区，将下一个偶数节点拼在当前偶数区的尾部，如果该偶数节点非空，更新 evenEnd
    const nextEven = evenEnd.next.next;
    evenEnd.next = nextEven;
    if (nextEven) {
      evenEnd = nextEven;
    }

    // 将奇数区和偶数区拼在一起
    oddEnd.next = eventStart;
  }

  return dummyHead.next;
}
// @lc code=end
