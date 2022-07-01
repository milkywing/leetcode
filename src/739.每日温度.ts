/*
 * @lc app=leetcode.cn id=739 lang=typescript
 *
 * [739] 每日温度
 */

// @lc code=start
/** 单调栈 */
function dailyTemperatures(temperatures: number[]): number[] {
  // 维持一个从底到顶温度递减的栈，栈内存对应下标
  const stack: number[] = [];
  const result: number[] = Array(temperatures.length).fill(0);

  // 遍历所有位置，放入单调栈中
  temperatures.forEach((temp, index) => {
    // 标 i 如果放入栈中会破坏单调性，需要先不断出栈，直到栈顶的值比 i 对应的值大或相等
    while (stack.length && temp > temperatures[stack[stack.length - 1]]) {
      // 对于出栈下标 popIndex，其右侧温度更大的位置就是当前准备入栈的 index，计算两个位置的距离作为结果
      const popIndex = stack.pop()!;
      result[popIndex] = index - popIndex;
    }
    // 找好位置后，下标入栈
    stack.push(index);
  });

  // 对于栈中剩余的位置，其实右边是没有更大的值，需要标记为0，但默认值就是 0，可以不用处理

  return result;
}
// @lc code=end
