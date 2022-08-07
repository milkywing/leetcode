/*
 * @lc app=leetcode.cn id=297 lang=typescript
 * https://leetcode.cn/problems/serialize-and-deserialize-binary-tree/
 * [297] 二叉树的序列化与反序列化
 */

import { TreeNode } from './model/node';

// @lc code=start
/** 可以使用先序遍历 */
function serialize(root: TreeNode | null): string {
  // 节点之间使用逗号分隔，空节点使用N表示，非空节点用节点之表示
  if (!root) return 'N';
  return `${root.val},${serialize(root.left)},${serialize(root.right)}`;
}

function deserialize(data: string): TreeNode | null {
  const values = data.split(',');
  return deserializeCore(values);
}

const deserializeCore = (values: string[]): TreeNode | null => {
  const value = values.shift();
  if (value === 'N') return null;
  const node = new TreeNode(Number(value));
  node.left = deserializeCore(values);
  node.right = deserializeCore(values);
  return node;
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
// @lc code=end
