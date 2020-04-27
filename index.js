//JS --> AST Tree
const parser = require('@babel/parser');

const { transform } = require('@babel/core');

const fs = require('fs');

const transfer = require('./plugin/transfer')

const data = fs.readFileSync('./test/index.test.js','utf-8')

const res = transform(`${data}`, {
  plugins: [require('./plugin/plugin')]
})

const resAST = parser.parse(res.code);

const report = transfer(resAST);

fs.existsSync('./transfer/after.js') && fs.unlinkSync('./transfer/after.js')
fs.writeFileSync('./transfer/after.js', res.code, 'utf-8')

fs.existsSync('./transfer/rawJSON.json') && fs.unlinkSync('./transfer/rawJSON.json')
fs.writeFileSync('./transfer/rawJSON.json', JSON.stringify(resAST,null,2), 'utf-8')

fs.existsSync('./report/report.json') && fs.unlinkSync('./report/report.json')
fs.writeFileSync('./report/report.json', JSON.stringify(report,null,2), 'utf-8')




