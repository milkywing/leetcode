#include <functional>
#include <vector>

namespace leet {

template <typename T, typename Com = std::less<T>>
class PriorityQueue {
 public:
  using size_type = typename std::vector<T>::size_type;

  PriorityQueue(std::initializer_list<T>);
  ~PriorityQueue() = default;

  size_type size() { return heap.size(); }
  bool empty() { return heap.empty(); }

  T peek() { return heap.at(0); }
  // 入队
  void enqueue(T val);
  // 出队
  T dequeue();

 private:
  // 向上调整结点维持堆结构
  void shift_up(size_type index);
  // 向下调整结点维持堆结构
  void shift_down(size_type index);

 private:
  std::vector<T> heap;
};

} // namespace leet