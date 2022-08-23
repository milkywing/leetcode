/*
 * @lc app=leetcode.cn id=104 lang=typescript
 * https://leetcode.cn/problems/maximum-depth-of-binary-tree/description/
 * [104] 二叉树的最大深度
 */

import { TreeNode } from './model/node';

// @lc code=start

function maxDepth(root: TreeNode | null): number {
  // 处理空节点
  if (!root) return 0;

  const left = maxDepth(root.left);
  const right = maxDepth(root.right);

  // 两个子树高度取大值
  return Math.max(left, right) + 1;
}
// @lc code=end
