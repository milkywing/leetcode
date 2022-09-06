/*
 * @lc app=leetcode.cn id=102 lang=typescript
 * https://leetcode.cn/problems/binary-tree-level-order-traversal/description/
 * [102] 二叉树的层序遍历
 */
// BINARYTREE

import { TreeNode } from './model/node';

// @lc code=start
/** 直接广度遍历 */
function levelOrder(root: TreeNode | null): number[][] {
  const result: number[][] = [];
  if (!root) return result;
  const queue = [root!];

  while (queue.length) {
    // 当前层的节点数
    const curLevelNodeNum = queue.length;
    // 当前层节点集
    const curLevelNodes: number[] = [];

    for (let i = 0; i < curLevelNodeNum; i++) {
      const current = queue.shift()!;
      curLevelNodes.push(current.val);
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
    // 结束一层遍历，将当前层节点集放入 result
    result.push(curLevelNodes);
  }

  return result;
}
// @lc code=end
