/*
 * @lc app=leetcode.cn id=486 lang=typescript
 *
 * [486] 预测赢家
 */

// @lc code=start
function PredictTheWinner(nums: number[]): boolean {
  const length = nums.length;
  const dp: number[][] = new Array(length).fill(0).map(() => new Array(length).fill(0));
  for (let i = 0; i < length; i++) {
    dp[i][i] = nums[i];
  }
  /**
   * dp[i][j] 表示作为先手，在区间 nums[i..j] 里进行选择后相对于与后手的净胜分：
   * 玩家A先手面对区间[i...j]时：
   * 1.如果拿nums[i]，那么变成玩家B先手面对区间[i+1...j]，这段区间内玩家B对玩家A的净胜分为dp[i+1][j]；那么玩家A对玩家B的净胜分就应该是nums[i] - dp[i+1][j]。
   * 2.如果拿nums[j]，同理可得玩家A对玩家B的净胜分为是nums[j] - dp[i][j-1]。
   * 3.先手想赢对方，所以要维持最大优势，以上两种情况二者取大即可。
   *
   * 最终求的就是，先手面对区间[0...n-1]时，相对于后手的净胜分dp[0][n-1]是否>=0。
   */

  for (let i = length - 2; i >= 0; i--) {
    for (let j = i + 1; j < length; j++) {
      dp[i][j] = Math.max(nums[i] - dp[i + 1][j], nums[j] - dp[i][j - 1]);
    }
  }

  return dp[0][length - 1] >= 0;
}

/** 递归方案 */
function PredictTheWinnerRecur(nums: number[]): boolean {
  return firstTake(nums, 0, nums.length - 1) >= secondTake(nums, 0, nums.length - 1);
}

/** 先手函数，对[left, right]区间内的值做选择，拿走left/right位置上的值 */
const firstTake = (nums: number[], left: number, right: number): number => {
  // 当前轮次只有一个值，先手只能直接拿走
  if (left === right) return nums[left];

  // 因为先手是聪明的，所以要选取最大的
  return Math.max(nums[left] + secondTake(nums, left + 1, right), nums[right] + secondTake(nums, left, right - 1));
};

/** 后手函数 */
const secondTake = (nums: number[], left: number, right: number): number => {
  // 当前轮次只有一个值，先手拿了，后手什么都没有
  if (left === right) return 0;

  // 因为先手的聪明，所以肯定回给后手最差的情况，所以要后手要选择没那么差的那个
  return Math.min(firstTake(nums, left, right - 1), firstTake(nums, left + 1, right));
};
// @lc code=end
