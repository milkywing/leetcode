/*
 * @lc app=leetcode.cn id=1 lang=typescript
 *
 * [1] 两数之和
 */

// @lc code=start
function twoSum(nums: number[], target: number): number[] {
  // 数值及其对应下表的映射
  const map: Record<number, number> = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const [index, num] of nums.entries()) {
    // num 对应的值为 target - num，如果map中有记录，直接获取其下标返回
    if (Number.isInteger(map[target - num])) return [index, map[target - num]];
    // 访问过某个数值，将其及其下表记录到map中
    map[num] = index;
  }

  return [];
}
// @lc code=end
