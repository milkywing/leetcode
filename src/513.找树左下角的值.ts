/*
 * @lc app=leetcode.cn id=513 lang=typescript
 * https://leetcode.cn/problems/find-bottom-left-tree-value/description/
 * [513] 找树左下角的值
 */

import { TreeNode } from './model/node';

// @lc code=start

/** 广度优先遍历，记录每一层的第一个节点 */
function findBottomLeftValue(root: TreeNode): number {
  const queue = [root];
  let result = root.val;

  while (queue.length) {
    let curLevelNodeNum = queue.length;
    result = queue[0].val;
    while (curLevelNodeNum--) {
      const curNode = queue.shift()!;
      if (curNode.left) queue.push(curNode.left);
      if (curNode.right) queue.push(curNode.right);
    }
  }

  return result;
}
// @lc code=end
