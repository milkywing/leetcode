/*
 * @lc app=leetcode.cn id=94 lang=typescript
 *
 * [94] 二叉树的中序遍历
 */

import { TreeNode } from './model/node';

// @lc code=start
function inorderTraversal(root: TreeNode | null): number[] {
  const result: number[] = [];
  if (!root) return result;

  const stack: TreeNode[] = [];
  let p: TreeNode | null = root;

  // 核心：按左边界分解树
  while (p || stack.length) {
    // 把当前节点压栈，只要当前节点有左孩子，就一直将左孩子压栈（左边界入栈）
    while (p) {
      stack.push(p);
      p = p.left;
    }
    // 左边界到头了，开始弹出并处理节点，对该节点的右孩子（右树）重复上述逻辑
    const curNode = stack.pop()!;
    // 【中序遍历】
    result.push(curNode.val);
    p = curNode.right;
  }

  return result;
}
// @lc code=end
