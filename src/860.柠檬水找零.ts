/*
 * @lc app=leetcode.cn id=860 lang=typescript
 *
 * [860] 柠檬水找零
 */

// @lc code=start
/** 需要找零的可能有 5（5）、15（优先10+5/次之5+5+5），我们记录当前拥有的 5 的个数和 10 的个数，如果需要找零的时候个数不够用，说明不行 */
function lemonadeChange(bills: number[]): boolean {
  let [fiveNum, tenNum] = [0, 0];

  // eslint-disable-next-line no-restricted-syntax
  for (const bill of bills) {
    switch (bill) {
      case 5:
        fiveNum++;
        break;
      case 10:
        fiveNum--;
        tenNum++;
        break;
      case 20:
        if (tenNum > 0 && fiveNum > 0) {
          tenNum--;
          fiveNum--;
        } else {
          fiveNum -= 3;
        }
        break;
      default:
        break;
    }
    if (fiveNum < 0 || tenNum < 0) return false;
  }

  return true;
}
// @lc code=end
