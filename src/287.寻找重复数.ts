/*
 * @lc app=leetcode.cn id=287 lang=typescript
 * https://leetcode.cn/problems/find-the-duplicate-number/
 * [287] 寻找重复数
 */
// LINKLIST

// @lc code=start
/** 使用 下标->值（下一个下标） 的映射来形成链表，然后可以套用【142.环形链表-ii】求解交点 */
function findDuplicate(nums: number[]): number {
  let [slow, fast] = [0, 0];
  slow = nums[slow];
  fast = nums[nums[fast]];

  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[nums[fast]];
  }

  fast = 0;
  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[fast];
  }

  return fast;
}
// @lc code=end
