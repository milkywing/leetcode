/* eslint-disable no-extend-native */
interface Function {
  myApply(this: Function, thisArg: any, argArray?: any[]): any;
  myCall(this: Function, thisArg: any, ...argArray: any[]): any;
  myBind(this: Function, thisArg: any, ...argArray: any[]): any;
}

Function.prototype.myApply = function (thisArg: any, argArray?: any[]) {
  // 若绑定的上下文为 null/undefined，默认绑定 globalThis
  const context = thisArg || globalThis;

  // 将函数放在上下文上执行，执行完成后清除
  const fnName = Symbol('fnName');
  context[fnName] = this;
  const result = Array.isArray(argArray) ? context[fnName](...argArray) : context[fnName]();
  delete context[fnName];

  return result;
};

Function.prototype.myCall = function (thisArg: any, ...argArray: any[]) {
  // 若绑定的上下文为 null/undefined，默认绑定 globalThis
  const context = thisArg || globalThis;

  // 将函数放在上下文上执行，执行完成后清除
  const fnName = Symbol('fnName');
  context[fnName] = this;
  const result = context[fnName](...argArray);
  delete context[fnName];

  return result;
};

Function.prototype.bind = function (thisArg: any, ...argArray: any[]) {
  const self = this;

  return function (...args: any[]) {
    return self.myApply(thisArg, argArray.concat(args));
  };
};
