/*
 * @lc app=leetcode.cn id=530 lang=typescript
 *
 * [530] 二叉搜索树的最小绝对差
 */

import { TreeNode } from './model/node';

// @lc code=start

/** 二叉搜索树中序遍历是升序序列，差值最小肯定存在序列中相邻的两个数之间，记录中序遍历中相邻两数的最小差值即可 */
function getMinimumDifference(root: TreeNode): number {
  let p: TreeNode | null = root;
  const stack: TreeNode[] = [];
  let prevVal = -Infinity;
  let result = Infinity;

  while (p || stack.length) {
    while (p) {
      stack.push(p);
      p = p.left;
    }

    const curNode = stack.pop()!;
    result = Math.min(result, Math.abs(curNode.val - prevVal));
    prevVal = curNode.val;
    p = curNode.right;
  }

  return result;
}
// @lc code=end
