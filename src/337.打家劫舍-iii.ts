/*
 * @lc app=leetcode.cn id=337 lang=typescript
 * https://leetcode.cn/problems/house-robber-iii/description/
 * [337] 打家劫舍 III
 */

import { TreeNode } from './model/node';

// @lc code=start
/**
 * 方案A（本解）：让每个节点一次计算保存两个值，一个是偷该节点时的最大收益，一个是不偷该节点时的最大收益，减少递归次数
 * 方案B：树形DP（容易超时）
 */
function rob(root: TreeNode | null): number {
  return Math.max(...robCore(root));
}

/**
 * 函数表示对于 root 为头的子树，返回两个值，一个是偷头节点时的最大收益，一个是不偷头节点时的最大收益
 */
const robCore = (root: TreeNode | null): number[] => {
  if (!root) return [0, 0];

  const [leftTake, leftNotTake] = robCore(root.left);
  const [rightTake, rightNotTake] = robCore(root.right);

  return [
    // 如果偷头节点，最大收益 = 头节点值 + 左孩子不偷自己的最大收益 + 右孩子不偷自己的最大收益
    root.val + leftNotTake + rightNotTake,
    // 如果不偷偷节点，最大收益 = 左孩子偷/不偷自己的最大收益 + 右孩子偷/不偷自己的最大收益
    Math.max(leftTake, leftNotTake) + Math.max(rightTake, rightNotTake),
  ];
};

const robB = (root: TreeNode | null): number => {
  if (!root) return 0;

  // 选择偷头节点，下次只能隔一个节点开始偷
  let moneyWhenTakeRoot = root.val;
  if (root.left) {
    moneyWhenTakeRoot += rob(root.left.left) + rob(root.left.right);
  }
  if (root.right) {
    moneyWhenTakeRoot += rob(root.right.left) + rob(root.right.right);
  }

  // 选择不偷头节点，可以直接从子节点开始偷
  const moneyWhenNotTakeRoot = rob(root.left) + rob(root.right);

  return Math.max(moneyWhenNotTakeRoot, moneyWhenTakeRoot);
};
// @lc code=end
