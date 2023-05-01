/** 千分位分割（支持带小数点） */
export const splitThousand = (numStr: string): string => {
  const [intArea, floatArea = ''] = numStr.split('.');
  let count = 0;
  let newIntArea = '';

  // 逆序扫描整数部分
  for (let i = intArea.length - 1; i >= 0; i--) {
    newIntArea = `${intArea[i]}${newIntArea}`;
    count++;
    // 每添加三个数字，就补充一个逗号
    if (count % 3 === 0 && i > 0) {
      newIntArea = `,${newIntArea}`;
    }
  }

  if (floatArea) return `${newIntArea}.${floatArea}`;
  return newIntArea;
};

export const splitThousandWithRegExp = (numStr: string): string => {
  const [intArea, floatArea = ''] = numStr.split('.');

  const newIntArea = intArea.replace(/(\d)(?=(\d{3})+$)/g, '$1,');

  if (floatArea) return `${newIntArea}.${floatArea}`;
  return newIntArea;
};
