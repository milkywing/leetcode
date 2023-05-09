#pragma once

#include <functional>
#include <initializer_list>
#include <iostream>
#include <optional>
#include <vector>

namespace leet {
  // 优先队列
  template <typename T, typename Com = std::less<T>>
  class PriorityQueue {
   public:
    using size_type = typename std::vector<T>::size_type;

    PriorityQueue() = default;
    PriorityQueue(std::initializer_list<T>);
    ~PriorityQueue() = default;

    size_type size() { return heap_.size(); }
    bool empty() { return heap_.empty(); }
    // 查看当前优先值
    std::optional<T> peek() { return empty() ? std::nullopt : heap_[0]; };

    // 入队
    void enqueue(T val);
    // 出队
    std::optional<T> dequeue();

   private:
    // 向上调整结点维持堆结构
    void shift_up(size_type index);
    // 向下调整结点维持堆结构
    void shift_down(size_type index);

   private:
    Com compare_;
    // 使用数组存储完全二叉树，对于下标为 n 的节点，其父节下标为 (n - 1) / 2，左子节下标为 2n + 1，右子节点下标为 2n + 2
    std::vector<T> heap_;
  };

  template <typename T, typename Com>
  PriorityQueue<T, Com>::PriorityQueue(std::initializer_list<T> inits) {
    for (T v : inits) enqueue(v);
  }

  template <typename T, typename Com>
  void PriorityQueue<T, Com>::enqueue(T val) {
    heap_.push_back(val);
    shift_up(size() - 1);
  }

  template <typename T, typename Com>
  std::optional<T> PriorityQueue<T, Com>::dequeue() {
    if (empty()) return std::nullopt;
    T res = heap_[0];
    if (size() == 1) {
      heap_.pop_back();
      return res;
    }
    heap_[0] = heap_.back();
    heap_.pop_back();
    shift_down(0);
    return res;
  }

  template <typename T, typename Com>
  void PriorityQueue<T, Com>::shift_up(size_type index) {
    if (index == 0 || index >= size()) return;

    size_type parent_index = (index - 1) >> 1;
    while (parent_index >= 0 && compare_(heap_[index], heap_[parent_index])) {
      std::swap(heap_[index], heap_[parent_index]);
      index = parent_index;
      // 下标是无符号整数，因此当下标已经是零的情况下终止循环，避免溢出
      if (index == 0) break;
      parent_index = (index - 1) >> 1;
    }
  }

  template <typename T, typename Com>
  void PriorityQueue<T, Com>::shift_down(size_type index) {
    size_type heap_size = size();
    if (index >= heap_size) return;

    size_type left = (index << 1) + 1;
    // 完全二叉树的特性，若左孩子不存在，则右孩子不存在。该条件用于判断是否有儿子
    while (left < heap_size) {
      size_type right = left + 1;
      // 记录当前被调整节点及其子节点中的最大/最小值的下标
      size_type target_index = right < heap_size && compare_(heap_[right], heap_[left]) ? right : left;
      target_index = compare_(heap_[target_index], heap_[index]) ? target_index : index;

      // 若交换目标是自身，结束向下调整
      if (target_index == index) break;

      std::swap(heap_[index], heap_[target_index]);
      index = target_index;
      left = (index << 1) + 1;
    }
  }
} // namespace leet