/*
 * @lc app=leetcode.cn id=437 lang=typescript
 * https://leetcode.cn/problems/path-sum-iii/description/
 * [437] 路径总和 III
 */
// BINARYTREE

import { TreeNode } from './model/node';

// @lc code=start
/**
 * 方案A（本解）：双递归方案
 * 求一棵树上符合条件的路径，路径可以分成两种互斥的类型
 * 1. 路径包含根节点，
 * 2. 路径不包含根节点，转化为求左右子树上的路径，「递归求解」
 * 3. 两种路径数量的和即是当前树的路径数量
 *
 * 方案B：前缀和优化
 */

/** 「递归1」：求某棵树上的路径，不限制起点 */
function pathSum(root: TreeNode | null, targetSum: number): number {
  if (!root) return 0;
  // 路径数量包含根且从根开始
  let count = rootSum(root, targetSum);
  // 路径不包含根，相当于求左右子树上的路径
  count += pathSum(root.left, targetSum);
  count += pathSum(root.right, targetSum);
  return count;
}

// 「递归２」：求某棵树「从根节点」出发的路径数量，路径起点一定是根
const rootSum = (root: TreeNode | null, restSum: number): number => {
  if (!root) return 0;

  let count = 0;
  const val = root.val;

  // 如果当前节点值刚好等于剩余和，说明当前节点可以作为路径终点，数量加1
  if (val === restSum) count++;

  // 继续往左右子树扩展路径
  count += rootSum(root.left, restSum - val);
  count += rootSum(root.right, restSum - val);

  return count;
};

/** 建立前缀和及其出现次数的映射 */
const prefixSumCountMap = new Map<number, number>();

/**
 * 从跟节点 Root 出发到达 B，路径上所有节点的和，称为 B 的一个前缀和
 * 「特性」假设有一条路径 Root->...A...->B，B是当前遍历到的节点，如果 B 的前缀和与 A 的前缀和相差为 targetSum，则 A->B 路径和肯定是 targetSum，
 */
const pathSumB = (root: TreeNode | null, targetSum: number): number => {
  prefixSumCountMap.clear();
  // 初始时前缀和0对应一个路径
  prefixSumCountMap.set(0, 1);
  return pathSumBCore(root, targetSum, 0);
};

const pathSumBCore = (root: TreeNode | null, targetSum: number, curSum: number): number => {
  if (!root) return 0;

  let count = 0;
  // 当前节点的前缀和
  const newCurSum = curSum + root.val;

  // 以当前节点为终点，向上找起点 startPoint，能否组成路径，
  // 利用特性，等价于向上寻找前缀和为 newCurSum - targetSum 的起点，
  // 因为这块逻辑是先序遍历，所以这里符合条件的起点的数量是正确的
  count += prefixSumCountMap.get(newCurSum - targetSum) ?? 0;

  // 更新路径上当前节点前缀和的个数，为上面寻找寻找起点提供帮助
  prefixSumCountMap.set(newCurSum, (prefixSumCountMap.get(newCurSum) ?? 0) + 1);
  // 「重要」上面相当于在先序便利下操作

  // 进入下一层
  count += pathSumBCore(root.left, targetSum, newCurSum);
  count += pathSumBCore(root.right, targetSum, newCurSum);

  // 回到本层，恢复状态，去除当前节点的前缀和数量
  prefixSumCountMap.set(newCurSum, prefixSumCountMap.get(newCurSum)! - 1);

  return count;
};

// @lc code=end
