/*
 * @lc app=leetcode.cn id=402 lang=typescript
 *
 * [402] 移掉 K 位数字
 */

// @lc code=start
/**
 * 贪心+单调双端队列，尽可能让靠前的数字尽量小
 */
function removeKdigits(num: string, k: number): string {
  // 维护从左到右严格上升的双端队列
  const queue: string[] = [];

  for (let i = 0; i < num.length; i++) {
    // 如果当前值放进队列不满足从左到右的严格上升，需要先从右侧不断弹出值（对应删除的数），直到找到比当前值小/等于的位置
    while (queue.length && k && num[i] < queue[queue.length - 1]) {
      queue.pop();
      // 删除了一个数
      k--;
    }
    // 当前值从右侧推入队列
    queue.push(num[i]);
  }

  // 如果还有数要删除，从尾部删除
  while (k) {
    queue.pop();
    k--;
  }

  // 现在队列的顺序对应着数值了，但是还需要去除可能的前导0
  const result = queue.join('');
  for (let i = 0; i < result.length; i++) {
    if (result[i] === '0') continue;
    return result.slice(i);
  }

  return '0';
}
// @lc code=end
