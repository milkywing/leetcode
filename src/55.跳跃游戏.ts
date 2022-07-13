/*
 * @lc app=leetcode.cn id=55 lang=typescript
 *
 * [55] 跳跃游戏
 */

// @lc code=start
function canJump(nums: number[]): boolean {
  const length = nums.length;
  // 记录当前从起点能跳到的最远距离
  let rightMost = 0;

  // 考虑每个位置
  for (let i = 0; i < length; i++) {
    if (i <= rightMost) {
      // 如果当前位置可达，从该位置跳最远距离（贪心），更新最远距离
      rightMost = Math.max(rightMost, i + nums[i]);
      // 如果当前最远距离已经超过终点了，说明终点可达
      if (rightMost >= length - 1) return true;
    }
  }

  // 不可达
  return false;
}
// @lc code=end
