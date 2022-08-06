/** 深拷贝 */
export const deepClone = (obj: Object, hash = new WeakMap()) => {
  // 基础类型，直接返回
  if (typeof obj !== 'object' || obj === null || obj === undefined) return obj;
  // 内置类型，拷贝一份
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);

  // 对象类型，进入深拷贝流程
  // 使用 weakMap 解决循环引用
  if (hash.get(obj)) return hash.get(obj);

  // 创建对象的拷贝对象，并递归拷贝对象内的值
  const cloneObj = obj.constructor();
  hash.set(obj, cloneObj);
  Object.keys(obj).forEach((key) => {
    cloneObj[key] = deepClone(obj[key], hash);
  });

  return cloneObj;
};
