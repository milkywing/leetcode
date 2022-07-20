/*
 * @lc app=leetcode.cn id=105 lang=typescript
 *
 * [105] 从前序与中序遍历序列构造二叉树
 */

import { TreeNode } from './model/node';

// @lc code=start

/** 建立中序遍历中数值到位置的映射，方便确定根节点后在中序遍历中快速确定其位置 */
const numIndexMap = new Map<number, number>();

/**
 * 先序遍历（头、左子树、右子树），中序遍历（左子树、头、右子树），
 * 只需要根据先序遍历得到根节点 r（第一个位置即是），然后在中序遍历中找到根节点的位置，它的左边就是左子树的节点，右边就是右子树的节点，利用这些信息构造以 r 为根的树
 * 【比如】
 * 0. preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]，
 * 1. 从前序遍历中知道需要构造以 3 为根的树
 * 2. 从中序遍历中知道左子树的中序遍历为[9]（对应前序遍历为[9]），右子树的中序遍历为[15,20,7]（对应前序号遍历为[20,15,7]）
 * 3. 问题分解为了构造左子树（9为根的树）和右子树（20为根的树），重复上述流程
 */

function buildTree(preOrder: number[], inOrder: number[]): TreeNode | null {
  numIndexMap.clear();
  inOrder.forEach((num, index) => {
    numIndexMap.set(num, index);
  });
  return buildTreeCore(preOrder, 0, preOrder.length, inOrder, 0, inOrder.length);
}

/**  位置左闭右开如[pStart,pEnd) */
const buildTreeCore = (
  preOrder: number[],
  pStart: number,
  pEnd: number,
  inOrder: number[],
  iStart: number,
  iEnd: number,
): TreeNode | null => {
  if (pStart === pEnd) return null;

  // 确定本次的根，以此构造树
  const rootNode = new TreeNode(preOrder[pStart]);
  // 在中序遍历中找到根节点的位置，划分左右子树的中序遍历
  const splitIndex = numIndexMap.get(rootNode.val)!;
  // 左子树的大小，用于划分左右子树的的前序遍历
  const leftTreeSize = splitIndex - iStart;

  // 构造左子树和右子树
  rootNode.left = buildTreeCore(preOrder, pStart + 1, pStart + 1 + leftTreeSize, inOrder, iStart, splitIndex);
  rootNode.right = buildTreeCore(preOrder, pStart + 1 + leftTreeSize, pEnd, inOrder, splitIndex + 1, iEnd);

  return rootNode;
};
// @lc code=end
