/*
 * @lc app=leetcode.cn id=1 lang=typescript
 * https://leetcode.cn/problems/two-sum/description/
 * [1] 两数之和
 */

// @lc code=start
function twoSum(nums: number[], target: number): number[] {
  // 数值及其对应下表的映射
  const numIndexMap = new Map<number, number>();

  // eslint-disable-next-line no-restricted-syntax
  for (const [index, num] of nums.entries()) {
    // num 对应的值为 target - num，如果 numIndexMap 中有记录，直接获取其下标返回
    if (numIndexMap.has(target - num)) return [index, numIndexMap.get(target - num)!];
    // 访问过某个数值，将其及其下表记录到 numIndexMap 中
    numIndexMap.set(num, index);
  }

  return [];
}
// @lc code=end
