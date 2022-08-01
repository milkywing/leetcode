/*
 * @lc app=leetcode.cn id=11 lang=typescript
 * https://leetcode.cn/problems/container-with-most-water/
 * [11] 盛最多水的容器
 */

// @lc code=start
/**
 * 双指针贪心解法：
 * 容量大小 = 两端短板 * 两端距离。现使用左右指针从两边逼近，记录过程中的最大容量即可，
 * 无论左右指针怎么移动，都会导致两端距离缩短；
 * 1. 如果让长板向内移动，移动后的短板只会不变或者变得更小，容量肯定会更小；
 * 2. 如果让短板向内移动，移动后的短板可能不变，可能更小，【但也有可能更大】，容量有变大的可能；
 * 因此选择让短板向内移动，记录可能的最大值
 */
function maxArea(height: number[]): number {
  let [left, right] = [0, height.length - 1];
  let result = 0;

  while (left < right) {
    // 更新最大容量
    result = Math.max(result, Math.min(height[left], height[right]) * (right - left));
    // 让短板向内移动
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return result;
}
// @lc code=end
