const merge = require('deepmerge')

module.exports = function({ type: t }) {
  return {
    visitor: {
      VariableDeclaration(path) {
        path.remove()
      },   
      FunctionExpression(path) {
        const parent = path.parent;
        const name = parent.callee.name

        //移除除describe以外函数的第二个函数参数
        if(name !== 'describe') {
          path.remove();
        }
        
        //同步子节点和父节点的arguments[2]对象
        if(parent.arguments[2]) {
          const args = parent.arguments[2];
          path.node.body.body.map(item=>{
            if(item.expression) {
              
              //子节点有第三个参数
              if(item.expression.arguments[2]) {
                let desObj = item.expression.arguments[2];
                let newDesObj = merge(args, desObj);
                item.expression.arguments[2] = newDesObj;
              }
              //子节点没有第三个参数
              else {
                item.expression.arguments.push(args)
              }
            }
          })  
        }
      },

      //删除timeout和before节点
      ExpressionStatement(path) {
        const node = path.node;
        const timeout = node.expression.callee
        if(timeout.property) {
          path.remove()
        }
        const before = node.expression.callee
        if(before.name == 'before') {
          path.remove()
        }
      },
    },
  }
}

