/*
 * @lc app=leetcode.cn id=56 lang=typescript
 *
 * [56] 合并区间
 */

// @lc code=start
/**
 * 有点像【452.用最少数量的箭引爆气球】可以参考一下，
 * 这里的重叠有些差异，A和B有重叠，B和C有重叠，就算A和C没重叠，他们都会合并
 */
function merge(intervals: number[][]): number[][] {
  const length = intervals.length;
  if (length < 2) return intervals;

  // 区间起点升序排序优先，区间终点升序排序次之
  intervals.sort((a, b) => {
    if (a[0] === b[0]) return a[1] - b[1];
    return a[0] - b[0];
  });

  let [overLapStart, overLapEnd] = intervals[0];
  const result: number[][] = [];

  for (let i = 1; i < length; i++) {
    const [curStar, curEnd] = intervals[i];
    if (curStar <= overLapEnd) {
      // 当前区间和重叠区间重叠，扩展重叠区间
      overLapEnd = Math.max(overLapEnd, curEnd);
    } else {
      // 当前区间和重叠区间不重叠，只能从新的区间开始考虑，
      // 之前的重叠区间形成一个结果
      result.push([overLapStart, overLapEnd]);
      [overLapStart, overLapEnd] = intervals[i];
    }
  }

  result.push([overLapStart, overLapEnd]);

  return result;
}
// @lc code=end
