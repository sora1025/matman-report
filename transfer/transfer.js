describe('simple.html：常规检查-普通静态页面', function () {
  describe('检查基本信息', function () {
    it('顶层图片检查通过', {
      author: '小焦',
      plevel: 'p1',
      des: '我是最外层的describe',
      author: '小宁',
      plevel: 'p3'
    });
    it('规则文案检查通过', {
      author: '小焦',
      plevel: 'p1',
      des: '我是最外层的describe',
      author: '小张'
    });
    it('按钮样式检查通过', {
      author: '小焦',
      plevel: 'p1',
      des: '我是最外层的describe'
    });
    it('文字单行检查通过', {
      author: '小焦',
      plevel: 'p1',
      des: '我是最外层的describe'
    });
  }, {
    author: '小焦',
    plevel: 'p1',
    des: '我是最外层的describe'
  });
}, {
  author: '小焦',
  plevel: 'p1',
  des: '我是最外层的describe'
});