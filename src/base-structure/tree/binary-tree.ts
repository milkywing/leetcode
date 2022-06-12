import { BinaryTreeNode } from '../model/node';

export enum TraverseOrder {
  PreOrder = 'PreOrder',
  InOrder = 'InOrder',
  PostOrder = 'PostOrder',
}

/** 递归遍历二叉树节点 */
export const traverseBinaryTree = <T = number>(
  node: BinaryTreeNode<T> | null,
  callback?: (n: BinaryTreeNode<T>) => void,
  order = TraverseOrder.PreOrder,
): void => {
  if (!node) return;

  // 先序遍历（头、左、右）
  if (order === TraverseOrder.PreOrder) callback?.(node);
  traverseBinaryTree(node.left, callback, order);
  // 中序遍历（左、头、右）
  if (order === TraverseOrder.InOrder) callback?.(node);
  traverseBinaryTree(node.right, callback, order);
  // 后序遍历（左、右、头）
  if (order === TraverseOrder.PostOrder) callback?.(node);
};

/** 通过栈实现先序遍历（头、左、右）二叉树节点 */
export const preOrderTraverseBinaryTree = <T = number>(
  node: BinaryTreeNode<T> | null,
  callback: (n: BinaryTreeNode<T>) => void,
): void => {
  if (!node) return;

  const stack: BinaryTreeNode<T>[] = [];
  stack.push(node);
  while (stack.length) {
    const current = stack.pop()!;
    // 先序遍历（头、左、右）
    callback(current);
    // 先右孩子压栈，再左孩子压栈（与遍历顺序相反）
    if (current.right) stack.push(current.right);
    if (current.left) stack.push(current.left);
  }
};

/**
 * 通过栈实现中序遍历（左、头、右）二叉树节点
 * 实质是左树左边界优先遍历（左，头），右子树的左边界次之遍历，
 * 因为右子树可以分解为左边界+新的右子树，所以其实没有【右】的概念
 * (左->头)->右
 *        ↓ 分解
 *       (左->头)->右
 *                ↓ 分解
 *              (左->头)->右
 */
export const inOrderTraverseBinaryTree = <T = number>(
  node: BinaryTreeNode<T> | null,
  callback: (n: BinaryTreeNode<T>) => void,
): void => {
  if (!node) return;

  const stack: BinaryTreeNode<T>[] = [];
  let p: BinaryTreeNode<T> | null = node;
  // 核心：按左边界分解树
  while (p || stack.length) {
    if (p) {
      // 把当前节点压栈，只要当前节点有左孩子，就一直将左孩子压栈（左边界入栈）
      stack.push(p);
      p = p.left;
    } else {
      // 左边界到头了，开始弹出并处理节点，对该节点的右孩子（右树）重复上述逻辑
      p = stack.pop()!;
      // 中序遍历（左、头、右）
      callback(p);
      p = p.right;
    }
  }
};

/**
 * 通过双栈实现后序遍历（左、右、头）二叉树节点
 * 方案：考虑前序遍历的变种（头、右、左），反过来就是后序遍历（左、右、头），这个反序的操作可以通过另一个栈实现
 */
export const postOrderTraverseBinaryTree = <T = number>(
  node: BinaryTreeNode<T> | null,
  callback: (n: BinaryTreeNode<T>) => void,
): void => {
  if (!node) return;

  const stack1: BinaryTreeNode<T>[] = [];
  // 辅助栈，用于 stack1 弹出节点
  const stack2: BinaryTreeNode<T>[] = [];
  stack1.push(node);

  // 这里在实现前序遍历的变种（头、右、左）
  while (stack1.length) {
    const current = stack1.pop()!;
    // 通过辅助栈将节点反序
    stack2.push(current);
    if (current.left) stack1.push(current.left);
    if (current.right) stack1.push(current.right);
  }

  // 逐个弹出辅助栈中的节点，就是后序
  while (stack2.length) {
    // 后序遍历（左、右、头）
    callback(stack2.pop()!);
  }
};

/* 通过队列实现广度优先遍历二叉树 */
export const BFSTraverseBinaryTree = <T = number>(
  node: BinaryTreeNode<T> | null,
  callback: (n: BinaryTreeNode<T>) => void,
): void => {
  if (!node) return;

  const queue: BinaryTreeNode<T>[] = [node];
  while (queue.length) {
    // 开始遍历本层的所有节点
    // 注意，这里需要把本层节点数记录下来，因为下面在操作数组，不能直接使用 queue.length
    const curLevelNodeNum = queue.length;
    for (let i = 0; i < curLevelNodeNum; i++) {
      const current = queue.shift()!;
      callback(current);
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
  }
};
