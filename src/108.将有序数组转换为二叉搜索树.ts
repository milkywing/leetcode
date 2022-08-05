/*
 * @lc app=leetcode.cn id=108 lang=typescript
 * https://leetcode.cn/problems/convert-sorted-array-to-binary-search-tree/description/
 * [108] 将有序数组转换为二叉搜索树
 */

import { TreeNode } from './model/node';

// @lc code=start
/**
 * 搜索二叉树的中序遍历就是升序序列，想要平衡，就需要让两边尽可能对称，
 * 因此可以每次选取中点作为根，使用左半区域构造子树，使用右半区域构造子树
 */
function sortedArrayToBST(nums: number[]): TreeNode | null {
  return sortedArrayToBSTCore(nums, 0, nums.length);
}

/** 根据 [left, right）区间的数构造搜索二叉平衡树 */
const sortedArrayToBSTCore = (nums: number[], left: number, right: number): TreeNode | null => {
  if (left === right) return null;
  const mid = (left + right) >> 1;

  // 每次都选取中点作为根
  const root = new TreeNode(nums[mid]);
  root.left = sortedArrayToBSTCore(nums, left, mid);
  root.right = sortedArrayToBSTCore(nums, mid + 1, right);

  return root;
};
// @lc code=end
