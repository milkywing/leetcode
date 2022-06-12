interface Node {}

interface Edge {}

export class Graph {
  /** 点集 */
  public nodes: Node[] = [];

  /** 边集 */
  public edges: Edge[] = [];
}
