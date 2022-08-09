/** 通过 Object.seal 和 Object.definedProperty 实现深度 freeze */
export const freeze = (obj: Object): void => {
  if (typeof obj !== 'object') return;

  Object.seal(obj);

  Object.keys(obj).forEach((key) => {
    Object.defineProperty(obj, key, { writable: false });
    freeze(obj[key]);
  });
};
