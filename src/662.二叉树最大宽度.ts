/*
 * @lc app=leetcode.cn id=662 lang=typescript
 * https://leetcode.cn/problems/maximum-width-of-binary-tree/description/
 * [662] 二叉树最大宽度
 */

import { TreeNode } from './model/node';

// @lc code=start
interface QueueItem {
  /** 节点 */
  node: TreeNode;
  /** 节点在二叉树的位置（从 0 开始） */
  position: number;
}

/**
 * A（可能导致整数溢出）: 参考完全二叉树的规则，对于位置 i 的节点，其左右子节点位置为 2i+1 和 2i+2，
 * 推荐B：人为设定对于位置 i 的节点，其左右子节点位置为 2i 和 2i+1，此时每层从左到右的节点顺序会成为从零开始的连续数字
 * 知道最左节点位置 pL 和最右节点位置 pR，即可得知本层宽度 pR - pL +1，在遍历每层的过程中记住最大宽度即可
 */
function widthOfBinaryTree(root: TreeNode | null): number {
  if (!root) return 0;

  const queue: QueueItem[] = [{ node: root, position: 0 }];
  let maxWidth = -Infinity;

  // 广度优先遍历
  while (queue.length) {
    // 【注意】：当一颗树不停的向右扩展时，位置会不停的指数增长，可能会造成溢出导致错误，
    // 因此这里使用剪枝，当某层只有一个节点时，可以认为接下来遍历一棵全新的树，将其 position 重置为 0
    if (queue.length === 1) queue[0].position = 0;

    // <-[]<- 此时队列里放的时本层要遍历的节点，在数组中第一个元素是最左节点，最后一个元素是最右节点，直接计算本层宽度
    maxWidth = Math.max(maxWidth, queue[queue.length - 1].position - queue[0].position + 1);

    // 开始遍历本层的所有节点
    // 注意，这里需要把本层节点数记录下来，因为下面在操作数组，不能直接使用 queue.length
    const curLevelNodeNum = queue.length;
    for (let i = 0; i < curLevelNodeNum; i++) {
      const { node, position } = queue.shift()!;
      if (node.left) queue.push({ node: node.left, position: position * 2 });
      if (node.right) queue.push({ node: node.right, position: position * 2 + 1 });
    }
  }

  return maxWidth;
}
// @lc code=end
