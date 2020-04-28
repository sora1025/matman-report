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

        //同步子节点和父节点的author字段
        if(parent.arguments[2]) {
          const args = parent.arguments[2];
          if(path.node.body.body.expression){
            
          }
          console.log(path.node.body.body.expression);
          
          
          

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

