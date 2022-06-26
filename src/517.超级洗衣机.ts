/*
 * @lc app=leetcode.cn id=517 lang=typescript
 *
 * [517] 超级洗衣机
 */

// @lc code=start
/**
 * 贪心解法：
 * 目标是让所有洗衣机都能分到 avg 的数量，一共 n 个洗衣机，对于任意一个洗衣机，假如其位置为 i，那左侧洗衣机的数量为 i，右侧洗衣机的数量为 n-1-i，
 * 按照目标的定义，左侧洗衣机需要衣服数量为 i * avg，右侧洗衣机为 (n-1-i) * avg，把他们减去左右侧的实际数量得到两侧的差值 leftNeed、rightNeed，
 * leftNeed 为正数表示左侧洗衣机缺衣服的数量，需要向中间和右侧借；为负数表示左侧洗衣机衣服多出数量，需要向中间和右侧丢；rightNeed 同理，
 * 现在考虑三种情况（注意，一个洗衣机丢衣服的时候只能一件件丢，但收衣服没有这个限制）：
 * 1.leftNeed、rightNeed > 0，说明左右侧都是过少的，中间往两边丢，至少步数 leastStep = |leftNeed| + |rightNeed|；
 * 2.leftNeed、rightNeed < 0，说明左右侧都是过多的，都要往中间丢，至少步数 leastStep = max(|leftNeed|, |rightNeed|)；
 * 3.leftNeed * rightNeed < 0，说明一侧和中间总体是过多的，他们都要向另外一侧丢，至少步数 leastStep = max(|leftNeed|, |rightNeed|)；
 * 只要遍历所有位置的洗衣机，计算并记录最大 leastStep 即为最终答案（最痛的瓶颈即为至少移动数量）。
 */
function findMinMoves(machines: number[]): number {
  const length = machines.length;
  if (length === 1) return 0;
  // 衣服总数不能被机器数整除，肯定不能均分
  const sum = machines.reduce((a, b) => a + b);
  if (sum % length !== 0) return -1;
  // 平均每台机器的衣服数量
  const avg = sum / length;
  // 记录位置 i 左侧洗衣机实际衣服数量
  let leftSum = 0;

  let result = 0;
  for (let i = 0; i < length; i++) {
    // 对于位置 i 的洗衣机，其左右侧分别需要衣服的数量
    const leftNeed = i * avg - leftSum;
    const rightNeed = (length - 1 - i) * avg - (sum - leftSum - machines[i]);

    if (leftNeed > 0 && rightNeed > 0) {
      // 对应情况 1
      result = Math.max(result, leftNeed + rightNeed);
    } else {
      // 对应情况 2
      result = Math.max(result, Math.abs(leftNeed), Math.abs(rightNeed));
    }
    leftSum += machines[i];
  }

  return result;
}
// @lc code=end
