import './scss/style.scss'

async function start() {
  return await Promise.resolve('async working!s');
}

start().then(console.log)
