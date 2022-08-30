/*
 * @lc app=leetcode.cn id=226 lang=typescript
 * https://leetcode.cn/problems/invert-binary-tree/description/
 * [226] 翻转二叉树
 */

import { TreeNode } from './model/node';

// @lc code=start
function invertTree(root: TreeNode | null): TreeNode | null {
  if (!root) return root;

  // 交换操作可以放置在前序/后序位置
  [root.left, root.right] = [root.right, root.left];
  invertTree(root.left);
  invertTree(root.right);

  return root;
}
// @lc code=end
