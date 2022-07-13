enum State {
  Pending = 'Pending',
  Fulfilled = 'Fulfilled',
  Rejected = 'Rejected',
}

type Resolve<T> = (value?: T | PromiseLike<T>) => void;
type Reject = (reason?: any) => void;
type Executor<T> = (resolve: Resolve<T>, reject: Reject) => void;

type OnFulfilled<T, R = any> = (value: T) => R | PromiseLike<R>;
type OnRejected = (reason: any) => any;
type OnFinally = () => void;

interface Callback<T, R = any> {
  /** then 创建 promise 的 resolve  */
  resolve: Resolve<R>;
  /** then 创建 promise 的 reject */
  reject: Reject;
  /** then 的第一个参数（可选） */
  onFulfilled?: OnFulfilled<T, R>;
  /** then 的第二个参数（可选） */
  onRejected?: OnRejected;
}

const isFunction = (value: any): value is Function => typeof value === 'function';

const isObject = (value: any): value is Object => Object.prototype.toString.call(value) === '[object Object]';

const isThenable = (value: any): boolean => (isFunction(value) || isObject(value)) && 'then' in value;

export class MyPromise<T = any> {
  /** promise 状态 */
  public state = State.Pending;

  /** 因为 promise 状态切换是二选一的，可以只用一个变量 result 来存储 resolveValue 或 rejectReason */
  public result!: T;

  /** then 方法注册的回调 */
  private callbacks: Callback<T>[] = [];

  constructor(executor: Executor<T>) {
    // 在 resolve/reject 时切换状态，记录 resolveValue/rejectReason
    const onFulfilled = (value: T) => this.transferState(State.Fulfilled, value);
    const onRejected = (reason: any) => this.transferState(State.Rejected, reason);

    // 确保状态只会转换一次
    let hasStateTransferred = false;
    // 封装出 resolve 和 reject 方法，提供给 executor，由 executor 决定 resolve/reject
    const resolve: Resolve<T> = (value) => {
      if (hasStateTransferred) return;
      hasStateTransferred = true;
      this.resolvePromise(value, onFulfilled, onRejected);
    };

    const reject: Reject = (reason) => {
      if (hasStateTransferred) return;
      hasStateTransferred = true;
      onRejected(reason);
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      // executor 执行抛错时执行 reject
      reject(error);
    }
  }

  public static resolve<T>(value?: T): MyPromise<T> {
    return new MyPromise((resolve) => resolve(value));
  }

  public static reject(reason?: any): MyPromise<never> {
    return new MyPromise((_, reject) => reject(reason));
  }

  /** 所有 promise 都 fulfilled 才会 fulfilled，任意一个 promise rejected 就会 rejected */
  public static all(promises: MyPromise[]) {
    return new MyPromise((resolve, reject) => {
      const values: any[] = [];
      let count = 0;

      promises.forEach((p, index) => {
        p.then((value) => {
          values[index] = value;
          count++;
          if (count === promises.length) {
            resolve(values);
          }
        }, reject);
      });
    });
  }

  /** 所有 promise 都 fulfilled/rejected 才会 fulfilled  */
  public static allSettle(promises: MyPromise[]) {
    return new MyPromise((resolve) => {
      const results: any[] = [];
      let count = 0;
      promises.forEach((p, index) => {
        p.then(
          (value) => {
            results[index] = { status: State.Fulfilled, value };
            count++;
            if (count === promises.length) resolve(results);
          },
          (reason) => {
            results[index] = { status: State.Rejected, reason };
            count++;
            if (count === promises.length) resolve(results);
          },
        );
      });
    });
  }

  /** 所有 promise 都 rejected 才会 rejected，任意一个 promise fulfilled 就会 fulfilled */
  public static any(promises: MyPromise[]) {
    return new MyPromise((resolve, reject) => {
      const reasons: any[] = [];
      let count = 0;

      promises.forEach((p, index) => {
        p.then(resolve, (reason) => {
          reasons[index] = reason;
          count++;
          if (count === promises.length) {
            reject(reasons);
          }
        });
      });
    });
  }

