//JS --> AST Tree
const parser = require('@babel/parser');

//遍历递归AST节点
const traverse = require('@babel/traverse');

//对具体的AST节点进行修改
const types = require('@babel/types');

const { transform } = require('@babel/core');

const fs = require('fs');

const data = fs.readFileSync('./index.test.js','utf-8')

const res = transform(`${data}`, {
  plugins: [require('./plugin')]
})

fs.existsSync('./after.js') && fs.unlinkSync('./after.js')
fs.writeFileSync('./after.js', res.code, 'utf-8')