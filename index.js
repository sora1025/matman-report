//JS --> AST Tree
const parser = require('@babel/parser');

const { transform } = require('@babel/core');

const transfer = require('./plugin/transfer')

const fs = require('fs');

const path = require('path');


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
    });
    return results;
}

function handleFile(arr) {
  arr.forEach(filepath => {
      const data = fs.readFileSync(filepath, 'utf-8');

      //修改AST
      const res = transform(`${data}`, {
        plugins: [require('./plugin/plugin')]
      })

      //AST --> JSON
      const resAST = parser.parse(res.code);

      //JSON --> report
      const report = transfer(resAST);

      //生成的report名
      const base = path.basename(filepath);

      const reportName = base.slice(0, base.indexOf('.'));

      //经过plugin转换后的代码
      // fs.existsSync('./transfer/transfer.js') && fs.unlinkSync('./transfer/transfer.js')
      // if(!fs.existsSync('./transfer')) {
      //   fs.mkdirSync('./transfer')
      // }
      // fs.writeFileSync('./transfer/transfer.js', res.code, 'utf-8')

      fs.existsSync(`./report/report-${reportName}.json`) && fs.unlinkSync(`./report/report-${reportName}.json`)
      if(!fs.existsSync('./report')) {
        fs.mkdirSync('./report')
      }
      fs.writeFileSync(`./report/report-${reportName}.json`, JSON.stringify(report,null,2), 'utf-8')
  })
}

handleFile(walk('./test/e2e-test'));









