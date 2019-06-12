var postcss = require('postcss');
var assign = require('object-assign');

module.exports = postcss.plugin('postcss-px2units', function (opts) {
  opts = opts || {};
  opts = assign({
    divisor: 1,
    multiple: 1,
    decimalPlaces: 2,
    targetUnits: 'rpx',
    comment: 'no',
    disableAllComment: 'postcss-px2units-disable',
    enableAllComment: 'postcss-px2units-enable'
  }, opts);

  function repalcePx(str) {
    if (!str) {
      return '';
    }

    return str.replace(/\b(\d+(\.\d+)?)px\b/ig, function (match, x) {
      var size = x * opts.multiple / opts.divisor;
      return size % 1 === 0 ? size + opts.targetUnits : size.toFixed(opts.decimalPlaces) + opts.targetUnits;
    });
  }

  return function (root) {
    var enabled = true;
    root.walk(function (item) {
      if (item && item.type === 'decl' && enabled) {
        if (item.next() && item.next().type === 'comment' && item.next().text === opts.comment) {
          item.next().remove();
        } else {
          item.value = repalcePx(item.value);
        }
      } else if (item && item.type === 'comment') {
        if (item.text === opts.disableAllComment) {
          enabled = false;
          item.remove();
        } else if (item.text === opts.enableAllComment) {
          enabled = true;
          item.remove();
        }
      }
    });
  };
});
