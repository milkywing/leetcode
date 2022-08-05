/*
 * @lc app=leetcode.cn id=112 lang=typescript
 * https://leetcode.cn/problems/path-sum/description/
 * [112] 路径总和
 */

import { TreeNode } from './model/node';

// @lc code=start
/** 树形DP解法 */
function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
  if (!root) return false;
  // 到达叶子节点，剩下的路径刚好和节点值相等，说明存在目标路径
  if (!root.left && !root.right) return targetSum === root.val;

  // 分别选择左右子树，看下两边是否有目标路径
  return hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val);
}
// @lc code=end
