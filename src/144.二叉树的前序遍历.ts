/*
 * @lc app=leetcode.cn id=144 lang=typescript
 * https://leetcode.cn/problems/binary-tree-preorder-traversal/description/
 * [144] 二叉树的前序遍历
 */
// BINARYTREE

import { TreeNode } from './model/node';

// @lc code=start
function preorderTraversal(root: TreeNode | null): number[] {
  const result: number[] = [];
  if (!root) return result;

  const stack = [root];

  while (stack.length) {
    const curNode = stack.pop()!;
    // 【前序遍历】
    result.push(curNode.val);

    // 先右孩子压栈，再左孩子压栈（与先序遍历顺序相反）
    if (curNode.right) stack.push(curNode.right);
    if (curNode.left) stack.push(curNode.left);
  }

  return result;
}
// @lc code=end
