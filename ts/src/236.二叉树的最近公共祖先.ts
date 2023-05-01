/*
 * @lc app=leetcode.cn id=236 lang=typescript
 * https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/description/
 * [236] 二叉树的最近公共祖先
 */
// BINARYTREE

import { TreeNode } from './model/node';

// @lc code=start
/**
 *  要求最近公共祖先，关键是要从两个子孙节点出发由下自上的寻找公共祖先，这里可以使用递归（深度优先遍历）来实现【由下自上】
 *  考虑两种情况：
 * 1. p 和 q 互为祖孙关系，则两者靠上的节点为结果
 * 2. p 和 q 不互为祖孙关系，
 */
function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
  // 深度优先遍历截止条件：遍历到了叶子结点或者 p 、q 结点，此时将该结点向上传递（该节点只能是p、q或者null）
  if (!root || root === p || root === q) return root;

  // 接受两边子树向上传递的节点
  // 如果收到空，说明该子树上没有 p 或 q；如果收到非空，说明该子树上有 p 或 q
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);

  // 【情况2】如果当前节点从两边子树分别收到向上传递的 p 和 q 节点，说明当前节点为最近公共祖先
  if (left && right) return root;
  // 作用1: 将两边收到的节点向上汇总，有非空返回非空，否则返回空
  // 作用2: 处理情况【1】
  return left || right;
}
// @lc code=end
