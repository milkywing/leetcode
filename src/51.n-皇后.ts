/*
 * @lc app=leetcode.cn id=51 lang=typescript
 *
 * [51] N 皇后
 */

// @lc code=start
function solveNQueens(n: number): string[][] {
  // 最大支持32皇后问题
  if (n < 1 || n > 32) return [];
  // 用于限制位运算的范围，生成低 n 位全是1，高位全是 0 的二进制数
  const limit = (1 << n) - 1;
  // 题目要求返回结果
  const results: string[][] = [];
  /** 可能的一个放法 */
  const oneCase: string[] = Array(n);

  // 开始放置皇后，一开始没有任何限制
  core({ n, limit, results, oneCase }, { colLimit: 0, leftDiagLimit: 0, rightDiagLimit: 0 });

  return results;
}

/** 透传参数 */
interface PassThrough {
  /** n 皇后 */
  n: number;
  /** 用于限制位运算的范围，生成低 n 位全是1，高位全是 0 的二进制数 */
  limit: number;
  /** 结果 */
  results: string[][];
  /** 皇后的一个放置方式 */
  oneCase: string[];
}

interface Limits {
  /** 二进制数表示的列限制，为 1 的位置不能放皇后，为 0 的位置可以放皇后，下同 */
  colLimit: number;
  /** 二进制数表示的左斜线限制 */
  leftDiagLimit: number;
  /** 二进制数表示的右斜线限制 */
  rightDiagLimit: number;
}

/** 基于位运算实现皇后合法性判断 */
const core = (
  { n, limit, results, oneCase }: PassThrough,
  { colLimit, leftDiagLimit, rightDiagLimit }: Limits,
): void => {
  // 当列都全都被限制死了，说明所有皇后都放置完毕了，添加到结果中
  if (limit === colLimit) {
    results.push([...oneCase]);
    return;
  }

  // 二进制数表示当前行皇后可以放置的列位置，为 1 的位置能放皇后，为 0 的位置不可以放皇后
  let validPos = limit & ~(colLimit | leftDiagLimit | rightDiagLimit);
  // 把所有当前行可以尝试的列位置都尝试一遍
  while (validPos) {
    // 通过列限制二进制数中 1 的个数得知当前放置的行（从零开始）
    const curRowIndex = countBitOne(colLimit);
    // 取最低位的 1 位置，作为当前行的皇后放置的列位置
    const mostRightPos = validPos & -validPos;
    // 记录当前行的放法
    oneCase[curRowIndex] = generateString(mostRightPos).padStart(n, '.');

    // 标记为已尝试
    validPos -= mostRightPos;

    // 放置下一行
    core(
      { n, limit, results, oneCase },
      {
        colLimit: colLimit | mostRightPos,
        leftDiagLimit: (leftDiagLimit | mostRightPos) << 1,
        rightDiagLimit: (rightDiagLimit | mostRightPos) >>> 1,
      },
    );
  }
};

/** 计算一个二进制数中 1 的个数 */
const countBitOne = (n: number): number => {
  let count = 0;
  while (n) {
    n &= n - 1;
    count++;
  }

  return count;
};

/** 位二进制数字生成字符串，0对应'.'，1对应'Q'，比如 100 => 'Q..' */
const generateString = (n: number): string => {
  let str = '';
  while (n) {
    str = `${n & 1 ? 'Q' : '.'}${str}`;
    n >>>= 1;
  }

  return str;
};
// @lc code=end
