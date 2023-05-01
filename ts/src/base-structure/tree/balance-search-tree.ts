// TODO
// interface BSTNode<K = number, V = number> {
//   /** 节点唯一key */
//   key: K;
//   /** 节点携带值 */
//   value: V;
//   /** 左孩子 */
//   left: BSTNode<K, V> | null;
//   /** 右孩子 */
//   right: BSTNode<K, V> | null;
//   /** 父节点 */
//   parent: BSTNode<K, V> | null;
//   /** 以该节点为头的子树高度 */
//   height: number;
// }

// abstract class BalanceSearchTree<K = number, V = number> {
//   protected root: BSTNode<K, V> | null = null;

//   protected treeSize = 0;

//   // eslint-disable-next-line class-methods-use-this
//   protected compare: (a: K, b: K) => number = (a: unknown, b: unknown) => {
//     if (typeof a === 'number' && typeof b === 'number') {
//       return a - b;
//     }
//     throw Error('非基础类型请提供比较器');
//   };

//   public get size(): number {
//     return this.treeSize;
//   }

//   /** 增/改 */
//   public abstract put(key: K, value: V): void;

//   /** 删 */
//   public abstract remove(key: K): void;

//   /** 查 */
//   public abstract get(key: K): V | null;

//   /** 插入节点 */
//   public abstract insertNode(node: BSTNode<K, V>): void;

//   /** 删除节点 */
//   public abstract deleteNode(node: BSTNode<K, V>): void;
// }

/**
 * AVL：破坏平衡性四种情况
 * 1.LL（左孩子左边过长），对头节点执右旋，左孩子成为新头
 * 2.LR（左孩子的右边过长），先对左孩子进行左旋，再对头进行右旋，左孩子的右孩子成为新头
 * 3.RR（右孩子右边过长），对头节点执左旋，右孩子成为新头
 * 4.RL（右孩子的左边过长），先对右孩子进行右旋，再对头进行左旋，右孩子的左孩子成为新头
 */
// export class AVLTree<K = number, V = number> extends BalanceSearchTree<K, V> {
//   constructor(compare?: (a: K, b: K) => number) {
//     super();
//     if (compare) {
//       this.compare = compare;
//     }
//   }

//   /** 左旋操作，右孩子成为新头。在右孩子的右边过长时调用，使新的左子树高度加一 */
//   private static leftRotate(node: BSTNode): BSTNode {
//     const rightSon = node.right!;
//     node.right = rightSon.left;
//     rightSon.left = node;
//     // 原左子树没有变化，原根节点和原右孩子需要更新高度
//     AVLTree.updateHeight(node);
//     AVLTree.updateHeight(rightSon);

//     return rightSon;
//   }

//   /** 右旋操作，左孩子成为新头。在左孩子的左边过长时调用，使新的右子树高度加一  */
//   private static rightRotate(node: BSTNode): BSTNode {
//     const leftSon = node.left!;
//     node.left = leftSon.right;
//     leftSon.right = node;
//     // 原右子树没有变化，原根节点和原左孩子需要更新高度
//     AVLTree.updateHeight(node);
//     AVLTree.updateHeight(leftSon);

//     return leftSon;
//   }

//   /** 更新节点对应子树的高度 */
//   private static updateHeight(node: BSTNode): void {
//     node.height = Math.max(AVLTree.getHeight(node.left), AVLTree.getHeight(node.right)) + 1;
//   }

//   /** 获取节点对应子树的高度 */
//   private static getHeight(node: BSTNode | null): number {
//     return node?.height ?? 0;
//   }

//   /** 维持节点对应子树的平衡性 */
//   private static maintain(node: BSTNode): BSTNode {
//     const leftHeight = AVLTree.getHeight(node.left);
//     const rightHeight = AVLTree.getHeight(node.right);

//     if (Math.abs(leftHeight - rightHeight) > 1) {
//       // 当前树失衡了，需要调整
//       if (leftHeight > rightHeight) {
//         // 左子树过长导致的失衡，继续细分判断是左子树左边过长还是右边过长导致的
//         const leftLeftHeight = AVLTree.getHeight(node.left!.left);
//         const leftRightHeight = AVLTree.getHeight(node.left!.right);

//         if (leftLeftHeight >= leftRightHeight) {
//           // LL（左孩子左边过长），对头节点执右旋，左孩子成为新头
//           node = AVLTree.rightRotate(node);
//         } else {
//           // LR（左孩子的右边过长），先对左孩子进行左旋，再对头进行右旋，左孩子的右孩子成为新头
//           node.left = AVLTree.leftRotate(node.left!);
//           node = AVLTree.rightRotate(node);
//         }
//       } else {
//         // 右子树过长导致的失衡，继续细分判断是右子树左边过长还是右边过长导致的
//         const rightLeftHeight = AVLTree.getHeight(node.right!.left);
//         const rightRightHeight = AVLTree.getHeight(node.right!.right);

//         if (rightRightHeight >= rightLeftHeight) {
//           // RR（右孩子右边过长），对头节点执左旋，右孩子成为新头
//           node = AVLTree.leftRotate(node);
//         } else {
//           // RL（右孩子的左边过长），先对右孩子进行右旋，再对头进行左旋，右孩子的左孩子成为新头
//           node.right = AVLTree.rightRotate(node.right!);
//           node = AVLTree.leftRotate(node);
//         }
//       }
//     }

//     return node;
//   }
// }
