/*
 * @lc app=leetcode.cn id=103 lang=typescript
 *
 * [103] 二叉树的锯齿形层序遍历
 */

import { TreeNode } from './model/node';

// @lc code=start

/** 深度遍历，使用一个队列存储每层的值，根据层数决定节点入队方向 */
function zigzagLevelOrder(root: TreeNode | null): number[][] {
  const result: number[][] = [];
  if (!root) return [];

  const queue = [root];
  let level = 0;

  while (queue.length) {
    // 当前层的节点数
    const curLevelNodeNum = queue.length;
    // 使用一个队列存储每层的值
    const levelValues: number[] = [];

    level++;
    for (let i = 0; i < curLevelNodeNum; i++) {
      const current = queue.shift()!;

      // 根据层数决定节点入队方向
      if (level % 2) {
        levelValues.push(current.val);
      } else {
        levelValues.unshift(current.val);
      }

      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
    result.push(levelValues);
  }

  return result;
}
// @lc code=end
