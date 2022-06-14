/*
 * @lc app=leetcode.cn id=208 lang=typescript
 *
 * [208] 实现 Trie (前缀树)
 */

// @lc code=start
/** 前缀树节点 */
class TrieNode {
  // 因为只有小写英文，所以每个节点最多只有26个子节点，0-1 位置分别对应 a-z
  public children: TrieNode | undefined[] = new Array(26);

  /** 构造前缀树时，经过该个节点的次数 */
  public pass: number = 0;

  /** 构造前缀树时，该节点作为字符串结尾的次数 */
  public end: number = 0;
}

class Trie {
  public root: TrieNode = new TrieNode();

  private static getIndexForChar(char: string): number {
    // 'a'的 ASCII 码值是 97
    return char.charCodeAt(0) - 97;
  }

  /** 向前缀树中插入字符串 */
  public insert(word: string): void {
    if (!word) return;
    // 从跟节点出发
    let node = this.root;
    node.pass++;

    // 遍历字符串的每个字符
    // eslint-disable-next-line no-restricted-syntax
    for (const char of word) {
      // 获取当前字符对应的子节点 index
      const index = Trie.getIndexForChar(char);
      // 如果子节点不存在，则创建一个新的节点
      node.children[index] ??= new TrieNode();
      // 前往子节点，并更新节点的 pass
      node = node.children[index];
      node.pass++;
    }
    // 字符串遍历完成，更新最后一个节点的end
    node.end++;
  }

  /** 向前缀树中移除插入过的字符串 */
  public delete(word: string): void {
    if (!this.search(word)) return;
    // 从跟节点出发
    let node = this.root;
    node.pass--;

    // eslint-disable-next-line no-restricted-syntax
    for (const char of word) {
      const index = Trie.getIndexForChar(char);
      // 在遍历过程中提前将下一个要遍历的节点减 1，如果发现下一个要遍历的节点 pass 归零了，说明接下来的节点都可以舍弃了
      if (--node.children[index].pass === 0) {
        node.children[index] = null;
        return;
      }
      node = node.children[index];
    }

    // 字符串遍历完成，更新最后一个节点的end
    node.end--;
  }

  /** 给定字符串加入过几次（是否加入过） */
  public search(word: string): boolean {
    if (!word) return false;
    // 从跟节点出发，遍历字符串的每个字符
    let node = this.root;
    // eslint-disable-next-line no-restricted-syntax
    for (const char of word) {
      const index = Trie.getIndexForChar(char);
      // 如果字符串还没遍历完就走不通了，说明没有该字符串
      if (!node.children[index]) return false;
      node = node.children[index];
    }

    // 字符串遍历完成，说明字符串存在
    return node.end > 0;
  }

  /** 以prefix开头的字符串加入的次数（是否有以prefix为前缀的字符串加入过） */
  public startsWith(prefix: string): boolean {
    if (!prefix) return false;
    // 从跟节点出发，遍历字符串的每个字符
    let node = this.root;
    // eslint-disable-next-line no-restricted-syntax
    for (const char of prefix) {
      const index = Trie.getIndexForChar(char);
      // 如果前缀还没遍历完就走不通了，说明没有以 prefix 为前缀的字符串
      if (!node.children[index]) return false;
      node = node.children[index];
    }

    // 字符串遍历完成，以 prefix 为前缀的字符串存在
    return node.pass > 0;
  }
}

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
// @lc code=end
