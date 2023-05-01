/*
 * @lc app=leetcode.cn id=84 lang=typescript
 * https://leetcode.cn/problems/largest-rectangle-in-histogram/description/
 * [84] 柱状图中最大的矩形
 */

// @lc code=start
/** 单调栈，为每个位置找到两边第一个比自己小的位置 */
function largestRectangleArea(heights: number[]): number {
  // 维持栈底到栈顶单调递增的单调栈
  const stack: number[] = [];
  // 额外添加一个无限小的尾部元素，这样能强制栈内所有元素清算
  heights.push(-Infinity);
  let result = 0;

  heights.forEach((height, index) => {
    // 下标 i 如果放入栈中会破坏单调性，需要先不断出栈，直到栈顶的值比 i 对应的值小或相等
    while (stack.length && height < heights[stack[stack.length - 1]]) {
      // 出栈操作执行清算，计算以该位置为中心向两边扩展的矩形大小
      const popIndex = stack.pop()!;
      // 矩形高度 = 出栈高度
      const popHeight = heights[popIndex];
      // 矩形宽度 = 右低位置 - 左低位置 - 1（需要考虑左边界情况，如果没有右低位置则使用 -1 替代）
      const width = index - (stack[stack.length - 1] ?? -1) - 1;
      result = Math.max(result, width * popHeight);
    }

    stack.push(index);
  });

  return result;
}
// @lc code=end
