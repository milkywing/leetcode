/*
 * @lc app=leetcode.cn id=124 lang=typescript
 * https://leetcode.cn/problems/binary-tree-maximum-path-sum/description/
 * [124] 二叉树中的最大路径和
 */
// BINARYTREE

import { TreeNode } from './model/node';

// @lc code=start

let result = -Infinity;

/** 求任意两节点的路径节点权重和最大值 */
function maxPathSum(root: TreeNode | null): number {
  result = -Infinity;
  maxGain(root);
  return result;
}

/** 求子孙节点到根节点路径上最大节点权重和，顺便求题目要求的结果 */
const maxGain = (root: TreeNode | null): number => {
  if (!root) return 0;

  // 求左子树 maxGain 和右子树 maxGain，抛弃负值子树（因为会拉低权重和）
  const leftGain = Math.max(0, maxGain(root.left));
  const rightGain = Math.max(0, maxGain(root.right));

  // 更新两节点的路径节点权重的最大值
  result = Math.max(result, leftGain + rightGain + root.val);

  return Math.max(leftGain, rightGain) + root.val;
};
// @lc code=end
