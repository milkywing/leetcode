import readline from 'readline';

/** 处理单行输入 */
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (oneLine) => {
  console.log(oneLine);
});
