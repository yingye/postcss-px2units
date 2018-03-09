var postcss = require('postcss')
var assign = require('object-assign')

module.exports = postcss.plugin('postcss-pxtotarget', function (opts) {
  opts = opts || {}
  opts = assign({
    divisor: 1,
    multiple: 1,
    decimalPlaces: 2,
    targetTxt: 'rpx',
    comment: 'no'
  }, opts)

  function repalcePx (str) {
    if (!str) return ''
    return str.replace(/([0-9.]+)px/ig, function (match, x) {
      var size = x * opts.multiple / opts.divisor
      console.log('size', size)
      return size % 1 === 0 ? size + opts.targetTxt : size.Fixed(opts.decimalPlaces) + opts.targetTxt
    })
  }

  return function (root) {
    root.walkDecls(function (decl) {
      if (!(decl && decl.next() && decl.next().type === 'comment' && decl.next().text === opts.comment)) {
        decl.value = repalcePx(decl.value)
      }
    })
  }
})
