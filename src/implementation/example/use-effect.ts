type Deps = any[];
type DestroyFun = () => void;

// 使用数组来模拟 effect 链表，存储上次的依赖和销毁函数（实际上存在hook.memoizedState上）
const depsList: (Deps | undefined)[] = [];
const destroyList: (DestroyFun | undefined)[] = [];
let index = 0;

export const useEffect = (callback: () => DestroyFun, deps?: Deps) => {
  // 当前执行的 useEffect hook
  const currentIndex = index;
  // 上次的依赖
  const prevDeps = depsList[currentIndex];
  // 首次挂载（无上次依赖）/无 deps/依赖变动，需要进行回调
  const changed = !prevDeps || !deps || deps.some((dep, i) => dep !== prevDeps[i]);

  if (changed) {
    depsList[currentIndex] = deps;
    // 先执行上次的销毁，再执行本次的创建
    destroyList[currentIndex]?.();
    destroyList[currentIndex] = callback();
  }

  // index 后移，为下一个 hook 做准备
  index++;
};

export const clearEffectIndex = () => {
  index = 0;
};
