/**
 * 【问题】给定一个数组 machines 表示每个咖啡机的效率，比如第 i 台机器需要 machine[i] 的时间来生产一杯咖啡，
 * 给定整数 n 表示有 n 个客人来喝咖啡，每个客人只会喝一杯咖啡且喝咖啡不占用时间，即一个人从某台机器拿到咖啡后，该机器立马恢复可使用状态，
 * 给定整数 a 表示有一台洗杯机，洗杯机只能一次洗一个杯子，花费 a 的时间让一个杯子变得干净，
 * 给定整数 b 表示杯子的晾干时间，如果一个杯子没洗，那经过 b 的时间，一个杯子也会变干净，
 * 求所有客人都喝上咖啡且杯子都洗干净的最少时间
 */

import { PriorityQueue } from '../base-structure/priority-queue';

interface HeapItem {
  /** 咖啡机可用时刻 */
  availableTime: number;
  /** 咖啡机效率 */
  efficiency: number;
}

/**
 * 解题分成两步：
 * 1. 求解每个人最早喝完咖啡的时刻，使用数组 finished 记录
 * 2. 基于 finished 数组，求解洗完杯子所需最小时刻
 */
export const drinkAndCleanCoffee = (machines: number[], n: number, a: number, b: number): number => {
  // 对于步骤 1，可以使用小顶堆求解，按 availableTime+efficiency 排序
  const pq = new PriorityQueue<HeapItem>(
    machines.map((efficiency) => ({ availableTime: 0, efficiency } as HeapItem)),
    (item1, item2) => {
      const diff = item1.availableTime + item1.efficiency - item2.availableTime - item2.efficiency;
      if (diff === 0) {
        return item1.efficiency - item2.efficiency;
      }
      return diff;
    },
  );

  const finished: number[] = [];

  for (let i = 0; i < n; i++) {
    // 计算每个人最早喝完咖啡的时刻
    const { availableTime, efficiency } = pq.dequeue()!;
    finished.push(availableTime + efficiency);
    // 对应咖啡机可用时刻进行累加
    pq.enqueue({ efficiency, availableTime: availableTime + efficiency });
  }

  // 对于步骤 2，可以使用从左到右尝试模型，考虑每个人喝完咖啡后是否选择使用洗杯机
  // index 表示正在考虑第 index 个杯子的洗法，然后还要洗完 [index+1, n-1] 范围的杯子，washAvailableTime 表示洗杯机可用时刻，
  // 函数返回洗完 [index, n-1] 范围所有杯子所需最小时刻
  const minTimeAfterClean = (index: number, washAvailableTime: number): number => {
    // baseCase：洗最后一个人的杯子
    if (index === finished.length - 1) {
      // 洗杯：客人喝完时刻和洗杯机可用时刻中的大值决定了什么时刻才能用洗杯机，然后加上洗杯时间
      const wash = Math.max(finished[index], washAvailableTime) + a;
      // 不洗杯：喝完后马上去晾
      const notWash = finished[index] + b;
      // 取两种选择下结束时刻小的
      return Math.min(wash, notWash);
    }

    // 洗杯情况
    // 洗完第 index 个杯子后结束的时刻
    const curWash = Math.max(finished[index], washAvailableTime) + a;
    // 洗完剩下杯子后结束的时刻
    const restWash = minTimeAfterClean(index + 1, curWash);
    // 所有杯子洗完后结束的时刻
    const wash = Math.max(curWash, restWash);

    // 不洗杯情况
    const curNotWash = finished[index] + b;
    const restNotWash = minTimeAfterClean(index + 1, washAvailableTime);
    const notWash = Math.max(curNotWash, restNotWash);

    // 取两种选择下结束时刻小的
    return Math.min(wash, notWash);
  };

  return minTimeAfterClean(0, 0);
};
