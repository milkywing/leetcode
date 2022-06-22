/**
 * 汉诺塔的圆盘从上到下标记为1...n
 * 核心思想：
 * 1. 将圆盘 1...n-1 从 from 移动到 other（递归拆分为子问题）
 * 2. 将圆盘 i 从 from 移动到 to
 * 3. 将 1...n-1 从 other 移动到 to（递归拆分为子问题）
 */
const printHanoi = (n: number, from: string, to: string, other: string) => {
  // base case
  if (n === 1) {
    console.log(`move [${n}] ${from} -> ${to}`);
    return;
  }
  printHanoi(n - 1, from, other, to);
  console.log(`move [${n}] ${from} -> ${to}`);
  printHanoi(n - 1, other, to, from);
};

console.log('to move n disks from A to C using B as temp:');
printHanoi(3, 'A', 'C', 'B');
