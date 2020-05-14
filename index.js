//JS --> AST Tree
const parser = require('@babel/parser');

const { transform } = require('@babel/core');

const transfer = require('./plugin/transfer')

const fs = require('fs');

const path = require('path');

// const data = fs.readFileSync('./test/e2e-test/case.test.js','utf-8')

let walk = function(dir) {
  var results = []
    var list = fs.readdirSync(dir);
    list.forEach(function(file) {
    	// 排除static静态目录（可按你需求进行新增）
        file = dir + '/' + file
        var stat = fs.statSync(file)
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file))
        } else {
          // 过滤后缀名（可按你需求进行新增）
            let temp = path.basename(file);
            if (temp.substring(temp.indexOf('.')+1) === 'test.js') {
                results.push(path.resolve(__dirname, file))
            }
        }
    })
    return results;
}

function dealScri(arr) {
  arr.forEach(filepath => {
      var fileStr = fs.readFileSync(filepath, 'utf-8')
//       fileStr = fileStr.replace(/[\n]|[\r]/g, "")
//        fileStr = fileStr.replace(/(\<head\>.*?)(\<script.*?\<\/script\>){1,}(.*\<\/head\>)/g, '$1$3')
      fs.writeFileSync(filepath, fileStr)
  })
}

dealScri(walk('./test/e2e-test'));





//修改AST
// const res = transform(`${data}`, {
//   plugins: [require('./plugin/plugin')]
// })

//AST --> JSON
// const resAST = parser.parse(res.code);

//JSON --> report
// const report = transfer(resAST);

// 经过plugin转换后的代码
// fs.existsSync('./transfer/transfer.js') && fs.unlinkSync('./transfer/transfer.js')
// if(!fs.existsSync('./transfer')) {
//   fs.mkdirSync('./transfer')
// }
// fs.writeFileSync('./transfer/transfer.js', res.code, 'utf-8')

// fs.existsSync('./report/report.json') && fs.unlinkSync('./report/report.json')
// if(!fs.existsSync('./report')) {
//   fs.mkdirSync('./report')
// }
// fs.writeFileSync('./report/report.json', JSON.stringify(report,null,2), 'utf-8')




