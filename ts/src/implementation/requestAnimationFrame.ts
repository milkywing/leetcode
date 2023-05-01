/** requestAnimationFrame 模拟 setTimeout */
export const simulateTimeout = (callback: () => void, delay: number): number => {
  let id: number;

  const implement = (timestamp: number) => {
    if (timestamp >= delay) {
      callback();
    } else {
      id = requestAnimationFrame(implement);
    }
  };
  id = requestAnimationFrame(implement);

  return id;
};

/** 打印屏幕帧率 */
export const printScreenFps = () => {
  let preTimestamp = performance.now();
  let handle: number;

  const fun = (timestamp: number) => {
    console.log((1000 / (timestamp - preTimestamp)).toFixed(2));
    preTimestamp = timestamp;
    handle = requestAnimationFrame(fun);
  };

  handle = requestAnimationFrame(fun);

  return () => {
    cancelAnimationFrame(handle);
  };
};
