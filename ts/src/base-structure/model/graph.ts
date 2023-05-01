export interface Node<T = number> {
  value: T;
  /** 入度 */
  in: number;
  /** 出度 */
  out: number;
  /** 节点指向的节点 */
  nexts: Node<T>[];
  /** 节点发射出去的边 */
  edges: Edge<T>[];
}

export interface Edge<T = number> {
  /** 权重 */
  weight: number;
  /** 始节点 */
  from: Node<T>;
  /** 终节点 */
  to: Node<T>;
}

export const createNode = <T>(value: T): Node<T> => ({
  value,
  in: 0,
  out: 0,
  nexts: [],
  edges: [],
});

export const createEdge = <T>(from: Node<T>, to: Node<T>, weight = 0): Edge<T> => ({
  weight,
  from,
  to,
});

/** 无向图链接两个点 */
export const connectTwoNodesUnDirected = <T>(n1: Node<T>, n2: Node<T>, weight = 0): void => {
  n1.nexts.push(n2);
  n2.nexts.push(n1);
  n1.in++;
  n1.out++;
  n2.in++;
  n2.out++;
  n1.edges.push(createEdge(n1, n2, weight));
  n2.edges.push(createEdge(n2, n1, weight));
};

export class Graph<T = number> {
  /** 点集 */
  public nodes: Map<number, Node<T>> = new Map();

  /** 边集 */
  public edges: Set<Edge<T>> = new Set();
}
