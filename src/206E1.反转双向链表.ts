interface DoubleListNode {
  val: number;
  next: DoubleListNode | null;
  prev: DoubleListNode | null;
}

/** 反转双向链表，可参考【206】反转单向链表 */
export const reverseDoubleList = (head: DoubleListNode | null): DoubleListNode | null => {
  let prev: DoubleListNode | null = null;
  let curr: DoubleListNode | null = head;
  while (curr) {
    const { next } = curr;
    curr.next = prev;
    curr.prev = next;
    prev = curr;
    curr = next;
  }

  return prev;
};
