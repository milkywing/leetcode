/*
 * @lc app=leetcode.cn id=946 lang=typescript
 *
 * [946] 验证栈序列
 */

// @lc code=start
function validateStackSequences(pushed: number[], popped: number[]): boolean {
  const stack: number[] = [];

  let popIndex = 0;
  pushed.forEach((num) => {
    // 逐个推入 pushed 数组中的数，每推入一个，检查当前栈顶是否等于 popped 序列中的下一个值，等于就弹出，不断尝试弹出
    stack.push(num);
    while (stack.length && stack[stack.length - 1] === popped[popIndex]) {
      // 看到栈顶能跟 popped 对应得上就赶紧弹
      stack.pop();
      popIndex++;
    }
  });

  // 栈为空说明序列通过验证
  return !stack.length;
}
// @lc code=end
