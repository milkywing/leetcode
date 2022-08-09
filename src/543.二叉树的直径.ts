/*
 * @lc app=leetcode.cn id=543 lang=typescript
 * https://leetcode.cn/problems/diameter-of-binary-tree/description/
 * [543] 二叉树的直径
 */

import { TreeNode } from './model/node';

// @lc code=start

let result = 0;

/** 二叉树直径 = 路径边数 = 左子树高度 + 右子树高度 */
function diameterOfBinaryTree(root: TreeNode | null): number {
  // 重置 result
  result = 0;
  depth(root);
  return result;
}

/** 求树高，顺便求出当前树的直径，更新最大直径 */
const depth = (root: TreeNode | null): number => {
  if (!root) return 0;

  const leftDepth = depth(root.left);
  const rightDepth = depth(root.right);
  // 更新二叉树直径
  result = Math.max(result, leftDepth + rightDepth);

  return Math.max(leftDepth, rightDepth) + 1;
};
// @lc code=end
