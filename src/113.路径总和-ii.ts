/*
 * @lc app=leetcode.cn id=113 lang=typescript
 *
 * [113] 路径总和 II
 */

import { TreeNode } from './model/node';

// @lc code=start
let result: number[][] = [];

function pathSum(root: TreeNode | null, targetSum: number): number[][] {
  result = [];
  pathSumCore(root, targetSum, []);
  return result;
}

const pathSumCore = (root: TreeNode | null, rest: number, path: number[]): void => {
  // 不能跑到空节点
  if (!root) return;
  // baseCase：到达叶子节点，剩下的路径刚好和节点值相等，说明找到一条路径
  if (!root.left && !root.right && rest === root.val) {
    result.push(path.concat(root.val));
    return;
  }

  if (root?.left) {
    path.push(root.val);
    pathSumCore(root.left, rest - root.val, path);
    path.pop();
  }
  if (root?.right) {
    path.push(root.val);
    pathSumCore(root.right, rest - root.val, path);
    path.pop();
  }
};
// @lc code=end
