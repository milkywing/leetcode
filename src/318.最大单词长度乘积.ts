/*
 * @lc app=leetcode.cn id=318 lang=typescript
 *
 * [318] 最大单词长度乘积
 */

// @lc code=start
/** 把每个字符串按找字母的出现转换为二进制 bitMap，使用位来记载字母种类，字母对应的位置填 1，这样进行与运算即可知道是否有公共字母 */
function maxProduct(words: string[]): number {
  // 建立 bitMap 到其对应字符串最长长度的映射
  const map = new Map<number, number>();

  words.forEach((word) => {
    let bitNum = 0;
    const wordLength = word.length;
    // 将字符串转换为 bitMap
    for (let i = 0; i < wordLength; i++) {
      bitNum |= 1 << (word[i].charCodeAt(0) - 97);
    }
    // 如果 bitMap 不在 map 中，或者虽然 bitMap 在 map 中，但是现在的长度更长，更新当前 bitMap
    if (!map.has(bitNum) || map.get(bitNum)! < wordLength) map.set(bitNum, wordLength);
  });

  let result = 0;
  map.forEach((aLength, aBitNum) => {
    map.forEach((bLength, bBitNum) => {
      // 如果两个 bitMap 与为 0，说明对应的字符串无公共字符串，产生一个乘积并记录最大值
      if ((aBitNum & bBitNum) === 0) result = Math.max(result, aLength * bLength);
    });
  });

  return result;
}
// @lc code=end
