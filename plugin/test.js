const args = {
  "plevel": "p0",
  "author": "sora"
}

const desObj = {
  "author": "aimer"
}

const newObj = Object.assign({}, args, desObj);

console.log(newObj)