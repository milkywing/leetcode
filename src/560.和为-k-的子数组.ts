/*
 * @lc app=leetcode.cn id=560 lang=typescript
 * https://leetcode.cn/problems/subarray-sum-equals-k/description/
 * [560] 和为 K 的子数组
 */

// @lc code=start
// 前缀和思想，参考【437.路径总和-iii】
function subarraySum(nums: number[], k: number): number {
  const preSumCountMap = new Map<number, number>([[0, 1]]);
  let curPreSum = 0;
  let result = 0;

  nums.forEach((num) => {
    curPreSum += num;
    result += preSumCountMap.get(curPreSum - k) ?? 0;
    preSumCountMap.set(curPreSum, (preSumCountMap.get(curPreSum) ?? 0) + 1);
  });

  return result;
}
// @lc code=end
