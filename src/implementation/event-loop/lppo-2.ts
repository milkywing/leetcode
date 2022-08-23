/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
// ====================================loop6=====================================
const demo6 = () => {
  async function async1() {
    await async2();
    console.log(1); // 4错误 5正确
  }

  // 等价于
  // async function async1() {
  // 等待 async2 的 resolve（在本轮微任务之后检查）
  // 然后 async2().then(() => console.log(1));
  // }
  async function async2() {
    console.log(2); // 1
    return Promise.resolve().then(() => {
      console.log(3); // 2
    });
  }

  async1();

  setTimeout(() => {
    console.log(4); // 7
  }, 0);

  new Promise<void>((resolve) => {
    resolve();
  })
    .then(() => {
      console.log(5); // 3
    })
    .then(() => {
      console.log(6); // 5错误 4正确
    })
    .then(() => {
      console.log(7); // 6
    });
};

// demo6();
// ====================================loop7=====================================
const demo7 = () => {
  async function async1() {
    await async2();
    console.log(1); // 5
  }
  async function async2() {
    console.log(2); // 1
    return Promise.resolve().then(() => {
      Promise.resolve().then(() => {
        console.log(3); // 3
      });
    });
  }

  async1();

  setTimeout(() => {
    console.log(4); // 6
  }, 0);

  new Promise<void>((resolve) => {
    resolve();
  })
    .then(() => {
      console.log(5); // 2
    })
    .then(() => {
      console.log(6); // 4
    });
};

// demo7();
// ====================================loop8=====================================
const demo8 = () => {
  console.log('1'); // 1

  setTimeout(() => {
    console.log('2'); // 5
    new Promise<void>((resolve) => {
      console.log('4'); // 6
      resolve();
    }).then(() => {
      console.log('5'); // 8
    });
    process.nextTick(() => {
      console.log('3'); // 7
    });
  });

  new Promise<void>((resolve) => {
    console.log('7'); // 2
    resolve();
  }).then(() => {
    console.log('8'); // 4
  });

  process.nextTick(() => {
    console.log('6'); // 3
  });

  setTimeout(() => {
    console.log('9'); // 9
    new Promise<void>((resolve) => {
      console.log('11'); // 10
      resolve();
    }).then(() => {
      console.log('12'); // 12
    });
    process.nextTick(() => {
      console.log('10'); // 11
    });
  });
};

// demo8();
// ====================================loop9=====================================
// 这个很怪
const demo9 = () => {
  Promise.resolve()
    .then(() => {
      console.log(0); // 1
      return Promise.resolve(4); // 5
    })
    .then((res) => {
      console.log(res);
    });
  // IMPORTANT
  // then 接受到一个 promise 会求得 promise 的值后用微任务包装起来消耗一个微任务，然后再向父层传递再消耗一个微任务，等价于
  // new Promise((resolve) => {
  //   console.log(0);
  //   resolve(4);
  // })
  //   .then()
  //   .then()
  //   .then((res) => {
  //     console.log(res);
  //   });

  Promise.resolve()
    .then(() => {
      console.log(1); // 2
    })
    .then(() => {
      console.log(2); // 3
    })
    .then(() => {
      console.log(3); // 4
    })
    .then(() => {
      console.log(5); // 6
    })
    .then(() => {
      console.log(6); // 7
    });
};

demo9();
