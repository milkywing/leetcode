import { expect } from 'chai';
import { UnionFind } from '../union-find';

let uf: UnionFind;

describe('并查集', () => {
  beforeEach(() => {
    uf = new UnionFind([1, 2, 3, 4, 5, 6, 7]);
  });

  it('合并操作', () => {
    uf.union(1, 2);
    expect(uf.getCount()).to.equal(6);
    expect(uf.connected(1, 2)).to.be.equal(true);
    expect(uf.connected(1, 3)).to.be.equal(false);

    uf.union(3, 4);
    expect(uf.getCount()).to.equal(5);
    expect(uf.connected(3, 4)).to.be.equal(true);
    expect(uf.connected(1, 4)).to.be.equal(false);

    uf.union(1, 3);
    expect(uf.getCount()).to.equal(4);
    expect(uf.connected(1, 3)).to.be.equal(true);
  });
});
