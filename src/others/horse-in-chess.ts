/**
 * 【问题】棋盘以坐标表示，0<=y<=9，0<=x<=8，现在有一个马从零点出发走 K 步前往目标点（X,Y），求走法数
 */

/** 转化为从目标点（X,Y）出发走 K 步前往零点 */
export const horseInChess = (x: number, y: number, k: number): number => {
  // baseCase1：越界，无效走法
  if (x < 0 || x > 8 || y < 0 || y > 9) return 0;
  // baseCase2：走完步数刚好到达目标点，一种有效走法；走完步数没到达目标点，无效走法
  if (k === 0) return Number(x === 0 && y === 0);

  // 马从一个点走一步，有八种走法
  return (
    horseInChess(x - 2, y - 1, k - 1) +
    horseInChess(x - 2, y + 1, k - 1) +
    horseInChess(x + 2, y - 1, k - 1) +
    horseInChess(x + 2, y + 1, k - 1) +
    horseInChess(x - 1, y - 2, k - 1) +
    horseInChess(x - 1, y + 2, k - 1) +
    horseInChess(x + 1, y - 2, k - 1) +
    horseInChess(x + 1, y + 2, k - 1)
  );
};
