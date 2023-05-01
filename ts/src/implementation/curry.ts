type Fn = (...arg: any[]) => any;

// IMPORTANT
/** 函数柯里化：将多参函数的一次调用，转换为分批参数多次调用 */
export const curry = (fn: Fn, ...args1: any[]) => {
  return function (this: any, ...args2: any[]) {
    // 拼接参数
    const subArgs = [...args1, ...args2];

    // 判断参数的长度是否已经满足函数所需参数的长度
    if (subArgs.length >= fn.length) {
      // 如果满足，执行函数
      return fn.apply(this, subArgs);
    }
    // 如果不满足，递归返回科里化的函数，等待参数的传入
    return curry.call(this, fn, ...subArgs);
  };
};

/** 简洁版本 */
export const curryES6 = (fn: Fn, ...args: any[]) => {
  return fn.length <= args.length ? fn(...args) : curryES6.bind(null, fn, ...args);
};

// pipe(fn1, fn2, fn3)(val) === fn3(fn2(fn1(val)))
export const pipe =
  (...fns: Function[]) =>
  (val: any) =>
    fns.reduce((acc, fn) => fn(acc), val);

// compose(fn1, fn2, fn3)(val) === fn1(fn2(fn3(val)))
export const compose =
  (...fns: Function[]) =>
  (val: any) =>
    fns.reverse().reduce((acc, fn) => fn(acc), val);
