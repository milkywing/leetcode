/*
 * @lc app=leetcode.cn id=42 lang=typescript
 * https://leetcode.cn/problems/trapping-rain-water/description/
 * [42] 接雨水
 */

// @lc code=start
/**
 * 某个位置是低洼（该位置左右两边有更高的高度），才能存储雨水，该位置储水量为左右
 * 方案A：单调栈求某个值两边最近的更大值
 * 方案B（本解）：双指针向中间逼近
 */
function trap(height: number[]): number {
  // 左右指针从两边向中间靠拢，分别计算并累加两位置的水坑高度
  let [left, right] = [0, height.length - 1];
  // leftMax记载了当前 [0..left] 区间的最大高度
  // rightMax记载了当前 [right..length-1] 区间的最大高度
  let [leftMax, rightMax] = [0, 0];
  let result = 0;

  while (left < right) {
    // 更新两边区域的最大高度
    leftMax = Math.max(leftMax, height[left]);
    rightMax = Math.max(rightMax, height[right]);

    if (leftMax < rightMax) {
      // 根据水桶效应：当前位置的水坑高度 = Min(左高值, 右高值) - 当前位置的高度，
      // 对于左指针来说，leftMax 是可信的，rightMax 是不可信的，实际右高值肯定会大于等于 rightMax
      // 因此当 rightMax > leftMax 时，实际右高值肯定会大于等于 leftMax，此时可确定当前位置的水坑高度
      result += leftMax - height[left];
      left++;
    } else {
      // 对于右指针来说，leftMax 是不可信的，rightMax 是可信的，实际左高值肯定会大于等于 leftMax，
      // 原理同上
      result += rightMax - height[right];
      right--;
    }
  }

  return result;
}

/**
 * 【引导1】对于数组中的某一个数 nums[i]，求两边比该数大，且距离该数最近的位置
 * 比如对于 nums = [2,7,3,5,6] 中的 nums[3]，左边最近的位置是 1，右边最近的位置是 4
 */

/**
 * 【引导2】维持一个单调栈（从栈底到栈顶，存储下标，对应值单调递减），
 *  如果入栈的值比栈顶的值小，下标直接入栈；如果入栈的值比栈顶的值大，就弹出栈顶，直到栈顶的值比入栈的值大再下标入栈。
 *  每出栈一个下标，即可确定该值两边距离最近比该值大的位置（下称清算）：一个是栈顶下标（左），一个是导致本次出栈操作的下标（右）
 *
 * 对于数值重复的情况，可以把栈元素从下标变成下标链表，同一链表上的下标对应的值相同；
 * 重复值入栈时其下标接在目标链表的末尾，出栈时按序清算链表上的所有下标。
 */

/** 单调栈解法 */
const trap2 = (height: number[]): number => {
  const length = height.length;
  let result = 0;
  // 单调栈
  const stack: number[] = [];

  // 遍历所有位置，放入单调栈中
  for (let i = 0; i < length; i++) {
    // 下标 i 如果放入栈中会破坏单调性，需要先不断出栈，直到栈顶的值比 i 对应的值大或相等
    while (stack.length && height[i] > height[stack[stack.length - 1]]) {
      // 出栈操作执行清算
      const top = stack.pop()!;
      // 如果出栈后空了，说明左边没有更高的值，无法构成低洼，跳过清算
      if (!stack.length) break;
      // 栈非严格单调，因此可能会出现两个相同高度的值相邻，即 height[top] === height[leftHigherOrEqualIndex] 的情况
      const leftHigherOrEqualIndex = stack[stack.length - 1];
      const rightHigherIndex = i;
      // 水坑高度 = Min(左高/等值, 右高值) - 出栈的值
      const puddleHeight = Math.min(height[leftHigherOrEqualIndex], height[rightHigherIndex]) - height[top];
      // 水坑宽度 = 右高边界 - 左高/等边界 - 1
      const puddleWidth = rightHigherIndex - leftHigherOrEqualIndex - 1;

      // 水坑容量累加
      result += puddleWidth * puddleHeight;
    }
    // 找好位置后，下标入栈
    stack.push(i);
  }

  return result;
};
// @lc code=end
