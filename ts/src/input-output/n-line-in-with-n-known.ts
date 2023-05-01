import readline from 'readline';

/** 处理多行输入（行数事先明确） */
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 应该输入的行数
const num = 2;
let inputs: string[] = [];

rl.on('line', (line) => {
  inputs.push(line);
  if (inputs.length === num) {
    // 到达目标行数，可以执行算法
    console.log(inputs);
    // 处理完一组数据后需要清空 inputs，使其容纳下一组数据
    inputs = [];
  }
});
