var postcss = require('postcss')
var expect= require('chai').expect

var plugin = require('../')

function test (input, output, opts, done) {
  postcss([plugin(opts)])
    .process(input, {from: undefined})
    .then((result) => {
      expect(result.css).to.eql(output);
      expect(result.warnings()).to.be.empty;
      done();
    })
    .catch((error) => {
      done(error);
    })
}

describe('postcss-wx-px2rpx', () => {
  it('replace pixel values', (done) => {
    test(`.title {
      font-size: 24px;
      background-image: url(../slice/icon-wh.png);
      margin: 0 0 0 5px;
      vertical-align: -1px;
      display: flex;
    }`, `.title {
      font-size: 24rpx;
      background-image: url(../slice/icon-wh.png);
      margin: 0 0 0 5rpx;
      vertical-align: -1rpx;
      display: flex;
    }`, {}, done)
  })

  it('rpx not be replaced', (done) => {
    test(`.title2 {
      padding: 20rpx 30px 2rem 4em;
    }`, `.title2 {
      padding: 20rpx 30rpx 2rem 4em;
    }`, {}, done)
  })

  it('pixel values not be replaced', (done) => {
    test(`.title3 {
      padding: 20rpx 30px 2rem 4em; /* no */
      margin: 40px;
      font-size: 24px; /* no */
    }`, `.title3 {
      padding: 20rpx 30px 2rem 4em;
      margin: 40rpx;
      font-size: 24px;
    }`, {
      comment: 'no'
    }, done)
  })

  it('replace pixel values with px / opts.divisor', (done) => {
    test(`.title4 {
      padding: 30px;
      margin: 40px;
    }`, `.title4 {
      padding: 10rpx;
      margin: 13.33rpx;
    }`, {
      divisor: 3,
      decimalPlaces: 2
    }, done)
  })

  it('replace pixel values with px * opts.multiple', (done) => {
    test(`.title5 {
      padding: 30px;
      margin: 40px;
    }`, `.title5 {
      padding: 60rpx;
      margin: 80rpx;
    }`, {
      multiple: 2
    }, done)
  })

  it('work in media', (done) => {
    test(`@media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2) {
      .word {
        margin-top: 30px;
        margin-bottom: 40px;
      }

      .word-retina {
        margin-top: 50px;
        margin-bottom: 60px;
      }
    }`, `@media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2) {
      .word {
        margin-top: 30rpx;
        margin-bottom: 40rpx;
      }

      .word-retina {
        margin-top: 50rpx;
        margin-bottom: 60rpx;
      }
    }`, {}, done)
  })

  it('work in keyframes', (done) => {
    test(`@keyframes anim {
      0% {
        width: 10px;
        height: 10px;
        font-size: 24px;
      }
      100% {
        width: 20px;
        height: 20px;
        font-size: 42px;
      }
    }`, `@keyframes anim {
      0% {
        width: 10rpx;
        height: 10rpx;
        font-size: 24rpx;
      }
      100% {
        width: 20rpx;
        height: 20rpx;
        font-size: 42rpx;
      }
    }`, {}, done)
  })
})
