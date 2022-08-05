/*
 * @lc app=leetcode.cn id=111 lang=typescript
 * https://leetcode.cn/problems/minimum-depth-of-binary-tree/description/
 * [111] 二叉树的最小深度
 */

import { TreeNode } from './model/node';

// @lc code=start
/**
 * 求跟节点出发到叶子节点路径中长度最短的，返回最短长度
 * 方案A：分解子问题递归深度遍历
 * 方案B（本解）：广度优先遍历，记录当前层数，遇到第一个叶子节点返回层数
 */
function minDepth(root: TreeNode | null): number {
  // 处理空节点
  if (!root) return 0;

  const queue = [root];
  // 记录当前遍历层数
  let level = 0;

  while (queue.length) {
    // 当前层的节点数
    const curLevelNodeNum = queue.length;
    level++;

    for (let i = 0; i < curLevelNodeNum; i++) {
      const current = queue.shift()!;
      if (!current.left && !current.right) return level;
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
  }

  return level;
}

/** 递归深度遍历解法 */
const minDepth2 = (root: TreeNode | null): number => {
  // 处理空节点
  if (!root) return 0;

  const left = minDepth(root.left);
  const right = minDepth(root.right);

  // 当任意一个子树为空时，返回另一个子树的深度加1
  if (!root.left) return right + 1;
  if (!root.right) return left + 1;

  // 两个子树都不为空时，选小的那个加1
  return Math.min(left, right) + 1;
};
// @lc code=end
