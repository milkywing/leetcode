export const myInstanceof = (left: any, right: any): boolean => {
  // 非空 object 对象直接返回 false
  if (typeof left !== 'object' || left === null) return false;
  let proto = Object.getPrototypeOf(left);

  // 从 left 开始向上遍历原型链，寻找目标原型
  while (true) {
    if (proto === null) return false;
    if (proto === right.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
};
