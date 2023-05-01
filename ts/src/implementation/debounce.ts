// IMPORTANT
/** 防抖：距离下次触发时间间隔过短的，不予执行；触发后在指定时长内无下一次触发才会予以执行 */
export const debounce = <T extends (...args: any[]) => any>(fun: T, wait: number, immediate = false): T => {
  let timer: NodeJS.Timeout | null = null;

  return function (...args: any[]) {
    const context = this;
    // 上来就清除计时器
    if (timer) clearTimeout(timer);

    if (immediate) {
      // 需要立即执行的情况
      if (!timer) {
        fun.apply(context, args);
      }
      timer = setTimeout(() => {
        timer = null;
      }, wait);
    } else {
      // 不需要立即执行的情况
      timer = setTimeout(() => fun.apply(context, args), wait);
    }
  } as T;
};
