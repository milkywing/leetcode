/*
 * @lc app=leetcode.cn id=958 lang=typescript
 *
 * [958] 二叉树的完全性检验
 */

import { TreeNode } from './model/node';

// @lc code=start
/**
 * 广度优先遍历，遍历每层节点时做判断：
 * 1.如果一个节点有右孩子，而没左孩子，不是完全二叉树
 * 2.在不违反1的情况下，如果遍历某层时，发现空节点的右方有非空节点，不是完全二叉树
 * 3.如果遍历完后都没出现以上情况，则是完全二叉树
 */
function isCompleteTree(root: TreeNode | null): boolean {
  if (!root) return true;

  const queue: TreeNode[] = [];
  queue.push(root);

  // 因为每层都是从左向右遍历的，如果该层遇到了第一个空节点，那该节点往右的节点都必须是空节点才不会
  // 使用一个标记来记录是否遇到第一个空节点
  let flag = false;

  while (queue.length) {
    const current = queue.shift()!;
    const left = current.left;
    const right = current.right;

    // 发现一个节点有右孩子，无左孩子，则说明不是完全二叉树
    if (!left && right) return false;
    // 本层遇到了空节点，如果接下来要遍历的节点有非空的，则不是完全二叉树
    if (flag && (left || right)) return false;

    if (left) queue.push(left);
    if (right) queue.push(right);

    // 遇到第一个空节点
    if (!left || !right) {
      flag = true;
    }
  }

  return true;
}
// @lc code=end
