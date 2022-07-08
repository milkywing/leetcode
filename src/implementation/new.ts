/* eslint-disable no-proto */
export const myNew = (constructor: Function, ...args: any[]) => {
  // 1.创建一个新对象
  const obj: Record<any, any> = {};
  // 2.将对象与构造函数通过原型链连接起来
  obj.__proto__ = constructor.prototype;
  // 3.将构造函数的this绑定到新建的对象上
  const result = constructor.apply(obj, args);
  // 4.根据返回值判断
  // 4.1如果返回对象类型，将其代替`obj`返回作为 new 的结果
  // 4.2如果构造函数返回原始类型（非对象类型），忽略其返回值，返回`obj`作为 new 的结果
  return result instanceof Object ? result : obj;
};
