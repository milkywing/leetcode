/*
 * @lc app=leetcode.cn id=28 lang=typescript
 * https://leetcode.cn/problems/implement-strstr/description/
 * [28] 实现 strStr()
 */

// @lc code=start
/** kmp 算法实现，可以参考 kmp.ts */
function strStr(haystack: string, needle: string): number {
  const [haystackLength, needleLength] = [haystack.length, needle.length];
  if (!needleLength) return 0;
  if (!haystackLength || haystackLength < needleLength) return -1;

  const nextArr = getNextArr(needle);
  let [p1, p2] = [0, 0];

  // p1 是遍历 string 的指针，p2 是遍历 pattern 的指针
  while (p1 < haystackLength && p2 < needleLength) {
    if (haystack[p1] === needle[p2]) {
      // 当前字符匹配成功，两个共同前进
      p1++;
      p2++;
      // 下面是当前字符不匹配的情况
    } else if (nextArr[p2] !== -1) {
      // p2 跳回到 [0...p2-1] 区域最大公共前后缀中前缀的下一个位置（nextArr[p2] 的位置）
      p2 = nextArr[p2];
    } else {
      // p2 已经跳到头了，没得跳了，说明 [0...p1-1] 区域开始肯定是匹配不出 pattern 的，只能 p1 前进
      p1++;
    }
  }

  return p2 === needleLength ? p1 - needleLength : -1;
}

/** 构造 nextArr */
const getNextArr = (pattern: string): number[] => {
  const patternLength = pattern.length;
  if (patternLength === 1) return [-1];
  const nextArr: number[] = [-1, 0];

  // 当前需要计算 nextArr[arrIndex] 的值
  let arrIndex = 2;
  // charIndex两个作用：
  // 1.当前要和 pattern[arrIndex-1] 对比的字符位置
  // 2.在对比失败时，通过 nextArr[charIndex] 跳到新的前一个位置
  // charIndex 初始值为 nextArr[arrIndex-1]，即为 0
  let charIndex = 0;

  // 目标是填完整个 nextArr：
  // 要计算 nextArr[arrIndex] 的值，一开始需要利用 nextArr[arrIndex-1]（这里使用了 charIndex 来承载），
  // 从最大前缀的下一个位置开始对比，对比失败就往前找，利用 nextArr[charIndex]，从新的最大前缀的下一个位置开始对比。
  // 重复对比和寻找的操作，直到对比成功或者寻找到头都没有对比成功，此时可确定 nextArr[arrIndex] 的值
  while (arrIndex < patternLength) {
    if (pattern[arrIndex - 1] === pattern[charIndex]) {
      // 对比成功，赋值为当前最大前缀长度 + 1，前进
      nextArr[arrIndex] = charIndex + 1;
      arrIndex++;
      charIndex++;
    } else if (charIndex > 0) {
      // 对比失败，charIndex 往前跳，重复上面的对比逻辑
      charIndex = nextArr[charIndex];
    } else {
      // 已经跳到头了都没有对比成功，说明字符串 [0...arrIndex-1] 区域无公共前后缀，赋值为 0，前进
      nextArr[arrIndex] = 0;
      arrIndex++;
    }
  }

  return nextArr;
};
// @lc code=end
