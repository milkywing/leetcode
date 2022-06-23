/** 最大公约数 */
export const gcd = (n1: number, n2: number): number => {
  // 调整为 被除数 >= 除数
  let [dividen, divisor] = n1 >= n2 ? [n1, n2] : [n2, n1];

  while (divisor !== 0) {
    [dividen, divisor] = [divisor, dividen % divisor];
  }

  return dividen;
};

/** 最小公倍数 */
export const lcm = (n1: number, n2: number): number => {
  return (n1 * n2) / gcd(n1, n2);
};
