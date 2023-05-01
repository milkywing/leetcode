// 使用数组来模拟 hook 链表（实际上存在fiber.memoizedState上）
const stateList: any[] = [];
let index = 0;

export const useState = (initialState: any) => {
  // 当前执行的 useState hook
  const currentIndex = index;
  // 处理首次初始化
  stateList[currentIndex] = stateList[currentIndex] ?? initialState;

  // 更新状态后调度更新
  const setState = (newState) => {
    stateList[currentIndex] = newState;
    render();
  };

  // index 后移，为下一个 hook 做准备
  index++;

  return [stateList[currentIndex], setState];
};

// 想办法触发更新，比如使用 ReactDOM.render
const render = () => {
  index = 0;
  // ReactDOM.render(<App />, document.getElementById('root'));
};
