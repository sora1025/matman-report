module.exports = function({ type: t }) {
  return {
    visitor: {
      VariableDeclaration(path) {
        path.remove()
      },   
      FunctionExpression(path) {
        const parent = path.parent;
        const name = parent.callee.name
        if(name !== 'describe') {
          path.remove();
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
      }
      
    },
  }
}

