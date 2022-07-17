/*
 * @lc app=leetcode.cn id=165 lang=typescript
 *
 * [165] 比较版本号
 */

// @lc code=start
/**
 * 方案A（本解）：从左到右逐个字符扫描版本号，比较每一个区域的大小
 * 方案B：直接 split 得到每个区域的大小，然后比较
 */
function compareVersion(version1: string, version2: string): number {
  // 双指针分别扫描两个版本号，计算每个区域的大小并比较，相等就前往下一个区域继续比较
  let [p1, p2] = [0, 0];
  const [length1, length2] = [version1.length, version2.length];

  while (p1 < length1 || p2 < length2) {
    // 计算 version1 当前区域的大小，以'.'为区域边界
    let num1 = 0;
    while (p1 < length1 && version1[p1] !== '.') {
      num1 = num1 * 10 + version1[p1].charCodeAt(0) - 48;
      p1++;
    }
    // 跳过'.'
    p1++;

    // 计算 version2 当前区域的大小，同理
    let num2 = 0;
    while (p2 < length2 && version2[p2] !== '.') {
      num2 = num2 * 10 + version2[p2].charCodeAt(0) - 48;
      p2++;
    }
    p2++;

    // 比较两者当前区域的大小
    if (num1 !== num2) {
      return num1 > num2 ? 1 : -1;
    }
  }

  // 跳出了循环，说明两个版本号相等
  return 0;
}

/** 直接 split 得到每个区域的大小 */
const compareVersionB = (version1: string, version2: string): number => {
  const [nums1, nums2] = [
    version1.split('.').map((item) => Number(item)),
    version2.split('.').map((item) => Number(item)),
  ];

  while (nums1.length || nums2.length) {
    const [num1 = 0, num2 = 0] = [nums1.shift(), nums2.shift()];
    if (num1 !== num2) {
      return num1 > num2 ? 1 : -1;
    }
  }

  return 0;
};
// @lc code=end
