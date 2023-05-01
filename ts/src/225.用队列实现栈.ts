/*
 * @lc app=leetcode.cn id=225 lang=typescript
 * https://leetcode.cn/problems/implement-stack-using-queues/description/
 * [225] 用队列实现栈
 */

// @lc code=start
class MyStack {
  private queue1: number[] = [];

  private queue2: number[] = [];

  public push(x: number): void {
    // 将队列一的内容用队列二保存
    while (this.queue1.length) {
      this.queue2.unshift(this.queue1.pop()!);
    }
    // 入栈元素推入队列一
    this.queue1.unshift(x);
    // 队列二的内容倒回队列一
    while (this.queue2.length) {
      this.queue1.unshift(this.queue2.pop()!);
    }
  }

  public pop(): number {
    return this.queue1.pop()!;
  }

  public top(): number {
    return this.queue1[this.queue1.length - 1];
  }

  public empty(): boolean {
    return !this.queue1.length;
  }
}

/**
 * Your MyStack object will be instantiated and called as such:
 * var obj = new MyStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.empty()
 */
// @lc code=end
