/**
 * 【问题】给定节点数 n，求能组成多少种不同的二叉树
 */
export const shapeOfBinaryTree = (n: number): number => {
  // baseCase
  if (n < 0) return 0;
  if (n <= 1) return 1;
  if (n === 2) return 2;

  let count = 0;

  // 将一个节点作为头节点，让剩下的 n -1 个节点在左右子树自由分配，
  // 在每一种分配中，当前树的组合数为左右子树组合数的乘积，考虑所有分配情况求和
  for (let i = 0; i <= n - 1; i++) {
    count += shapeOfBinaryTree(i) * shapeOfBinaryTree(n - 1 - i);
  }

  return count;
};
