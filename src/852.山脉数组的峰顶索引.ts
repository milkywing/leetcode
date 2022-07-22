/*
 * @lc app=leetcode.cn id=852 lang=typescript
 *
 * [852] 山脉数组的峰顶索引
 */

// @lc code=start
/** 参考【162.寻找峰值】，相同解法 */
function peakIndexInMountainArray(arr: number[]): number {
  let [left, right] = [0, arr.length - 1];

  while (left < right) {
    const mid = (left + right) >> 1;
    if (arr[mid] > arr[mid + 1]) {
      // [mid,mid+1]是单调下降，说明 mid 左侧（包含mid）肯定有峰值，在左半部分搜索
      right = mid;
    } else {
      // [mid,mid+1]是单调上升，说明 mid+1 右侧（含mid+1）肯定有峰值，在右半部分搜索
      left = mid + 1;
    }
  }

  return right;
}
// @lc code=end
