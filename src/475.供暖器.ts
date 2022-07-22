/*
 * @lc app=leetcode.cn id=475 lang=typescript
 *
 * [475] 供暖器
 */

// @lc code=start
/** 找到每个房子距离其最近的供暖器，这些距离中的最大值即是结果 */
function findRadius(houses: number[], heaters: number[]): number {
  // 升序排序
  houses.sort((a, b) => a - b);
  heaters.sort((a, b) => a - b);

  // 双指针分别遍历房子和供暖器
  let [p1, p2] = [0, 0];
  let result = -Infinity;

  while (p1 < houses.length) {
    // 为每个房子找到最佳的供暖器（距离房子最近的供暖器）
    let bestDistance = Math.abs(houses[p1] - heaters[p2]);
    // 如果下一个供暖期离当前房子更近或【不变】，更新最近的距离，p2 右移（因为升序的特性，p2 是不用回退的）
    while (p2 < heaters.length - 1 && Math.abs(houses[p1] - heaters[p2 + 1]) <= bestDistance) {
      bestDistance = Math.abs(houses[p1] - heaters[p2 + 1]);
      p2++;
    }

    result = Math.max(result, bestDistance);
    p1++;
  }

  return result;
}
// @lc code=end
