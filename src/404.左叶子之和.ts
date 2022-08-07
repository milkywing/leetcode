/*
 * @lc app=leetcode.cn id=404 lang=typescript
 * https://leetcode.cn/problems/sum-of-left-leaves/description/
 * [404] 左叶子之和
 */

import { TreeNode } from './model/node';

// @lc code=start
/** 广度优先遍历累加每层遇到的左叶子节点 */
function sumOfLeftLeaves(root: TreeNode): number {
  const queue = [root];
  let result = 0;

  while (queue.length) {
    let curLevelNodeNum = queue.length;

    while (curLevelNodeNum--) {
      const curNode = queue.shift()!;
      if (curNode.left) {
        // 在记录下层节点时，如果发现是左叶子节点，累加其和（叶子节点可以不推入队列，算是个优化）
        if (!curNode.left.left && !curNode.left.right) {
          result += curNode.left.val;
        } else {
          queue.push(curNode.left);
        }
      }
      if (curNode.right) queue.push(curNode.right);
    }
  }

  return result;
}
// @lc code=end
