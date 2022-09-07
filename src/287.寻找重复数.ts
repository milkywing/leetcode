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

// 数组前插入一个 0，然后原地交换法
const findDuplicateB = (nums: number[]): number => {
  nums.unshift(0);

  let i = 0;
  while (i < nums.length) {
    // 如果当前值等于索引，那么直接跳过
    if (nums[i] === i) {
      i++;
      continue;
    }
    // 如果需要交换的索引位置已经存在相同值，直接结束，返回当前值
    if (nums[nums[i]] === nums[i]) {
      return nums[i];
    }
    // 交换当前值，和对应索引存在的值
    [nums[nums[i]], nums[i]] = [nums[i], nums[nums[i]]];
  }

  return -1;
};
// @lc code=end
