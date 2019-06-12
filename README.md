English | [简体中文](./README_CN.md)

# postcss-px2units

[![Build Status](https://travis-ci.org/yingye/postcss-px2units.svg?branch=master)](https://travis-ci.org/yingye/postcss-px2units)
[![npm version](https://badge.fury.io/js/postcss-px2units.svg)](https://badge.fury.io/js/postcss-px2units)
[![change-log](https://img.shields.io/badge/changelog-md-blue.svg)](https://github.com/yingye/postcss-px2units/blob/master/CHANGELOG.md)

A plugin for [PostCSS](https://github.com/ai/postcss) that generates rpx units from pixel units, it also can generate units which you want.

## Install

```
$ npm install postcss-px2units --save-dev
```

## Usage

### Input/Output

With the default settings, we will get this output.

```css
/* input */
p {
  margin: 0 0 20px;
  font-size: 32px;
  line-height: 1.2;
  letter-spacing: 1px; /* no */
  /* postcss-px2units-disable */
  box-shadow: 4px 4px 2px 2px #777;
  /* postcss-px2units-enable */
  padding: 8px;
}

/* output */
p {
  margin: 0 0 20rpx;
  font-size: 32rpx;
  line-height: 1.2;
  letter-spacing: 1px;
  box-shadow: 4px 4px 2px 2px #777;
  padding: 8rpx;
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
  targetUnits: 'rpx',
  disableAllComment: 'postcss-px2units-disable',
  enableAllComment: 'postcss-px2units-enable'
}
```

Detail:

- divisor(Number): divisor, replace pixel value with pixel / divisor.
- multiple(Number): multiple, replace pixel value with pixel * multiple.
- decimalPlaces(Number): the number of decimal places. For example, the css code is `width: 100px`, we will get the vaule is `Number(100 / divisor * multiple).toFixed(decimalPlaces)`.
- comment(String): default value is 'no'. For example, if you set it 'not replace', the css code `width: 100px; /* not replace */` will be translated to `width: 100px;`
- disableAllComment(String): comment value for disabling translation of subsequent declarations. Default value is 'postcss-px2units-disable'. If you set it to 'not replace all', `width: 100px; /* not replace all */ height: 50px;` will be translated to `width: 100rpx; height: 50px;`
- enableAllComment(String): comment value for enabling translation of subsequent declarations. Default value is 'postcss-px2units-enable'. If you set it to 'replace all' and set disableAllComment to 'not replace all', `width: 100px; /* not replace all */ height: 50px; /* replace all */ margin: 10px;` will be translated to `width: 100rpx; height: 50px; margin: 10rpx;`
- targetUnits(String): The units will replace pixel units, you can set it 'rem'.

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

If you want to use it in WePY, please use [wepy-plugin-px2units](https://github.com/yingye/wepy-plugin-px2units).
