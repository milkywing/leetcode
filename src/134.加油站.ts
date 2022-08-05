/*
 * @lc app=leetcode.cn id=134 lang=typescript
 * https://leetcode.cn/problems/gas-station/description/
 * [134] 加油站
 */

// @lc code=start
function canCompleteCircuit(gas: number[], cost: number[]): number {
  const length = gas.length;
  // 从位置 0 开始开车，记录车到达每个位置的剩余油量（可以负数）
  let spare = 0;
  // 记录最低剩余油量和对应的位置
  let [minSpare, minSpareIndex] = [+Infinity, 0];

  for (let i = 0; i < length; i++) {
    spare += gas[i] - cost[i];
    if (spare < minSpare) {
      minSpare = spare;
      minSpareIndex = i;
    }
  }

  // 如果环路一周剩余油量是负的，无论从哪出发都是无法环路一周的，
  // 否则从最低剩余油量的位置的下一个位置出发
  return spare < 0 ? -1 : (minSpareIndex + 1) % length;
}

/**
 * 【重要性质】如果从 x 出发无法到 y，那在 [x,y] 之间任意位置出发都不能到达 y
 */
const canCompleteCircuitB = (gas: number[], cost: number[]): number => {
  const length = gas.length;
  let i = 0;

  while (i < length) {
    // 从位置 i 出发，尽可能的走远；spare 表示剩余油量，passNum 表示经过了多少个位置
    let spare = 0;
    let passNum = 0;
    while (passNum < length) {
      const passIndex = (i + passNum) % length;
      spare += gas[passIndex] - cost[passIndex];
      if (spare < 0) break;
      passNum++;
    }

    // 从 i 位置出发能完整的跑一圈
    if (passNum === length) {
      return i;
    }
    // 选择下一个不可达位置作为起点
    i = i + passNum + 1;
  }

  return -1;
};
// @lc code=end
