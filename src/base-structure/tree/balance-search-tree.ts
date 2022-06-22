interface BSTNode<K = number, V = number> {
  /** 节点唯一key */
  key: K;
  /** 节点携带值 */
  value: V;
  /** 左孩子 */
  left: BSTNode<K, V> | null;
  /** 右孩子 */
  right: BSTNode<K, V> | null;
  /** 父节点 */
  parent: BSTNode<K, V> | null;
  /** 以该节点为头的子树高度 */
  height: number;
}

abstract class BalanceSearchTree<K = number, V = number> {
  protected root: BSTNode<K, V> | null = null;

  protected treeSize = 0;

  // eslint-disable-next-line class-methods-use-this
  protected compare: (a: K, b: K) => number = (a: unknown, b: unknown) => {
    if (typeof a === 'number' && typeof b === 'number') {
      return a - b;
    }
    throw Error('非基础类型请提供比较器');
  };

  public get size(): number {
    return this.treeSize;
  }

  /** 增/改 */
  public abstract put(key: K, value: V): void;

  /** 删 */
  public abstract remove(key: K): void;

  /** 查 */
  public abstract get(key: K): V | null;

  /** 插入节点 */
  public abstract insertNode(node: BSTNode<K, V>): void;

  /** 删除节点 */
  public abstract deleteNode(node: BSTNode<K, V>): void;
}

/** 左旋操作，右孩子成为新头。在右孩子的右边过长时调用，使新的左子树高度加一 */
const leftRotate = (node: BSTNode): BSTNode => {
  const newNode = node.right!;
  node.right = newNode.left;
  newNode.left = node;

  return newNode;
};

/** 右旋操作，左孩子成为新头。在左孩子的左边过长时调用，使新的右子树高度加一  */
const rightRotate = (node: BSTNode): BSTNode => {
  const newNode = node.left!;
  node.left = newNode.right;
  newNode.right = node;

  return newNode;
};

/**
 * AVL：破坏平衡性四种情况
 * 1.LL（左孩子左边过长），对头节点执右旋，左孩子成为新头
 * 2.LR（左孩子的右边过长），先对左孩子进行左旋，再对头进行右旋，左孩子的右孩子成为新头
 * 3.RR（右孩子右边过长），对头节点执左旋，右孩子成为新头
 * 4.RL（右孩子的左边过长），先对右孩子进行右旋，再对头进行左旋，右孩子的左孩子成为新头
 */
class AVLTree<K = number, V = number> extends BalanceSearchTree<K, V> {
  constructor(compare?: (a: K, b: K) => number) {
    super();
    this.compare = compare ?? this.compare;
  }

  // TODO
}
