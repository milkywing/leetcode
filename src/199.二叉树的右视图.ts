/*
 * @lc app=leetcode.cn id=199 lang=typescript
 *
 * [199] 二叉树的右视图
 */

import { TreeNode } from './model/node';

// @lc code=start
/** 广度优先遍历，记录每层最后一个节点 */
function rightSideView(root: TreeNode | null): number[] {
  const result: number[] = [];
  if (!root) return result;

  const queue = [root];
  while (queue.length) {
    let curLevelNodeNum = queue.length;
    // 记录每层最后一个节点
    result.push(queue[curLevelNodeNum - 1].val);

    while (curLevelNodeNum--) {
      const curNode = queue.shift()!;
      if (curNode.left) queue.push(curNode.left);
      if (curNode.right) queue.push(curNode.right);
    }
  }

  return result;
}
// @lc code=end
