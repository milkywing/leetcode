/*
 * @lc app=leetcode.cn id=145 lang=typescript
 *
 * [145] 二叉树的后序遍历
 */

import { TreeNode } from './model/node';

// @lc code=start
/**
 * 方案A（本解）：实现非递归后序遍历
 * 方案B：变种先序遍历（头、右、左）的逆序
 */
function postorderTraversal(root: TreeNode | null): number[] {
  const result: number[] = [];
  if (!root) return result;

  let p: TreeNode | null = root;
  let preNode: TreeNode | null = null;
  const stack: TreeNode[] = [];

  // 主要思想：
  // 由于在某颗子树访问完成以后，接着就要回溯到其父节点去
  // 因此可以用prev来记录访问历史，在回溯到父节点时，可以由此来判断，上一个访问的节点是否为右子树
  while (p || stack.length) {
    while (p) {
      stack.push(p);
      p = p.left;
    }
    // 从栈中弹出的元素，左子树一定是访问完了的
    const curNode = stack.pop()!;

    // =====================和中序遍历差异部分=====================

    // 现在需要确定的是是否有右子树，或者右子树是否访问过
    // 如果没有右子树，或者右子树访问完了（也就是上一个访问的节点是右子节点时），说明可以访问当前节点
    if (curNode.right === null || preNode === curNode.right) {
      // 【后序遍历】
      result.push(curNode.val);
      // 更新历史访问记录，这样回溯的时候父节点可以由此判断右子树是否访问完成
      preNode = curNode;
      p = null;
    } else {
      // 如果右子树没有被访问，那么将当前节点压栈，访问右子树
      stack.push(curNode);
      p = curNode.right;
    }

    // =====================和中序遍历差异部分=====================
  }

  return result;
}

const postorderTraversalB = (root: TreeNode | null): number[] => {
  const result: number[] = [];
  if (!root) return result;

  const stack = [root];
  while (stack.length) {
    const curNode = stack.pop()!;

    // 变种先序遍历时从前面推入值
    result.unshift(curNode.val);
    if (curNode.left) stack.push(curNode.left);
    if (curNode.right) stack.push(curNode.right);
  }

  return result;
};
// @lc code=end
