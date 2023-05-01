/** 十进制基数排序 */
const radix = 10;

/** 获取数值的第 digitIndex 位数，若第 digitIndex 位不存在返回 0 */
const getDigit = (num: number, digitIndex: number) => {
  return Math.trunc(Math.abs(num) / 10 ** (digitIndex - 1)) % 10;
};

/** 基数排序——O(n)——稳定 */
export const radixSortCore = (arr: number[], reverse = false) => {
  const arrLength = arr.length;
  if (arrLength < 2) return arr;

  // 获取数组中最大数的位数，用于控制排序轮次
  const absMax = Math.max(...arr.map((num) => Math.abs(num)));
  const maxDigit = Math.trunc(Math.log10(absMax)) + 1;

  // 从低位到高位对每个位进行排序
  for (let curDightIndex = 1; curDightIndex <= maxDigit; curDightIndex++) {
    // 构造 count 数组（长度为10），count[i] 表示当前位数字 i 出现的次数
    const count = new Array(radix).fill(0);
    arr.forEach((num) => count[getDigit(num, curDightIndex)]++);
    // 【关键】count 从左到右两两相加，此时 count[i] 表示当前位数字 <=i 出现次数
    for (let i = 1; i < radix; i++) count[i] += count[i - 1];

    // 创建一个桶（跟待排数组等长）用来存放当前位排好后的数组
    const bucket = Array<number>(arrLength);
    // 从右到左遍历数组
    for (let i = arrLength - 1; i >= 0; i--) {
      // 对于当前值的当前位数 digit，放到桶的第 count[digit] - 1 个位置，并将 count[digit] 减 1
      const digit = getDigit(arr[i], curDightIndex);
      bucket[count[digit] - 1] = arr[i];
      count[digit]--;
    }

    // 上面遍历结束后即完成当前位的排序，将本轮排序结果回写到原数组
    for (let i = 0; i < arrLength; i++) {
      arr[i] = bucket[i];
    }
  }

  return reverse ? arr.reverse() : arr;
};

/** 基数排序——O(n)——稳定 */
export const radixSort = (arr: number[]) => {
  // 遍历一遍数组，将负数放到前面，非负数放到后面
  const arrPositive: number[] = [];
  const arrNegative: number[] = [];
  arr.forEach((num) => {
    if (num < 0) arrNegative.push(num);
    else arrPositive.push(num);
  });

  // 分别对负数区域和非负数区域进行顺序相反的基数排序，并合并
  return [...radixSortCore(arrNegative, true), ...radixSortCore(arrPositive)];
};
