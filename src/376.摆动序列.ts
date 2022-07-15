/*
 * @lc app=leetcode.cn id=376 lang=typescript
 *
 * [376] 摆动序列
 */

// @lc code=start
/** 就是要去原序列中的波峰和波谷，统计波峰和波谷的数量即可 */
function wiggleMaxLength(nums: number[]): number {
  const length = nums.length;
  if (length < 2) return length;

  // 表示当前趋势
  let preDiff = nums[1] - nums[0];
  // 开始两个数如果有上升/下降趋势，序列长度至少包含这两个数
  let result = preDiff === 0 ? 1 : 2;

  for (let i = 1; i < length - 1; i++) {
    const curDiff = nums[i + 1] - nums[i];
    if ((curDiff > 0 && preDiff <= 0) || (curDiff < 0 && preDiff >= 0)) {
      // 两边趋势不同，说明找到波峰或波谷，反转趋势
      preDiff = curDiff;
      result++;
    }
    // 趋势相同，说明还在上升/下降阶段，不同改变趋势，继续前进寻找波峰或波谷
  }

  return result;
}
// @lc code=end
