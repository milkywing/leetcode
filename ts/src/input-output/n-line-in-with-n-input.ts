import readline from 'readline';

/** 处理多行输入（行数由输入指定） */
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/** 输入指定的行数 */
let num = 0;
const inputs: string[] = [];

rl.on('line', (line) => {
  if (num === 0) {
    num = parseInt(line, 10);
  } else {
    inputs.push(line);
  }
  // 到达目标行数，可以执行算法
  if (inputs.length === num) {
    console.log(inputs);
  }
});
