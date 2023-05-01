/** 通过森林实现的并查集 */
export class UnionFind<T = number> {
  /** 当前连通分量 */
  private count: number;

  /**
   * 通过一个数组存储森林结构（多棵树，对应每个联通分量），节点 i 的父节点为 parents.get(i)，
   * 你可以使用一个能唯一标识结点的数据项来作为 i
   */
  private parents = new Map<T, T>();

  /** 记录每棵树的大小，以节点 i 为根节点的树的大小 */
  private sizes = new Map<T, number>();

  constructor(fromValues: T[]) {
    this.count = fromValues.length;
    // 初始化并查集，每个节点的父节点都是自己，每棵树的大小都是 1
    fromValues.forEach((value) => {
      this.parents.set(value, value);
      this.sizes.set(value, 1);
    });
  }

  /** 连通分量个数 */
  public getCount(): number {
    return this.count;
  }

  /** 最大连通分量大小 */
  public getLargestComponentSize(): number {
    return Math.max(...this.sizes.values());
  }

  /** 连通节点 p 和节点 q 所属的连通分量 */
  public union(p: T, q: T): void {
    // 如果两个节点有共同的根节点，说明他们在同一个连通分量，跳过合并操作
    const pRoot = this.find(p);
    const qRoot = this.find(q);
    if (!pRoot || !qRoot || pRoot === qRoot) return;

    const pRootSize = this.sizes.get(pRoot)!;
    const qRootSize = this.sizes.get(qRoot)!;
    const mergedSize = pRootSize + qRootSize;

    // 将两颗树合并为一棵，将小树接到大树上，并更新大树的大小和连通分量个数
    if (pRootSize < qRootSize) {
      this.parents.set(pRoot, qRoot);
      this.sizes.set(qRoot, mergedSize);
    } else {
      this.parents.set(qRoot, pRoot);
      this.sizes.set(pRoot, mergedSize);
    }
    this.count--;
  }

  /** 判断两个节点的连通性 */
  public connected(p: T, q: T): boolean {
    const pRoot = this.find(p);
    const qRoot = this.find(q);
    if (!pRoot || !qRoot) return false;
    return pRoot === qRoot;
  }

  /** 返回节点 p 所在树的根节点 */
  private find(p: T): T | null {
    const parentP = this.parents.get(p);
    if (parentP === undefined) return null;
    let curP = p;

    while (curP !== this.parents.get(p)) {
      // 在 find 每次调用时进行路径压缩
      this.parents.set(curP, this.parents.get(this.parents.get(curP)!)!);
      curP = this.parents.get(curP)!;
    }

    return curP;
  }

  public printGraph(): void {
    const result: string[] = [];
    this.parents.forEach((parent, child) => {
      result.push(`${child} -> ${parent}`);
    });
    console.log(result.join('\n'));
  }
}
