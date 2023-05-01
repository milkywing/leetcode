// 建立timerId（不变量） => timer（变动量）的映射
const timerMap: Record<number, NodeJS.Timeout> = {};
// 用于自增的句柄，真正的timer句柄为timerMap[id]
let timerId = 0;

/**
 * 使用setTimeout模拟的setInterval，请配合clearSimulateInterval使用
 * @param callback 回调函数
 * @param ms 间隔时长
 * @returns 句柄
 */
export const setSimulateInterval = (callback: () => void, ms: number): number => {
  // 分配句柄
  const allocatedTimerId = timerId;
  timerId += 1;
  // 递归实现 interval
  const fn = () => {
    timerMap[allocatedTimerId] = setTimeout(fn, ms);
    callback();
  };
  // 启动函数
  timerMap[allocatedTimerId] = setTimeout(fn, ms);
  return allocatedTimerId;
};

export const clearSimulateInterval = (id?: number): void => {
  if (typeof id !== 'number') return;
  clearTimeout(timerMap[id]);
  delete timerMap[id];
};
