import { expect } from 'chai';
import { PriorityQueue } from '../priority-queue';

const pq = new PriorityQueue();
const enqueueSeries = [5, 3, 1, 2, 2, 4, -100];
const peekSeries = [5, 3, 1, 1, 1, 1, -100];
const queueSize = [1, 2, 3, 4, 5, 6, 7];

describe('优先队列', () => {
  it('优先队列入队', () => {
    enqueueSeries.forEach((item, index) => {
      pq.enqueue(item);
      expect(pq.peek()).to.equal(peekSeries[index]);
      expect(pq.size).to.equal(queueSize[index]);
    });
  });

  it('优先队列出队', () => {
    const series: number[] = [];
    while (pq.size) {
      series.push(pq.dequeue()!);
    }
    expect(series).to.deep.equal([-100, 1, 2, 2, 3, 4, 5]);
  });
});
