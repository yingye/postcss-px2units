[English](./README.md) | 简体中文

# postcss-px2units

[![Build Status](https://travis-ci.org/yingye/postcss-px2units.svg?branch=master)](https://travis-ci.org/yingye/postcss-px2units)
[![npm version](https://badge.fury.io/js/postcss-px2units.svg)](https://badge.fury.io/js/postcss-px2units)
[![change-log](https://img.shields.io/badge/changelog-md-blue.svg)](https://github.com/yingye/postcss-px2units/blob/master/CHANGELOG.md)

将 px 单位转换为 rpx 单位，或者其他单位的 [PostCSS](https://github.com/ai/postcss)插件。

## Install

```
$ npm install postcss-px2units --save-dev
```

## Usage

### Input/Output

如果使用 默认的 opts，将会得到如下的输出。

```css
/* input */
p {
  margin: 0 0 20px;
  font-size: 32px;
  line-height: 1.2;
  letter-spacing: 1px; /* no */
}

/* output */
p {
  margin: 0 0 20rpx;
  font-size: 32rpx;
  line-height: 1.2;
  letter-spacing: 1px;
}
```

### Example

```js
var fs = require('fs');
var postcss = require('postcss');
var pxtorem = require('postcss-pxtorem');
var css = fs.readFileSync('main.css', 'utf8');
var options = {
    replace: false
};
var processedCss = postcss(pxtorem(options)).process(css).css;

fs.writeFile('main-rem.css', processedCss, function (err) {
  if (err) {
    throw err;
  }
  console.log('Rem file written.');
});
```

### options

Type: Object | Null

Default:

```js
{
  divisor: 1,
  multiple: 1,
  decimalPlaces: 2,
  comment: 'no',
  targetUnits: 'rpx'
}
```

Detail:

- divisor(Number): 除数，转换后的值 等于 pixel / divisor
- multiple(Number): 倍数，转换后的值 等于 pixel * multiple
- decimalPlaces(Number): 小数点后保留的位数，例如, `width: 100px` 中的100，将会被转换成 `Number(100 / divisor * multiple).toFixed(decimalPlaces)`
- comment(String): 不转换px单位的注释，默认为 `/*no*/`。如果设置 comment 的值为 'not replace', `width: 100px; /* not replace */` 中的100px将不会被转换为 rpx。
- targetUnits(String): 转换单位，默认值为 rpx，如果设置其值为 'rem'，px将会被转换为rem。

### Use with gulp-postcss

```js
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var pxtounits = require('postcss-pxtounits');

gulp.task('css', function () {
  return gulp.src('./test/src/css/**/*.css')
    .pipe(postcss([pxtounits()]))
    .pipe(gulp.dest('./test/dist/css'));
});
```

## Tips

如果你想要在 WePY 框架中使用, 请参考 [wepy-plugin-px2units](https://github.com/yingye/wepy-plugin-px2units)
