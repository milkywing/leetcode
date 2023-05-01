import { createNode, Node } from '../model/graph';

/** 图广度优先遍历 */
export const BFSGraph = (start: Node | null, callback?: (n: Node) => void): void => {
  if (!start) return;

  // 使用队列实现BFS
  const queue: Node[] = [start];
  // 访问过的节点
  const visited: Node[] = [start];

  while (queue.length) {
    const node = queue.shift()!;
    // 处理当前遍历到的节点
    callback?.(node);

    node.nexts.forEach((next) => {
      // 将未访问过的邻接节点加入队列
      if (!visited.includes(next)) {
        queue.push(next);
        visited.push(next);
      }
    });
  }
};

/** 图深度优先遍历 */
export const DFSGraph = (start: Node | null, callback?: (n: Node) => void): void => {
  if (!start) return;

  // 使用栈实现DFS
  const stack: Node[] = [start];
  // 访问过的节点
  const visited: Node[] = [start];
  // 【注意】在深度优先中，处理节点需要在 visited.push 之后
  callback?.(start);

  while (stack.length) {
    const curNode = stack.pop()!;

    // eslint-disable-next-line no-restricted-syntax
    for (const next of curNode.nexts) {
      if (!visited.includes(next)) {
        // 将当前节点重新放回栈中，用以回溯
        stack.push(curNode);
        // 将未访问过的邻接节点加入栈，注意只要一个，下面 break 了
        stack.push(next);
        visited.push(next);
        // 处理当前遍历到的节点
        callback?.(next);
        break;
      }
    }
  }
};

const node1 = createNode(1);
const node2 = createNode(2);
const node3 = createNode(3);
const node4 = createNode(4);

node1.nexts.push(node2, node3, node4);
node2.nexts.push(node4, node3);
node3.nexts.push(node4);

DFSGraph(node1, (n) => console.log(n.value));
