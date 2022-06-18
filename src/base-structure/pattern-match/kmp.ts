/**
 * 【引导1】求一个字符串，最大公共前后缀的长度和对应子串（不包含整体），称他们为 maxMatchLength 和 maxMatchSubstring
 * 比如 abbabb 有最大匹配长度为3，此时前缀abb，后缀abb
 */

/**
 * 【引导2】求一个字符串序列中，每个字符前面字符串 maxMatchLength，以数组 nextArr 形式存储，
 * nextArr[i] 表示第 i 个字符的前面字符串的最大匹配长度，且规定 nextArr[0] = -1
 * 比如对于字符串序列 aabaab 有 nextArr = [-1, 0, 1, 0, 1, 2]
 */

/** 返回匹配起点，如果没找到，返回 -1 */
export const kmp = (string: string, pattern: string): number => {
  const stringLength = string.length;
  const patternLength = pattern.length;

  if (!stringLength || !patternLength || patternLength > stringLength) return -1;

  const nextArr = getNextArr(pattern);

  // p1 是遍历 string 的指针，p2 是遍历 pattern 的指针
  let [p1, p2] = [0, 0];
  while (p1 < stringLength && p2 < patternLength) {
    if (string[p1] === pattern[p2]) {
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

  // p2 越界，说明匹配成功，返回匹配起点，
  // p1 越界（p2没越界），说明匹配失败，返回 -1
  return p2 === patternLength ? p1 - p2 : -1;
};

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
