/** 二叉树节点 */
export interface BinaryTreeNode<T = number> {
  value: T;
  /** 左孩子 */
  left: BinaryTreeNode<T> | null;
  /** 右孩子 */
  right: BinaryTreeNode<T> | null;
}

/** 创建二叉树节点 */
export const createBinaryTreeNode = <T = number>(value: T): BinaryTreeNode<T> => {
  return {
    value,
    left: null,
    right: null,
  };
};

/** 为二叉树节点插入左儿子 */
export const insertLeft = <T = number>(node: BinaryTreeNode<T>, value: T): BinaryTreeNode<T> => {
  node.left = createBinaryTreeNode(value);
  return node.left;
};

/** 为二叉树节点插入右儿子 */
export const insertRight = <T = number>(node: BinaryTreeNode<T>, value: T): BinaryTreeNode<T> => {
  node.right = createBinaryTreeNode(value);
  return node.right;
};
