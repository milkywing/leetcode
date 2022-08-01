/*
 * @lc app=leetcode.cn id=6 lang=typescript
 * https://leetcode.cn/problems/zigzag-conversion/description/
 * [6] Z 字形变换
 */

// @lc code=start
function convert(s: string, numRows: number): string {
  const length = s.length;
  if (!length || numRows === 1 || length < numRows) return s;

  let result = '';

  // 周期
  const cycle = 2 * numRows - 2;

  for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
    let index = rowIndex;
    const frontIncrement = cycle - rowIndex * 2;
    const backIncrement = rowIndex * 2;
    result += s[index];

    // 如果是时第一行，backIncrement 为0，索引一直增加 frontIncrement 即可
    // 如果是最后一行，frontIncrement 为0，索引一直增加 backIncrement 即可
    // 如果是中间行，frontIncrement 和backIncrement都不为0，索引交替增加 frontIncrement 和 backIncrement
    while (index < length) {
      if (frontIncrement) {
        index += frontIncrement;
        result += s[index] ?? '';
      }
      if (backIncrement) {
        index += backIncrement;
        result += s[index] ?? '';
      }
    }
  }

  return result;
}
// @lc code=end
