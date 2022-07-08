/** 节流：持续触发并不会执行多次，在一段时间内，只执行一次 */
export const throttle = <T extends (...args: any[]) => any>(fun: T, wait: number): T => {
  // 上次触发的时间
  let startTime = Date.now();
  let timer: NodeJS.Timeout;

  return function (...args: any[]) {
    // 从上一次触发到现在触发，还剩下多少时间（应该执行了）
    const remainTime = wait - (Date.now() - startTime);
    const context = this;
    // 一上来就清除计时器
    clearTimeout(timer);

    if (remainTime <= 0) {
      // 保证首次触发和每一段时间内触发一次
      fun.apply(context, args);
      startTime = Date.now();
    } else {
      // 保证最后一次的触发能执行一次
      timer = setTimeout(() => fun.apply(context, args), remainTime);
    }
  } as T;
};
