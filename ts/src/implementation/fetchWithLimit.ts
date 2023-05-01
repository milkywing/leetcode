/** 并发数量控制 */
export const fetchWithLimit = (urls: string[], limit: number, callback?: Function) => {
  new Promise<void>((resolve) => {
    const cloneUrls = urls.slice(0);
    // 当前执行任务数量、当前完成任务数量
    let [concurrentNum, finishedNum] = [0, 0];

    const schedule = () => {
      // 所有任务完成结束调度，执行回调
      if (finishedNum === urls.length) {
        resolve();
        return;
      }

      // 还有剩余任务，且当前任务队列未满，派发任务到任务队列中
      if (concurrentNum < limit && cloneUrls.length) {
        concurrentNum++;
        const url = cloneUrls.shift()!;

        // 模拟异步请求
        RandomSleepPromise(() => {
          console.log(url);
        }).finally(() => {
          // 无论异步任务成功或失败，都当作完成，并且从任务队列中推出，让位给其他未调度的任务
          concurrentNum--;
          finishedNum++;
          schedule();
        });

        // fetch(cloneUrls.shift()!)
        //   .then((res) => {
        //     console.log(res);
        //   })
        //   .finally(() => {
        //     concurrentNum--;
        //     finishedNum++;
        //     schedule();
        //   });

        // 任务队列未满时，再次调度
        if (concurrentNum < limit && cloneUrls.length) schedule();
      }
    };

    // 启动函数
    schedule();
  }).then(() => callback?.());
};

const RandomSleepPromise = (callback: Function) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      callback();
      resolve();
    }, 3000 * Math.random());
  });
};

const urls = Array.from({ length: 10 }, (_, i) => `url${i.toString()}`);

fetchWithLimit(urls, 4, () => {
  console.log('finish');
});
