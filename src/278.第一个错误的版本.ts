/*
 * @lc app=leetcode.cn id=278 lang=typescript
 * https://leetcode.cn/problems/first-bad-version/description/
 * [278] 第一个错误的版本
 */

// @lc code=start
/**
 * The knows API is defined in the parent class Relation.
 * isBadVersion(version: number): boolean {
 *     ...
 * };
 */

/** 相当于二分提交记录查 bug 引入的位置 */
const solution = (isBadVersion: any) => {
  return (n: number): number => {
    let [left, right] = [1, n];

    while (left < right) {
      // 防止溢出
      const mid = left + ((right - left) >> 1);
      // mid 有错误，说明错误在中点左侧，也可能是当前中点
      if (isBadVersion(mid)) right = mid;
      // mid 没有错误，说明错误在中点右侧
      else left = mid + 1;
    }

    return left;
  };
};
// @lc code=end
