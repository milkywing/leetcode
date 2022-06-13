import { Edge, Graph, Node } from '../model/graph';
import { PriorityQueue } from '../priority-queue';
import { UnionFind } from '../union-find';

/**
 * K 算法最小生成树（从边的角度出发，将多个连通分量合并到不能再合并为止）
 * 所有点初始相互不连通，从小到大考虑每条边并判断能否加入到最小生成树中，并更新连通性
 */
export const kruskal = (graph: Graph): Edge[] => {
  // 使用图节点初始化并查集
  const uf = new UnionFind([...graph.nodes.values()]);
  // 使用小顶堆来存储边
  const pq = new PriorityQueue<Edge>([...graph.edges.values()]);

  const res: Edge[] = [];

  while (!pq.isEmpty()) {
    // 取出最小的边
    const minEdge = pq.dequeue()!;
    // 如果边的两个节点连通，则该边不能进一步提高图的连通性，舍弃
    if (uf.connected(minEdge.from, minEdge.to)) continue;
    // 否则该边能将两个区域连通，加入到最小生成树中
    uf.union(minEdge.from, minEdge.to);
    res.push(minEdge);
  }

  return res;
};

/**
 * P 算法最小生成树（从点的角度出发，将一个连通分量逐步扩大至囊括所有节点）
 * 所有边初始为解锁（不可用），从一个点开始出发，解锁该点关联的边，在这些边中选择最小的边，并将该边另外一个点解锁，
 * 对刚解锁的点重复上述过程直至所有点都被解锁
 */
export const prim = (graph: Graph): Edge[] => {
  // 使用小顶堆来存储解锁的边
  const pq = new PriorityQueue<Edge>([]);
  // 已经解锁的点
  const unlockNodes: Node[] = [];

  const res: Edge[] = [];

  // 这个循环是为了处理森林结构
  graph.nodes.forEach((node) => {
    if (unlockNodes.includes(node)) return;

    // 从一个点出发，解锁该点关联的边
    unlockNodes.push(node);
    pq.enqueue(...node.edges);

    while (!pq.isEmpty()) {
      // 取出最小的边
      const minEdge = pq.dequeue()!;
      // 可能未解锁的点
      const toNode = minEdge.to;

      // 如果边关联的节点已经解锁过了，则该边不能进一步提高图的连通性，舍弃
      if (unlockNodes.includes(toNode)) continue;
      // 否则该边能解锁新节点，加入到最小生成树中
      res.push(minEdge);
      unlockNodes.push(toNode);

      // 解锁被解锁点关联的边
      toNode.edges.forEach((edge) => {
        pq.enqueue(edge);
      });
    }
  });

  return res;
};

/**
 * D算法求单源最短路径（稀疏图友好，不能有累加和为负数的环）
 * 从 distanceMap 未求得最短路径的点里取一个距离最小的节点 minN，从该节点出发，
 * 考虑 minN 每条关联边，如果该边能让当前 distanceMap 里未求得最短路径的点的距离更小，则更新他们的距离（使用完 minN 后将 minN 标记为已求得最短路径）。
 * 重复上述过程直到所有点都求得最短路径，结束算法
 */
export const dijkstra = (start: Node): Map<Node, number> => {
  // distanceMap[n] 记录了当前从起点到节点 n 的最短路径长度，起点距离初始化为 0
  const distanceMap: Map<Node, number> = new Map([[start, 0]]);
  // 已经求得最短路径的节点，更新 distanceMap 时跳过里面的节点
  const solvedNodes: Node[] = [];

  // 从 distanceMap 未求得最短路径的点里取一个距离最小的节点 minN
  let minNode = getMinUnsolvedNode(distanceMap, solvedNodes);

  // 直到所有节点都求得最短距离
  while (minNode) {
    const minNodeDistance = distanceMap.get(minNode)!;
    // 考虑 minN 的每一条关联边
    minNode.edges.forEach((edge) => {
      const toNode = edge.to;
      const toNodeDistance = distanceMap.get(toNode) || Infinity;
      // 如果该边能让当前节点到 toNode 的距离更小，则更新 toNode 的距离
      distanceMap.set(toNode, Math.min(minNodeDistance + edge.weight, toNodeDistance));
    });
    // 将 minN 标记为已求得最短路径
    solvedNodes.push(minNode);
    // 获取下一个 minN
    minNode = getMinUnsolvedNode(distanceMap, solvedNodes);
  }

  return distanceMap;
};

/**
 * 从 distanceMap 未求得最短路径的点里取一个距离最小的节点 minN
 * （这个操作可以用魔改的小顶堆优化，支持堆中某个节点值的修改并将该点向上/向下调整）
 */
const getMinUnsolvedNode = (distanceMap: Map<Node, number>, solvedNodes: Node[]): Node | null => {
  let minNode: Node | null = null;
  let minDistance = Infinity;

  // eslint-disable-next-line no-restricted-syntax
  for (const [node, distance] of distanceMap) {
    if (solvedNodes.includes(node)) continue;
    if (distance < minDistance) {
      minNode = node;
      minDistance = distance;
    }
  }

  return minNode;
};
