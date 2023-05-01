/*
 * @lc app=leetcode.cn id=128 lang=typescript
 * https://leetcode.cn/problems/longest-consecutive-sequence/description/
 * [128] 最长连续序列
 */

import { UnionFind } from './base-structure/union-find';

// @lc code=start
/**
 * 方案A（本解）：使用 set 给元素去重，然后遍历每个值 n，从 n 开始寻找连续序列，记录最长序列
 * 方案B：并查集，先把所有元素都加到并查集中，然后遍历每个值 n，把 n、n-1、n+1 并起来，最后取最大的连通分量的大小
 */
function longestConsecutive(nums: number[]): number {
  const set = new Set(nums);
  let result = 0;

  set.forEach((num) => {
    // 【优化】n-1 开始的序列必包含 n 开始的序列，因此如果当前值的前一个值存在，可以跳过当前值
    if (set.has(num - 1)) return;
    let curNum = num;
    let count = 1;
    while (set.has(curNum + 1)) {
      curNum++;
      count++;
    }

    result = Math.max(result, count);
  });

  return result;
}

// @lc code=end
const longestConsecutiveB = (nums: number[]): number => {
  const uniqueNums = [...new Set(nums)];
  // 因为 nums 有重复值，因此创建并查集时需要去重
  const uf = new UnionFind(uniqueNums);
  uniqueNums.forEach((num) => {
    uf.union(num, num - 1);
    uf.union(num, num + 1);
  });

  return uf.getLargestComponentSize();
};
