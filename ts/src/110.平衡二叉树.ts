/*
 * @lc app=leetcode.cn id=110 lang=typescript
 * https://leetcode.cn/problems/balanced-binary-tree/description/
 * [110] 平衡二叉树
 */
// BINARYTREE

import { TreeNode } from './model/node';

// @lc code=start
/** 后序遍历自底向上递归，如果发现子树出现不平衡，直接提前终止 */
function isBalanced(root: TreeNode | null): boolean {
  return isBalancedCore(root) !== -1;
}

const isBalancedCore = (root: TreeNode | null): number => {
  if (!root) return 0;
  const leftHeight = isBalancedCore(root.left);
  // 返回 -1 表示当前节点的树已经失衡，提前终止并向上传递 -1
  if (leftHeight === -1) return -1;
  const rightHeight = isBalancedCore(root.right);
  if (rightHeight === -1) return -1;

  return Math.abs(leftHeight - rightHeight) < 2 ? Math.max(leftHeight, rightHeight) + 1 : -1;
};

/** 平衡二叉树的子树一定是平衡二叉树，且两子树高度差不超过一，可自顶向下递归判断 */
const isBalanced2 = (root: TreeNode | null): boolean => {
  if (!root) return true;

  return Math.abs(height2(root.left) - height2(root.right)) <= 1 && isBalanced2(root.left) && isBalanced2(root.right);
};

const height2 = (root: TreeNode | null): number => {
  if (!root) return 0;
  return Math.max(height2(root.left), height2(root.right)) + 1;
};
// @lc code=end
