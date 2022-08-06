/*
 * @lc app=leetcode.cn id=235 lang=typescript
 * https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-search-tree/description/
 * [235] 二叉搜索树的最近公共祖先
 */

import { TreeNode } from './model/node';

// @lc code=start
/** 从上往下找到一个节点，使得 p 和 q 分别在该节点的两侧子树上 */
function lowestCommonAncestor(root: TreeNode, p: TreeNode, q: TreeNode): TreeNode {
  let curNode = root;

  // 让 root 和 p、q 做差，
  // 如果两个差都为负数/正数，说明 p、q 分布在 curNode 的同侧，继续搜索该侧
  while ((curNode.val - p.val) * (curNode.val - q.val) > 0) {
    curNode = p.val < curNode.val ? curNode.left! : curNode.right!;
  }

  return curNode;
}

/** 递归版本 */
const lowestCommonAncestorB = (root: TreeNode, p: TreeNode, q: TreeNode): TreeNode => {
  // 让 root 和 p、q 做差，
  // 如果一个值为正数，一个值为负数，说明 p、q 分布在 root 的两侧，root 就是目标节点，
  // 如果有一个值为 0，说明 root 肯定是 p/q，p、q互为子孙关系，root 就是目标节点
  if ((root.val - p.val) * (root.val - q.val) <= 0) return root;

  // 不满足上面的条件，说明 p、q 分布在 root 的同侧，继续搜索该侧
  return lowestCommonAncestorB(p.val < root.val ? root.left! : root.right!, p, q);
};
// @lc code=end
