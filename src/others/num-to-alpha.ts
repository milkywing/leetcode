/**
 * 有映射关系1-a，2-b...26-z，给定一个数字字符串，求能对应出多少种字母字符串。
 * 如 111 可以对应 aaa、ka 两种
 */

export const numToAlpha = (numString: string): number => {
  return numToAlphaCore(numString, 0);
};

/**
 * 从左到右尝试递归，[0..index-1] 区域已做出选择，现在对 index 位置做出选择，决定是是将 index 单独对应还是将 index、index+1 一起对应
 */
const numToAlphaCore = (str: string, index: number): number => {
  if (index === str.length) return 1;

  // index 单独对应，如果遇到 0，无效对应提前返回
  if (str[index] === '0') return 0;
  // index 单独对应
  let count = numToAlphaCore(str, index + 1);

  // 如果 index 后面还有字符，考虑是否能把 index、index+1 一起对应
  if (index === str.length - 1) return count;
  if (parseInt(str.substring(index, index + 2), 10) <= 26) {
    count += numToAlphaCore(str, index + 2);
  }

  return count;
};
