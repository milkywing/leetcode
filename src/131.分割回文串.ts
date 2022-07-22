/*
 * @lc app=leetcode.cn id=131 lang=typescript
 *
 * [131] 分割回文串
 */

// @lc code=start
let result: string[][] = [];

function partition(s: string): string[][] {
  result = [];
  partitionCore(s, 0, []);
  return result;
}

const partitionCore = (str: string, index: number, combine: string[]) => {
  // 所有位置都考虑过了，生成一个组合
  if (index === str.length) {
    result.push([...combine]);
    return;
  }

  // 从 index 位置开始考虑选取 n 个字符作为一个区域（前提是这 n 个字符是回文的）
  for (let n = 1; index + n <= str.length; n++) {
    if (n === 1 || isPalindrome(str.slice(index, index + n))) {
      combine.push(str.slice(index, index + n));
      partitionCore(str, index + n, combine);
      combine.pop();
    }
  }
};

/** 判断回文 */
const isPalindrome = (s: string): boolean => {
  let [p1, p2] = [0, s.length - 1];

  while (p1 <= p2) {
    if (s[p1] !== s[p2]) return false;
    p1++;
    p2--;
  }

  return true;
};
// @lc code=end
