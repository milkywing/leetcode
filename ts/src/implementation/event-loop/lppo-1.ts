/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
// ====================================loop1=====================================
const demo1 = () => {
  async function async1() {
    console.log('async1 start'); // 2
    await async2();
    console.log('async1 end'); // 5
  }

  // IMPORTANT
  // 详见 https://segmentfault.com/q/1010000016147496
  // await 的结果采用 Promise.resolve() 来包装，以上等效于
  // async function async1() {
  //   console.log('async1 start');
  //   Promise.resolve(async2()).then(() => {
  //     console.log('async1 end');
  //   });
  // }

  // async2 的结果是 promise，即等效于
  // async function async1() {
  //   console.log('async1 start');
  //   async2().then(() => console.log('async1 end'));
  // }

  async function async2() {
    console.log('async2'); // 3
  }

  console.log('script start'); // 1

  setTimeout(() => {
    console.log('setTimeout'); // 8
  }, 0);

  async1();

  new Promise<void>((resolve) => {
    console.log('promise1'); // 4
    resolve();
  })
    .then(() => {
      console.log('promise2'); // 6
    })
    .then(() => {
      console.log('promise3'); // 7
    });
};

// demo1();
// ====================================loop2=====================================
const demo2 = () => {
  console.log('start'); // 1
  setTimeout(() => {
    console.log('children2'); // 3
    Promise.resolve().then(() => {
      console.log('children3'); // 4
    });
  }, 0);

  new Promise((resolve) => {
    console.log('children4'); // 2
    setTimeout(() => {
      console.log('children5'); // 5
      resolve('children6');
    }, 0);
  }).then((res) => {
    console.log('children7'); // 6
    setTimeout(() => {
      console.log(res); // 7
    }, 0);
  });
};

// demo2();
// ====================================loop3=====================================
const demo3 = () => {
  const p = () => {
    return new Promise((resolve1) => {
      new Promise((resolve2) => {
        setTimeout(() => {
          resolve2(1);
        }, 0);
        resolve2(2);
      }).then((res) => {
        console.log(res); // 3 "2"
      });

      console.log(3); // 1
      resolve1(4);
    });
  };

  p().then((res) => {
    console.log(res); // 4 "4"
  });
  console.log('end'); // 2
};

// demo3();
// ====================================loop4=====================================
const demo4 = () => {
  new Promise<void>((resolve) => {
    resolve();
  })
    .then(() => {
      console.log(1); // 1
      Promise.resolve().then(() => {
        Promise.resolve().then(() => {
          console.log(2); // 3
        });
      });
    })
    .then(() => {
      console.log(3); // 2
    })
    .then(() => {
      console.log(4); // 4
    });
};

// demo4();
// ====================================loop5=====================================
const demo5 = () => {
  console.log(1); // 1
  setTimeout(() => {
    console.log(2); // 6
    Promise.resolve().then(() => {
      console.log(3); // 7
    });
  });

  new Promise<void>((resolve) => {
    resolve();
    console.log(4); // 2
  })
    .then(() => {
      console.log(5); // 4
      setTimeout(() => {
        console.log(6); // 8
      });
    })
    .then(() => {
      console.log(7); // 5
    });

  console.log(8); // 3
};

// demo5();
