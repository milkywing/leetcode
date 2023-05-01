/*
 * @lc app=leetcode.cn id=239 lang=typescript
 * https://leetcode.cn/problems/sliding-window-maximum/description/
 * [239] 滑动窗口最大值
 */

// @lc code=start
// 如何求任意大小滑动窗口内的最大值
/**
 * 【引导1】使用左右两个指针 L、R 确定窗口，本题中 L = R - k
 * 【引导2】维护一个单调的双端队列，存储下标（对应值从左到右下降），队列中最左侧的下标对应着窗口内最大值：
 *  1.当 R 右移动时，如果 R 指向的值小于等于队列中最右侧的值，将 R 对应下标直接从右侧推入队列；
 *  否则，不断从队列右侧弹出值，直到找到比 R 指向的值大的值，将 R 对应下标从右侧推入队列。
 *  2.当 L 右移动时，如果 L 【移动前】对应的下标等于队列中最左侧的下标，将队列最左侧的下标从左侧弹出；否则不对队列做任何操作。
 */

/**
 * 方案A：大顶堆
 * 方案B（本解）：双端队列维持单调性（从左到右严格下降，且只能从右方进入）
 */
function maxSlidingWindow(nums: number[], k: number): number[] {
  const result: number[] = [];
  if (nums.length === 0) return result;
  if (k === 1) return nums;

  // 双端队列中存储的是下标，其对应值从左到右是下降的
  const queue: number[] = [];

  for (let i = 0; i < nums.length; i++) {
    // R 右移时，如果不满足从左到右的严格下降，需要从右侧不断弹出值，直到找到比 R 指向的值大的值
    while (queue.length > 0 && nums[i] >= nums[queue[queue.length - 1]]) {
      queue.pop();
    }
    // 将 R 对应下标从右侧推入队列
    queue.push(i);

    // L 右移时，如果 L 【移动前】对应的下标等于队列中最左侧的下标，将队列最左侧的下标从左侧弹出
    if (queue[0] === i - k) {
      queue.shift();
    }

    // 完整的窗口已经形成，可以计算窗口内的最大值
    if (i >= k - 1) {
      result.push(nums[queue[0]]);
    }
  }

  return result;
}
// @lc code=end
