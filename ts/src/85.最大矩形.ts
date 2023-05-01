/*
 * @lc app=leetcode.cn id=85 lang=typescript
 * https://leetcode.cn/problems/maximal-rectangle/description/
 * [85] 最大矩形
 */
// MONOSTACK

// @lc code=start
function maximalRectangle(matrix: string[][]): number {
  const colNum = matrix[0].length;
  const histogram: number[] = Array(colNum + 1).fill(0);
  // 柱状图长度比列数多一，最后放置一个负无穷，用于强制清算柱状图的面积
  histogram[colNum] = -Infinity;

  let result = 0;

  matrix.forEach((rows) => {
    // 读取每一行，生成每一层的柱状图
    rows.forEach((num, index) => {
      if (num === '0') {
        histogram[index] = 0;
      } else {
        histogram[index]++;
      }
    });
    // 计算每一层柱状图的最大矩形，参考【84.柱状图中最大的矩形】
    result = Math.max(result, histogramMaxArea(histogram));
  });

  return result;
}

const histogramMaxArea = (histogram: number[]): number => {
  // 单调递增单调栈
  const stack: number[] = [];
  let result = 0;

  histogram.forEach((height, index) => {
    while (stack.length && height < histogram[stack[stack.length - 1]]) {
      const popIndex = stack.pop()!;
      const popHeight = histogram[popIndex];
      const width = index - (stack[stack.length - 1] ?? -1) - 1;
      result = Math.max(result, popHeight * width);
    }

    stack.push(index);
  });

  return result;
};
// @lc code=end
