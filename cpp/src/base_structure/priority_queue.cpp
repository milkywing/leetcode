#include <leet/priority_queue.h>

template <typename T, typename Com>
leet::PriorityQueue<T, Com>::PriorityQueue(std::initializer_list<T> inits) {
  for (T v : inits) {
    heap.push_back(v);
    shift_down(heap.size() - 1)
  }
}

template <typename T, typename Com>
void leet::PriorityQueue<T, Com>::shift_down(size_type index) {}
