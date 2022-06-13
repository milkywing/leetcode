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

export class Graph<T = number> {
  /** 点集 */
  public nodes: Map<number, Node<T>> = new Map();

  /** 边集 */
  public edges: Set<Edge<T>> = new Set();
}
