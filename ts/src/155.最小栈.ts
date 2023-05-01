/*
 * @lc app=leetcode.cn id=155 lang=typescript
 * https://leetcode.cn/problems/min-stack/description/
 * [155] 最小栈
 */

// @lc code=start
class MinStack {
  // 栈元素同时记录两个信息，【值，推入该值时的最小值】
  private stack: [number, number][] = [];

  private get topItem(): [number, number] | undefined {
    return this.stack[this.stack.length - 1];
  }

  push(val: number): void {
    if (!this.topItem) {
      this.stack.push([val, val]);
      return;
    }
    this.stack.push([val, Math.min(this.topItem![1], val)]);
  }

  pop(): void {
    this.stack.pop();
  }

  top(): number {
    return this.topItem![0];
  }

  getMin(): number {
    return this.topItem![1];
  }
}

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
// @lc code=end
