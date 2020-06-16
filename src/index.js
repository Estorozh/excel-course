import './scss/style.scss'

console.log(1);

async function start() {
  return await Promise.resolve('async working!s');
}

start().then(console.log)
