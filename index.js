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

fs.existsSync('./transfer/transfer.js') && fs.unlinkSync('./transfer/transfer.js')
if(!fs.existsSync('./transfer')) {
  fs.mkdirSync('./transfer')
}
fs.writeFileSync('./transfer/transfer.js', res.code, 'utf-8')

fs.existsSync('./report/report.json') && fs.unlinkSync('./report/report.json')
if(!fs.existsSync('./report')) {
  fs.mkdirSync('./report')
}
fs.writeFileSync('./report/report.json', JSON.stringify(report,null,2), 'utf-8')




