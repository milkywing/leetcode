/*
 * @lc app=leetcode.cn id=232 lang=typescript
 *
 * [232] 用栈实现队列
 */

// @lc code=start
class MyQueue {
  private pushStack: number[] = [];

  private popStack: number[] = [];

  public push(x: number): void {
    this.pushStack.push(x);
    // 如果当前 popStack 是空的，则将 pushStack 的内容倒到 popStack 中
    if (!this.popStack.length) {
      this.dump();
    }
  }

  public pop(): number {
    const popped = this.popStack.pop()!;
    // 如果当前 popStack 是空的，则将 pushStack 的内容倒到 popStack 中
    if (!this.popStack.length) {
      this.dump();
    }

    return popped;
  }

  public peek(): number {
    return this.popStack[this.popStack.length - 1];
  }

  public empty(): boolean {
    return this.pushStack.length === 0 && this.popStack.length === 0;
  }

  /** 将 pushStack 的内容倒到 popStack 中 */
  private dump(): void {
    while (this.pushStack.length) {
      this.popStack.push(this.pushStack.pop()!);
    }
  }
}

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */
// @lc code=end
