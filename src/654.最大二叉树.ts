/*
 * @lc app=leetcode.cn id=654 lang=typescript
 * https://leetcode.cn/problems/maximum-binary-tree/description/
 * [654] 最大二叉树
 */
// BINARYTREE

import { TreeNode } from './model/node';

// @lc code=start
function constructMaximumBinaryTree(nums: number[]): TreeNode | null {
  return constructMaximumBinaryTreeCore(nums, 0, nums.length);
}

const constructMaximumBinaryTreeCore = (nums: number[], left: number, right: number): TreeNode | null => {
  if (left === right) return null;

  // 在 [left, right) 区间上找到最大的值的位置，作为根节点
  let maxIndex = left;
  for (let i = left; i < right; i++) {
    if (nums[i] > nums[maxIndex]) maxIndex = i;
  }

  const root = new TreeNode(nums[maxIndex]);
  // 对左右两半部分递归构造子树
  root.left = constructMaximumBinaryTreeCore(nums, left, maxIndex);
  root.right = constructMaximumBinaryTreeCore(nums, maxIndex + 1, right);

  return root;
};
// @lc code=end
