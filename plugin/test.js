const path = require('path')

let pathname = '/report/test/e2e-test/index.test.js';

const res = (pathname) => {
  let file = path.basename(pathname);
  file = file.substring(file.indexOf('.')+1)
  return file;
}

console.log(res(pathname));
