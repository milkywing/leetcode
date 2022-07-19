/*
 * @lc app=leetcode.cn id=93 lang=typescript
 *
 * [93] 复原 IP 地址
 */

// @lc code=start
let result: string[] = [];
function restoreIpAddresses(s: string): string[] {
  result = [];
  const length = s.length;
  if (length < 4 || length > 12) return result;
  restoreIpAddressesCore(s, 0, 4, []);

  return result;
}

const restoreIpAddressesCore = (str: string, index: number, restAreaNum: number, combine: string[]): void => {
  if (restAreaNum === 0) {
    // baseCase1：如果4个区域确定后，index也来到了最后的位置，说明生成一个组合
    if (index === str.length) result.push(combine.join('.'));
    // baseCase2：如果4个区域确定后还有剩余字符，说明这是一个非法划分，舍弃
    return;
  }

  // 为当前区域选择若干个字符组成数字
  if (str[index] === '0') {
    // 如果当前区域遇到前导0，该区域只能单独成数
    combine.push('0');
    restoreIpAddressesCore(str, index + 1, restAreaNum - 1, combine);
    combine.pop();
  } else {
    // 没有前导0，在不超过255的情况下可以选取1-3个字符组成数字

    // 选1个字符
    combine.push(str[index]);
    restoreIpAddressesCore(str, index + 1, restAreaNum - 1, combine);
    combine.pop();

    // 选2个字符
    if (index + 2 <= str.length) {
      combine.push(str.slice(index, index + 2));
      restoreIpAddressesCore(str, index + 2, restAreaNum - 1, combine);
      combine.pop();
    }

    // 选3个字符，需要判断是否会超过255
    if (index + 3 <= str.length && parseInt(str.slice(index, index + 3), 10) <= 255) {
      combine.push(str.slice(index, index + 3));
      restoreIpAddressesCore(str, index + 3, restAreaNum - 1, combine);
      combine.pop();
    }
  }
};
// @lc code=end
