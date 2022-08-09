/*
 * @lc app=leetcode.cn id=669 lang=typescript
 * https://leetcode.cn/problems/trim-a-binary-search-tree/description/
 * [669] 修剪二叉搜索树
 */

import { TreeNode } from './model/node';

// @lc code=start
/** 利用搜索二叉树的特性决定能裁剪的部分 */
function trimBST(root: TreeNode | null, low: number, high: number): TreeNode | null {
  if (!root) return root;
  // 如果当前树的根大于给定上边界，那整个右子树上的点都是超过上边界的，可以丢掉了，返回左子树裁剪结果
  if (root.val > high) return trimBST(root.left, low, high);
  // 如果当前树的根小于给定下边界，那整个左子树上的点都是低于下边界的，可以丢掉了，返回右子树裁剪结果
  if (root.val < low) return trimBST(root.right, low, high);

  // 当前树的根在边界内，把左子树裁剪结果给左子树，把右子树裁剪结果给右子树
  root.left = trimBST(root.left, low, high);
  root.right = trimBST(root.right, low, high);

  return root;
}
// @lc code=end