  /** 取第一个 fulfilled/rejected 的 promise 的状态和值 */
  public static race(promises: MyPromise[]) {
    return new MyPromise((resolve, reject) => {
      promises.forEach((p) => p.then(resolve, reject));
    });
  }

  public then<R = any>(onFulfilled?: OnFulfilled<T, R>, onRejected?: OnRejected): MyPromise<R> {
    return new MyPromise<R>((resolve, reject) => {
      const callback: Callback<T> = {
        resolve,
        reject,
        onFulfilled,
        onRejected,
      };
      // 如果当前 promise 正在 pending，注册回调等待状态变更时被调用
      if (this.state === State.Pending) {
        this.callbacks.push(callback);
        return;
      }
      // 如果当前 promise 非 pending，直接走回调逻辑
      setTimeout(() => this.handleCallback(callback));
    });
  }

  /** catch 本质上就是 then 函数不接收 onFulfilled 函数的返回结果 */
  public catch(onRejected?: OnRejected) {
    return this.then(undefined, onRejected);
  }

  public finally(onFinally: OnFinally) {
    return this.then<any>(
      (value) =>
        MyPromise.resolve(onFinally()).then(() => {
          return value;
        }),
      (reason) =>
        MyPromise.resolve(onFinally()).then(() => {
          throw reason;
        }),
    );
  }

  /** 切换状态 、记录 value/reason 并异步执行所有回调 */
  private transferState(state: State, result: T): void {
    if (this.state !== State.Pending) return;
    this.state = state;
    this.result = result;
    // 因为当前 promise 状态发生了变化，需要异步执行所有回调，通知下游 promise 进行 resolve/reject
    setTimeout(() => this.handleAllCallbacks());
  }

  /** 处理单个回调 */
  private handleCallback(callback: Callback<T>): void {
    const { resolve, reject, onFulfilled, onRejected } = callback;

    // 如果 onFulfilled/onRejected 为函数，把当前 promise 的 result 作为入参执行函数，将返回值传递给下游 promise
    // 如果 onFulfilled/onRejected 为非函数，直接将当前 promise 的 result 传递给下游 promise
    try {
      // 根据当前 promise 状态，选择执行 onFulfilled/onRejected 向下游 promise 传递 result
      if (this.state === State.Fulfilled) {
        resolve(isFunction(onFulfilled) ? onFulfilled(this.result) : this.result);
        return;
      }
      if (this.state === State.Rejected) {
        if (isFunction(onRejected)) resolve(onRejected(this.result));
        else reject(this.result);
      }
    } catch (error) {
      // 如果回调执行抛错，让下游 promise 执行 reject
      reject(error);
    }
  }

  /** 执行所有回调并清空 */
  private handleAllCallbacks(): void {
    this.callbacks.forEach((callback) => this.handleCallback(callback));
    this.callbacks = [];
  }

  /** 处理 resolve 逻辑，情况五选一（可以用职责链优化） */
  private resolvePromise(value: any, onFulfilled: OnFulfilled<T>, onRejected: OnRejected): void {
    // 【1】resolveValue 不能是自身，否则走 onRejected 逻辑
    if (value === this) {
      onRejected!(new TypeError('Can not fulfill promise with itself'));
      return;
    }
    // 【2】如果 resolveValue 是另外一个 promise，直接沿用该 promise 的状态和 result
    if (value instanceof MyPromise) {
      value.then(onFulfilled, onRejected);
      return;
    }
    // 【3】如果 resolveValue 是 Thenable，取其 then 方法封为新的 promise 返回
    if (isThenable(value)) {
      try {
        const { then } = value;
        if (isFunction(then)) {
          new MyPromise(then.bind(value)).then(onFulfilled, onRejected);
          return;
        }
      } catch (error) {
        // 【4】执行拋错，走 onRejected 逻辑
        onRejected!(error);
        return;
      }
    }
    // 【5】其他情况一切正常，走 onFulfilled 逻辑
    onFulfilled!(value);
  }
}

// 参考1 https://blog.cjw.design/interview-questions/common/q2
// 参考2 https://www.cnblogs.com/lilpig/p/15567559.html
