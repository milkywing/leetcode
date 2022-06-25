/*
 * @lc app=leetcode.cn id=532 lang=typescript
 *
 * [532] 数组中的 k-diff 数对
 */

// @lc code=start
/**
 * 方案A（本解）：利用 Map 实现去重和计数，遍历 Map key，当 k!==0 时，时检查 key + k 是否在 Map key 中；当 k===0 时，遍历时检查 key 对应的 value 是否大于 1
 * 方案B：排序后使用双指针组成窗口，检查窗口最右侧值是否为最左侧值 + k
 */
function findPairs(nums: number[], k: number): number {
  const map = new Map<number, number>();
  let count = 0;

  nums.forEach((num) => {
    if (map.has(num)) {
      map.set(num, map.get(num)! + 1);
    } else {
      map.set(num, 1);
    }
  });

  map.forEach((value, key) => {
    if (k !== 0 && map.has(key + k)) {
      count++;
    } else if (k === 0 && value > 1) {
      count++;
    }
  });

  return count;
}

const findPairs2 = (nums: number[], k: number): number => {
  const length = nums.length;
  if (length < 2) return 0;

  nums.sort((a, b) => a - b);
  let [left, right] = [0, 0];
  let count = 0;

  // 窗口两侧到头时终止
  while (left < length) {
    // 让左指针跳过重复值，每次停在重复值的第一个数
    if (nums[left] === nums[left - 1]) {
      left++;
      continue;
    }
    // 指针向右移确保左指针不超过右指针，然后右指针向继续右移寻找目标值
    while (right < nums.length && (right <= left || nums[right] < nums[left] + k)) {
      right++;
    }

    // 右指针越界终止
    if (right >= nums.length) break;

    // 查看右指针是否为目标值
    if (nums[right] === nums[left] + k) {
      count++;
    }
    left++;
  }

  return count;
};
// @lc code=end
