module.exports = function Transfer(raw) {

  const body = raw.program.body;

  const TransferRaw = function (body) {
   
    let suites = [];

    body.map((item,index) => {  
      let res = {};
      let title = item.expression.arguments[0] || '';
      let fnBody, desObj;

      //第三个参数存在证明第二个参数（函数体）存在
      if(item.expression.arguments[2]) {
        fnBody = item.expression.arguments[1];
        desObj = item.expression.arguments[2];
      }else {
        desObj = item.expression.arguments[1];
      }

      title = title.value;
      res['title'] = title;

      //遍历标志对象，添加进res
      if(desObj) {
        const keywords = {};

        desObj.properties.map(item => {
          keywords[item.key.name] = item.value.value;
        })

        res['desObj'] = keywords;
      }

      suites.push(res);

      //如果fnBody存在，就应该有suites字段，该字段为res数组，应该在递归后添加
      if(fnBody) {
        // 递归
        res['suites'] = TransferRaw(fnBody.body.body)
        // console.log(res);
      }
      
    })
    return suites;
  }
  return TransferRaw(body);
}



