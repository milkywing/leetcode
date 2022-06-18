import { expect } from 'chai';
import { manacher } from '../pattern-match/manacher';

describe('Pattern Match', () => {
  it('manacher 最大回文子串长度', () => {
    expect(manacher('')).to.equal(0);

    expect(manacher('a')).to.equal(1);

    expect(manacher('ab')).to.equal(1);
    expect(manacher('aa')).to.equal(2);

    expect(manacher('abc')).to.equal(1);
    expect(manacher('aab')).to.equal(2);
    expect(manacher('abb')).to.equal(2);
    expect(manacher('aaaa')).to.equal(4);

    expect(manacher('abcd')).to.equal(1);
    expect(manacher('aabc')).to.equal(2);
    expect(manacher('abcc')).to.equal(2);
    expect(manacher('aabb')).to.equal(2);
    expect(manacher('abbc')).to.equal(2);
    expect(manacher('abba')).to.equal(4);
    expect(manacher('aaab')).to.equal(3);
    expect(manacher('abbb')).to.equal(3);
  });
});
