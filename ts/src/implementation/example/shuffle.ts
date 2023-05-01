export const shuffle = (arr: number[]): number[] => {
  // 逆序遍历数组，随机选取当前位置前方的一个位置，和当前位置进行交换
  // 相当于无放回的抽签问题，以此为每个位置放置抽到的数
  for (let i = arr.length - 1; i >= 0; i--) {
    const randIndex = Math.floor(Math.random() * (i + 1));
    [arr[randIndex], arr[i]] = [arr[i], arr[randIndex]];
  }

  return arr;
};
