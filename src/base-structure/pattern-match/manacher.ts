/**
 * 【引导1】在原字符串的头尾和字符间隔中插入占位符，使得原字符串无论长度是奇偶，插入后都会变成奇数长度，可以放心使用中心扩展法
 * 比如 abbc => #a#b#b#c#
 */

/**
 * 【引导2】求字符串每个位置为中心扩展的最长回文子串，记录其回文半径，以回文半径数组 rArr 形式记录，
 * rArr[i] 表示以 i 个字符为中心的最长回文子串的回文半径，
 * 比如对于字符串 #b#a#b# 有 rArr = [1, 2, 1, 4, 1, 2, 1]
 */

/**
 * 【引导3】在遍历字符串时，记录一个最大回文右边界位置 rightBoundary，及对应回文的中心位置 center，
 * 比如对于字符串 #b#a#b# 有 rightBoundary = 6，center = 3
 */

/**
 * 【引导4】在计算 rArr[i] 考虑两大情况（图示中，中括号为最大回文左右边界，小括号为 i 的回文边界，C 为对应回文中心，i' 为 i 关于 C 的对称点）：
 * 1. i 在 rightBoundary 外（i > rightBoundary），此时需要对 i 位置进行中心扩展求 rArr[i]，图示 [    C    ]  i
 * 2. i 在 rightBoundary 内（i <= rightBoundary）分三种情况
 *  2.1 i' 回文边界在在 C 回文边界内，此时直接得到 rArr[i] = rArr[i']，图示 [ (i')  C  (i) ]
 *  2.2 i' 回文边界超出了 C 回文边界，此时直接得到 rArr[i] = R - i + 1，图示 ( [ i')  C   i ]
 *  2.3 i' 回文边界和 C 回文边界重合，此时需要在 rArr[i] = R - i + 1 的基础上以 i 为中心继续扩展尝试得到更大的半径，图示 【 i')  C  i ]
 */

/** 求字符串的最长回文子串 */
export const manacher = (s: string): number => {
  const stringLength = s.length;
  if (stringLength < 2) return stringLength;

  // 字符填充
  const str = `#${s.split('').join('#')}#`;
  // 回文半径数组
  const rArr = new Array(str.length);
  // 最大回文右边界的下一个位置及对应中心位置
  let [rightBoundaryNext, center] = [-1, -1];
  // 最长回文子串长度
  let maxLen = -Infinity;

  // 求每个位置的回文半径
  for (let i = 0; i < str.length; i++) {
    // 【根据大情况2】首先先计算 i 位置的回文半径下限
    rArr[i] = rightBoundaryNext > i ? Math.min(rArr[2 * center - i], rightBoundaryNext - i) : 1;

    // 为情况 1 和情况 2.3 继续扩展，其他情况不会进入该逻辑
    while (i + rArr[i] < str.length && i - rArr[i] >= 0 && str[i + rArr[i]] === str[i - rArr[i]]) {
      rArr[i]++;
    }
    // 更新 rightBoundaryNext 及对应中心位置
    if (i + rArr[i] > rightBoundaryNext) {
      rightBoundaryNext = i + rArr[i];
      center = i;
    }
    maxLen = Math.max(maxLen, rArr[i]);
  }

  // 因为字符串填充了两端的 #，所以最长回文子串的长度为 maxLen - 1
  return maxLen - 1;
};
