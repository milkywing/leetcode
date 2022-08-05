/*
 * @lc app=leetcode.cn id=72 lang=typescript
 * https://leetcode.cn/problems/edit-distance/
 * [72] 编辑距离
 */

// @lc code=start
/** 递归改动态规划 */
function minDistance(word1: string, word2: string): number {
  const [length1, length2] = [word1.length, word2.length];
  if (length1 * length2 === 0) return length1 + length2;

  const dp = Array.from({ length: length1 + 1 }, () => Array(length2 + 1).fill(0));
  // baseCase 填充
  for (let i = 0; i <= length2; i++) dp[length1][i] = length2 - i;
  for (let i = 0; i <= length1; i++) dp[i][length2] = length1 - i;

  for (let rowIndex = length1 - 1; rowIndex >= 0; rowIndex--) {
    for (let colIndex = length2 - 1; colIndex >= 0; colIndex--) {
      if (word1[rowIndex] === word2[colIndex]) {
        dp[rowIndex][colIndex] = dp[rowIndex + 1][colIndex + 1];
        continue;
      }
      const [right, down, rightDown] = [
        dp[rowIndex][colIndex + 1],
        dp[rowIndex + 1][colIndex],
        dp[rowIndex + 1][colIndex + 1],
      ];
      dp[rowIndex][colIndex] = Math.min(right, down, rightDown) + 1;
    }
  }

  return dp[0][0];
}

/** 从左到右尝试模型 */
const minDistanceCore = (word1: string, word2: string, i1: number, i2: number): number => {
  // baseCase：任意一方匹配完了，只能将剩余的位置删掉
  if (word1.length === i1 || word2.length === i2) return word1.length - i1 + word2.length - i2;

  // 当前两个头一致，继续比较下一个位置
  if (word1[i1] === word2[i2]) return minDistanceCore(word1, word2, i1 + 1, i2 + 1);

  // 两个头不一致，需要选择一种操作执行

  // word1 前插一个 word2 的头匹配掉 word 2 的头，让自己的位置去匹配 word2 的下一个位置
  const inserted = minDistanceCore(word1, word2, i1, i2 + 1);
  // word1 删除自己的头，让自己的下一个位置去匹配 word2 的位置
  const deleted = minDistanceCore(word1, word2, i1 + 1, i2);
  // word1 替换自己的头 匹配掉 word2 的头，让自己的下一个位置去匹配 word2 的下一个位置
  const replaced = minDistanceCore(word1, word2, i1 + 1, i2 + 1);

  // 选择操作数最小的
  return Math.min(inserted, deleted, replaced) + 1;
};
// @lc code=end
