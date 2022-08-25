/*
 * @lc app=leetcode.cn id=850 lang=typescript
 * https://leetcode.cn/problems/rectangle-area-ii/description/
 * [850] 矩形面积 II
 */

// @lc code=start

interface Line {
  x: number;
  type: LineType;
  yBottom: number;
  yTop: number;
}

enum LineType {
  Open,
  Close,
}

/** 横向扫描统计 */
function rectangleArea(rectangles: number[][]): number {
  const lines: Line[] = [];
  const close2OpenMap = new Map<Line, Line>();
  rectangles.forEach((rect) => {
    const [x1, y1, x2, y2] = rect;

    // 将每个举行拆分出入边和出边
    const openLine = {
      x: x1,
      type: LineType.Open,
      yBottom: y1,
      yTop: y2,
    };
    const closeLine = {
      x: x2,
      type: LineType.Close,
      yBottom: y1,
      yTop: y2,
    };
    lines.push(openLine, closeLine);

    // 记录出边到入边的映射
    close2OpenMap.set(closeLine, openLine);
  });

  // 所有边按照 x 坐标升序
  lines.sort((line1, line2) => line1.x - line2.x);

  let result = 0;
  let preX = lines[0].x;
  // 当前扫描过的开边
  const openLines = new Set<Line>();

  lines.forEach((line) => {
    const { x, type } = line;
    if (x !== preX) {
      // 扫描过程中 x 坐标变动，执行统计，面积 = x移动距离 * 当前开边覆盖高度
      result += (x - preX) * computeHeight(openLines);
      preX = x;
    }

    if (type === LineType.Open) {
      // 遇到开边加进去
      openLines.add(line);
    } else {
      // 遇到闭边，将对应的开边移除
      openLines.delete(close2OpenMap.get(line)!);
    }
  });

  return result % 1000000007;
}

/** 统计 openLines 纵轴上覆盖高度 */
const computeHeight = (openLines: Set<Line>): number => {
  let height = 0;
  let maxY = -Infinity;

  // 开边的 yBottom 升序排序，才能统计覆盖高度
  [...openLines]
    .sort((line1, line2) => line1.yBottom - line2.yBottom)
    .forEach(({ yBottom, yTop }) => {
      maxY = Math.max(maxY, yBottom);
      height += Math.max(0, yTop - maxY);
      maxY = Math.max(maxY, yTop);
    });

  return height;
};
// @lc code=end
