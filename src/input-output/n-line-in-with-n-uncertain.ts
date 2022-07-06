import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const inputs: string[] = [];

rl.on('line', (line) => {
  inputs.push(line);
});

// 输入结束时，可以执行算法
rl.on('close', () => {
  console.log(inputs);
});
