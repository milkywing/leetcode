/*
 * @lc app=leetcode.cn id=98 lang=typescript
 * https://leetcode.cn/problems/validate-binary-search-tree/description/
 * [98] 验证二叉搜索树
 */

import { TreeNode } from './model/node';

// @lc code=start
/** 中序遍历如果不是升序，则不是二叉搜索树 */
function isValidBST(root: TreeNode | null): boolean {
  if (!root) return true;

  const stack: TreeNode[] = [];
  let p: TreeNode | null = root;
  // 记录当前遍历的前一个值
  let prevVal = Number.NEGATIVE_INFINITY;

  while (p || stack.length) {
    while (p) {
      stack.push(p);
      p = p.left;
    }

    p = stack.pop()!;
    // 破坏了升序，不是二叉搜索树
    if (p.val <= prevVal) return false;
    prevVal = p.val;
    p = p.right;
  }

  return true;
}
// @lc code=end

/**
 * 方法二：可以使用递归，对于每个节点来说，都要求大于左子树的最大值，小于右子树的最小值，
 * 即每个节点即是左子树的上边界，又是右子树的下边界
 */
const isValidBST2 = (root: TreeNode | null): boolean => {
  if (!root) return true;
  return helper(root, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
};

const helper = (root: TreeNode | null, min: number, max: number): boolean => {
  if (!root) return true;
  if (root.val <= min || root.val >= max) return false;
  // 当前节点即是左子树的上边界，又是右子树的下边界
  return helper(root.left, min, root.val) && helper(root.right, root.val, max);
};
