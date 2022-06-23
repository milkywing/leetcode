/*
 * @lc app=leetcode.cn id=230 lang=typescript
 *
 * [230] 二叉搜索树中第K小的元素
 */

import { TreeNode } from './model/node';

// @lc code=start
/** 中序遍历可得到升序序列，取序列第 k 个数即可 */
function kthSmallest(root: TreeNode | null, k: number): number {
  const stack: TreeNode[] = [];
  let p: TreeNode | null = root;
  let count = 1;

  // 核心：按左边界分解树
  while (p || stack.length) {
    if (p) {
      // 把当前节点压栈，只要当前节点有左孩子，就一直将左孩子压栈（左边界入栈）
      stack.push(p);
      p = p.left;
    } else {
      // 左边界到头了，开始弹出并处理节点，对该节点的右孩子（右树）重复上述逻辑
      p = stack.pop()!;
      // 去第 k 个数
      if (count === k) {
        return p.val;
      }
      count++;
      p = p.right;
    }
  }
}
// @lc code=end
