#include <unordered_map>
#include <vector>
/*
 * @lc app=leetcode.cn id=1 lang=cpp
 *
 * [1] 两数之和
 */

// @lc code=start
class Solution {
 public:
  std::vector<int> twoSum(const std::vector<int> &nums, int target) {
    // 值到下标的映射
    std::unordered_map<int, int> value_2_index;
    // 遍历数组，对于当前值 cur_value，检查 target - cur_value 是否已存在
    for (auto it = nums.begin(); it != nums.end(); ++it) {
      int cur_value = *it;
      int cur_index = it - nums.cbegin();
      int pair_value = target - *it;

      // 另一个值及其下标已经存在，直接返回结果
      if (value_2_index.find(pair_value) != value_2_index.end()) {
        return {cur_index, value_2_index.at(pair_value)};
      }
      // 记录当前值及其下标
      value_2_index.insert({cur_value, cur_index});
    }

    return {};
  }
};
// @lc code=end
