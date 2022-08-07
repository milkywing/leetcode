/*
 * @lc app=leetcode.cn id=315 lang=typescript
 * https://leetcode.cn/problems/count-of-smaller-numbers-after-self/description/
 * [315] 计算右侧小于当前元素的个数
 */

// @lc code=start
interface Item {
  /** 值 */
  value: number;
  /** 值对应原数组的下标 */
  index: number;
}

let result: number[];

/**
 * 方案A（本解）：归并排序过程中顺便求逆序对
 * 方案B：利用二叉树左节点小于头节点的特性，每个节点额外维护其左子树的节点数量，然后逐个插入数值（反序）构建二叉树
 */
function countSmaller(nums: number[]): number[] {
  const items: Item[] = nums.map((num, index) => ({
    index,
    value: num,
  }));
  result = Array(items.length).fill(0);

  mergeSort(items, 0, items.length);

  return result;
}

/** 对数组[left, right) 区间进行排序并返回 */
const mergeSort = (items: Item[], left: number, right: number): Item[] => {
  if (right - left <= 1) return items.slice(left, right);

  const mid = (left + right) >>> 1;
  const leftSorted = mergeSort(items, left, mid);
  const rightSorted = mergeSort(items, mid, right);

  return merge(leftSorted, rightSorted);
};

/** 降序排序，并顺便统计逆序对 */
const merge = (leftSorted: Item[], rightSorted: Item[]): Item[] => {
  const items: Item[] = [];

  // 双指针分别从头遍历两个数组
  let [p1, p2] = [0, 0];
  const [leftLength, rightLength] = [leftSorted.length, rightSorted.length];
  while (p1 < leftLength && p2 < rightLength) {
    // 相等时优先取右侧的（确保能正确统计更小个数）
    if (leftSorted[p1].value <= rightSorted[p2].value) {
      items.push(rightSorted[p2]);
      p2++;
    } else {
      // 左数组当前值大于右数组当前值，可以为左数组当前值对应的 result 累加一次右数组剩余未遍历数量（比左数组当前值小的个数）
      result[leftSorted[p1].index] += rightLength - p2;
      items.push(leftSorted[p1]);
      p1++;
    }
  }

  // 把未遍历的值放进去
  items.push(...leftSorted.slice(p1), ...rightSorted.slice(p2));
  return items;
};
// @lc code=end
