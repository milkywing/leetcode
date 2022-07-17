/*
 * @lc app=leetcode.cn id=114 lang=typescript
 *
 * [114] 二叉树展开为链表
 */

import { TreeNode } from './model/node';

// @lc code=start
/**
 Do not return anything, modify root in-place instead.
 */
/**
 * 方案A（本解）：假设 flatten 操作能把树变成链表，可以先让根的左右子树都变成链表先，然后将三者连接成【根-左链表-右链表】即可
 * 方案B：变种后序遍历（右、左、头）反向转换为链表，可以是递归，也可以是迭代实现
 * 方案C：树形DP，思想同方案 A
 */
function flatten(root: TreeNode | null): void {
  if (!root) return;

  // 将左右子树变成链表
  flatten(root.left);
  flatten(root.right);

  // 记住两个链表的头
  const leftLinkHead = root.left;
  const rightLinkHead = root.right;

  // 先让根接上左链表
  root.right = leftLinkHead;
  root.left = null;

  // 找到【根-左链表】上的尾部节点，
  let tail = root;
  while (tail.right) {
    tail = tail.right;
  }

  // 让尾部节点接上右链表
  tail.right = rightLinkHead;
}

/** 使用一个变量记住变种后序遍历中的前一个节点 */
let pre: TreeNode | null = null;

const flattenB = (root: TreeNode | null): void => {
  pre = null;
  flattenCore(root);
};

/**
 * 先序遍历（头、左、右）转正向转换为链表，等效于变种后序（右、左、头）反向转换为链表
 * 比如对于先序 1、2、3、4、5；可以先 1->2、3、4、5，然后 1->2->3、4、5 ...
 * 等效于变种后序 5、4、3、2、1 ；可以先 5<-4、3、2、1，然后 5<-4<-3、2、1 ...
 *
 * 为什么不采用先序遍历转换：如果在先序遍历的过程中修改 right 指针，就会丢失原右子树，导致遍历出错，
 * 但是如果采用变种后序转换，当前节点的右子树总是已经访问过的，舍弃右子树没事，可以安心修改 right 指针
 */
const flattenCore = (root: TreeNode | null): void => {
  if (!root) return;

  flattenCore(root.right);
  flattenCore(root.left);

  root.right = pre;
  root.left = null;
  pre = root;
};

interface DPInfo {
  head: TreeNode | null;
  tail: TreeNode | null;
}

/** 树形DP，函数能将子树转换为链表，并返回链表的头和尾 */
const flattenC = (root: TreeNode | null): DPInfo => {
  if (!root) return { head: null, tail: null };

  const leftLink = flattenC(root.left);
  const rightLink = flattenC(root.right);

  // 先让根接上左链表
  root.left = null;
  let tail = root;
  if (leftLink.head) {
    root.right = leftLink.head;
    tail = leftLink.tail!;
  }
  // 让尾部节点接上右链表
  if (rightLink.head) {
    tail.right = rightLink.head;
    tail = rightLink.tail!;
  }

  return { head: root, tail };
};
// @lc code=end
