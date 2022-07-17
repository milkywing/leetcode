/*
 * @lc app=leetcode.cn id=260 lang=typescript
 *
 * [260] 只出现一次的数字 III
 */

// @lc code=start

/**
 * 假设目标数为 a、b，将所有数异或起来将得到 a^b，此时再想办法得到 a/b 即可，
 * 由于异或得特性，取 a^b 中的最低位 1，肯定是属于 a/b 的一方，可以利用这个信息锁定一组带 a/b 的数，这些数异或起来就会得到 a/b
 */
function singleNumber(nums: number[]): number[] {
  // 将所有数异或起来将得到 a^b
  let aXORb = 0;
  nums.forEach((num) => {
    aXORb ^= num;
  });
  // 获取 a^b 的最低位 1
  const lowestOne = aXORb & -aXORb;

  // 想办法得到 a/b
  let aOrb = 0;
  nums.forEach((num) => {
    // 锁定最低位 1 进行异或
    if (num & lowestOne) aOrb ^= num;
  });

  // 其中一个数
  const one = aXORb ^ aOrb;

  return [one, one ^ aXORb];
}
// @lc code=end
