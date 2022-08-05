/*
 * @lc app=leetcode.cn id=99 lang=typescript
 * https://leetcode.cn/problems/recover-binary-search-tree/description/
 * [99] 恢复二叉搜索树
 */

import { TreeNode } from './model/node';

// @lc code=start
/**
 * 二叉搜索树交换了两个值，在中序遍历中会体现为存在一个/两个位置，出现前值大于后值破坏有序性的情况：
 * 1. 如果有一个位置：出现 a > b 破坏有序性，交换 a 和 b 节点的值即可，
 * 2. 如果有两个位置：先出现 a > b，后出现 b > a 破坏有序性，找到这两个 a 节点然后交换值即可,
 */
function recoverTree(root: TreeNode | null): void {
  if (!root) return;

  const stack: TreeNode[] = [];
  let prevNode: TreeNode | null = null;
  let p: TreeNode | null = root;

  // 存储破坏有序性的节点对
  const targetPairs: TreeNode[][] = [];

  // 中序遍历
  while (p || stack.length) {
    if (p) {
      stack.push(p);
      p = p.left;
    } else {
      p = stack.pop()!;
      // 把破坏有序性的节点对保存起来
      if (prevNode && prevNode.val > p.val) {
        targetPairs.push([prevNode, p]);
        if (targetPairs.length === 2) {
          break;
        }
      }
      prevNode = p;
      p = p.right;
    }
  }

  if (targetPairs.length === 1) {
    // 只有一对节点，直接交换两个节点的值
    const pair = targetPairs[0];
    [pair[0].val, pair[1].val] = [pair[1].val, pair[0].val];
  } else if (targetPairs.length === 2) {
    // 有两对节点，交换第一对的前节点的值和第二对的后节点的值
    const [pair1, pair2] = targetPairs;
    [pair1[0].val, pair2[1].val] = [pair2[1].val, pair1[0].val];
  }
}
// @lc code=end
