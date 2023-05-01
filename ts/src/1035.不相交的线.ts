/*
 * @lc app=leetcode.cn id=1035 lang=typescript
 * https://leetcode.cn/problems/uncrossed-lines/description/
 * [1035] 不相交的线
 */
// DYNAMIC

// @lc code=start
/** 最长公共子序列的变种，参考【1143.最长公共子序列】 */
function maxUncrossedLines(nums1: number[], nums2: number[]): number {
  const [length1, length2] = [nums1.length, nums2.length];
  const dp = Array.from({ length: length1 }).map(() => Array(length2).fill(0));

  for (let row = length1 - 1; row >= 0; row--) {
    for (let col = length2 - 1; col >= 0; col--) {
      if (nums1[row] === nums2[col]) {
        dp[row][col] = 1 + dp[row + 1][col + 1];
      } else {
        dp[row][col] = Math.max(dp[row + 1][col], dp[row][col + 1]);
      }
    }
  }

  return dp[0][0];
}

function maxUncrossedLinesB(nums1: number[], nums2: number[]): number {
  return maxUncrossedLinesBCore(nums1, nums2, 0, 0);
}

const maxUncrossedLinesBCore = (nums1: number[], nums2: number[], index1: number, index2: number) => {
  if (nums1.length === index1 || nums2.length === index2) return 0;

  if (nums1[index1] === nums2[index2]) return 1 + maxUncrossedLinesBCore(nums1, nums2, index1 + 1, index2 + 1);

  return Math.max(
    maxUncrossedLinesBCore(nums1, nums2, index1 + 1, index2),
    maxUncrossedLinesBCore(nums1, nums2, index1, index2 + 1),
  );
};
// @lc code=end
