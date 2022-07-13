/*
 * @lc app=leetcode.cn id=452 lang=typescript
 *
 * [452] 用最少数量的箭引爆气球
 */

// @lc code=start
/**
 * 贪心求解
 * 方案A（本解）：按区间起点升序，终点降序排序，遍历气球，统计重叠区间个数
 * 方案B：按区间终点升序排序，遍历气球尾点
 */
function findMinArrowShots(points: number[][]): number {
  // 先来排序，区间起点升序优先，区间终点降序次之（为的是让邻接的气球尽可能的重合）
  points.sort((pa, pb) => {
    if (pa[0] !== pb[0]) return pa[0] - pb[0];
    return pb[1] - pa[1];
  });

  const length = points.length;
  let result = 1;
  let [preLeft, preRight] = points[0];

  for (let i = 1; i < length; i++) {
    const [curLeft, curRight] = points[i];
    if (curLeft <= preRight) {
      // 当前气球和上个区间重叠，更新重叠区间
      preLeft = Math.max(preLeft, curLeft);
      preRight = Math.min(preRight, curRight);
    } else {
      // 当前气球和上个区间不重叠，只能从新的区间开始考虑，
      // 之前的气球共享一个重叠区间，箭数加1
      result++;
      [preLeft, preRight] = points[i];
    }
  }

  return result;
}

const findMinArrowShotsB = (points: number[][]): number => {
  // 按区间终点升序排序
  points.sort((pa, pb) => pa[1] - pb[1]);
  const length = points.length;
  let result = 1;

  let i = 0;
  while (i < length) {
    // 记录当前气球终点 right
    const right = points[i][1];
    i++;
    // 考虑接下来的气球，是否跟 right 产生重合
    while (i < length && points[i][0] <= right) i++;
    // 直到不重合时，之前的气球共享一个重叠区间，箭数加1
    result++;
  }

  return result;
};
// @lc code=end
