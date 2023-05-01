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
    // 把当前节点压栈，只要当前节点有左孩子，就一直将左孩子压栈（左边界入栈）
    while (p) {
      stack.push(p);
      p = p.left;
    }

    // 左边界到头了，开始弹出并处理节点，对该节点的右孩子（右树）重复上述逻辑
    const curNode = stack.pop()!;
    // 中序遍历（左、头、右）
    callback(curNode);
    p = curNode.right;
  }
};

/** 通过魔改中序遍历（左、头、右）实现后序遍历（左、右、头）二叉树节点 */
export const postOrderTraverseBinaryTree = <T = number>(
  node: BinaryTreeNode<T> | null,
  callback: (n: BinaryTreeNode<T>) => void,
): void => {
  if (!node) return;

  const stack: BinaryTreeNode<T>[] = [];
  let p: BinaryTreeNode<T> | null = node;
  let preNode: BinaryTreeNode<T> | null = null;

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

    if (!curNode.right || preNode === curNode.right) {
      // 后序遍历（左、右、头）
      callback(curNode);
      // 更新历史访问记录，这样回溯的时候父节点可以由此判断右子树是否访问完成
      preNode = curNode;
      p = null;
    } else {
      // 如果右子树没有被访问，那么将当前节点重新压回栈，先访问右子树
      stack.push(curNode);
      p = curNode.right;
    }

    // =====================和中序遍历差异部分=====================
  }
};

/**
 * 通过双栈实现后序遍历（左、右、头）二叉树节点，
 * 考虑前序遍历的变种（头、右、左），反过来就是后序遍历（左、右、头），这个反序的操作可以通过另一个栈实现
 */
export const postOrderTraverseBinaryTreeWithTwoStack = <T = number>(
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

/**
 * morris遍历二叉树，current为当前节点，开始时从根节点出发
 * 1. 如果 current 无左孩子，current 向右移动
 * 2. 如果 current 有左孩子，找到左子树上最右的节点 mostRight：
 *    2.1 如果 mostRight 的右孩子为空（说明此时是第一次来到cur所指向结点），将 mostRight 右孩子指向 current，然后 current 向左移动
 *    2.2 如果 mostRight 的右孩子指向 current（说明此时是第二次来到cur所指向结点），将 mostRight 的右孩子指向 null，然后 current 向右移动
 * 3. 重复上述操作，直到 current 指向 null
 */
export const morrisTraverseBinaryTree = <T = number>(
  node: BinaryTreeNode<T> | null,
  callback: (n: BinaryTreeNode<T>) => void,
  order = TraverseOrder.PreOrder,
): void => {
  if (!node) return;

  // 当前遍历节点
  let current: BinaryTreeNode<T> | null = node;
  // 当前遍历节点左子树上最右边的节点
  let mostRight: BinaryTreeNode<T> | null = null;

  while (current) {
    // mostRight 从左子树根节点出发，寻找左子树的最右节点（有的话）
    mostRight = current.left;
    if (mostRight) {
      while (mostRight.right && mostRight.right !== current) {
        mostRight = mostRight.right;
      }

      if (!mostRight.right) {
        // mostRight 右孩子为空，说明第一次来到 current 指向的节点
        mostRight.right = current;
        // 先序遍历（第一次遍历时处理）
        if (order === TraverseOrder.PreOrder) callback(current);
        current = current.left;
        continue;
      } else {
        // mostRight 右孩子指向 current，说明第二次来到 current 指向的节点
        mostRight.right = null;
      }
    } else if (order === TraverseOrder.PreOrder) {
      // 先序遍历（第一次遍历时处理）
      callback(current);
    }
    // 中序遍历（第二次遍历时处理）
    if (order === TraverseOrder.InOrder) callback(current);
    // 没有左子树/第二次来到 current 指向的节点，current 向右移动
    current = current.right;
  }
};
