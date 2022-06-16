/*
 * @lc app=leetcode.cn id=9 lang=typescript
 *
 * [9] 回文数
 */

// @lc code=start
function isPalindrome(x: number): boolean {
  // 负数或者个位数为0的非零数不是回文数
  if (x < 0 || (x % 10 === 0 && x > 0)) return false;

  let num = x;
  let reverseNum = 0;

  // 反转一半就行
  while (num > reverseNum) {
    reverseNum = reverseNum * 10 + (num % 10);
    num = Math.trunc(num / 10);
  }

  // 考虑长度为偶数和奇数的情况
  return num === reverseNum || num === Math.trunc(reverseNum / 10);
}
// @lc code=end
