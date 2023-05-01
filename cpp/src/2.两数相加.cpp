#include <leet/list_node.h>
/*
 * @lc app=leetcode.cn id=2 lang=cpp
 *
 * [2] 两数相加
 */

// @lc code=start
class Solution {
 public:
  ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
    ListNode res, *p = &res;
    int carry = 0;
    while (l1 || l2) {
      // 计算当前位与进位，若其中一条链已经走完了，则认为其当前位为 0
      int sum = (l1 ? l1->val : 0) + (l2 ? l2->val : 0) + carry;
      carry = sum / 10;
      p->next = new ListNode(sum % 10);

      p = p->next;

      // 前往下一位，如果其中一条链已经到尾部了，则维持在尾部
      if (l1) l1 = l1->next;
      if (l2) l2 = l2->next;
    }
    // 考虑最后的进位
    if (carry) {
      p->next = new ListNode(carry);
    }
    return res.next;
  }
};
// @lc code=end
