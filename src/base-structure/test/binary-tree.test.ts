import { expect } from 'chai';
import { createBinaryTreeNode, insertLeft, insertRight } from '../model/node';
import {
  BFSTraverseBinaryTree,
  inOrderTraverseBinaryTree,
  morrisTraverseBinaryTree,
  postOrderTraverseBinaryTree,
  postOrderTraverseBinaryTreeWithTwoStack,
  preOrderTraverseBinaryTree,
  traverseBinaryTree,
  TraverseOrder,
} from '../tree/binary-tree';

const tree = createBinaryTreeNode(1);
const left = insertLeft(tree, 2);
const right = insertRight(tree, 3);
insertLeft(left, 4);
insertRight(left, 5);
insertLeft(right, 6);
insertRight(right, 7);

const preOrders: number[] = [];
const inOrders: number[] = [];
const postOrders: number[] = [];
traverseBinaryTree(tree, (node) => preOrders.push(node.value), TraverseOrder.PreOrder);
traverseBinaryTree(tree, (node) => inOrders.push(node.value), TraverseOrder.InOrder);
traverseBinaryTree(tree, (node) => postOrders.push(node.value), TraverseOrder.PostOrder);

describe('二叉树遍历', () => {
  it('先序遍历', () => {
    const result: number[] = [];
    preOrderTraverseBinaryTree(tree, (node) => result.push(node.value));
    expect(result).to.deep.equal(preOrders);
  });

  it('中序遍历', () => {
    const result: number[] = [];
    inOrderTraverseBinaryTree(tree, (node) => result.push(node.value));
    expect(result).to.deep.equal(inOrders);
  });

  it('后序遍历', () => {
    const result: number[] = [];
    postOrderTraverseBinaryTree(tree, (node) => result.push(node.value));
    expect(result).to.deep.equal(postOrders);
  });

  it('后序遍历（双栈实现）', () => {
    const result: number[] = [];
    postOrderTraverseBinaryTreeWithTwoStack(tree, (node) => result.push(node.value));
    expect(result).to.deep.equal(postOrders);
  });

  it('广度优先遍历', () => {
    const result: number[] = [];
    BFSTraverseBinaryTree(tree, (node) => result.push(node.value));
    expect(result).to.deep.equal([1, 2, 3, 4, 5, 6, 7]);
  });

  it('morris先序遍历', () => {
    const result: number[] = [];
    morrisTraverseBinaryTree(tree, (node) => result.push(node.value), TraverseOrder.PreOrder);
    expect(result).to.deep.equal(preOrders);
  });

  it('morris中序遍历', () => {
    const result: number[] = [];
    morrisTraverseBinaryTree(tree, (node) => result.push(node.value), TraverseOrder.InOrder);
    expect(result).to.deep.equal(inOrders);
  });
});
