/** 数组拍平 */
export const flatten = <T = any>(arr: any[]): T[] => {
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr);
  }

  return arr;
};
