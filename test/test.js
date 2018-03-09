var should = require('should');
var vfs = require('vinyl-fs');
var through2 = require('through2');
var postcss = require('gulp-postcss');
var noop = function () {};
var lazyimagecss = require('../index.js');

describe('postcss-lazyimagecss Unit est', function() {
	it('Image `width` -> should be able to get `width` properties.', function(done) {
		vfs.src('./test/src/css/style.css')
			.pipe(postcss([lazyimagecss({
				imagePath: ['../img','../slice']
			})]))
			.pipe(through2.obj(function(file, enc, cb){
				content = file.contents.toString();
				content.match(/width/g).length.should.equal(14);
				cb();
			}))
			.on('data', noop)
			.on('end', done);
	});

	it('Image `height` -> should be able to get `height` properties.', function(done) {
		vfs.src('./test/src/css/style.css')
			.pipe(postcss([lazyimagecss({
				imagePath: ['../img','../slice']
			})]))
			.pipe(through2.obj(function(file, enc, cb){
				content = file.contents.toString();
				content.match(/height/g).length.should.equal(12);
				cb();
			}))
			.on('data', noop)
			.on('end', done);
	});

	it('Image `background-size` -> should be able to get `background-size` properties.', function(done) {
	vfs.src('./test/src/css/style.css')
		.pipe(postcss([lazyimagecss({
			imagePath: ['../img','../slice']
		})]))
		.pipe(through2.obj(function(file, enc, cb){
			content = file.contents.toString();
			content.match(/background-size/g).length.should.equal(7);
			cb();
		}))
		.on('data', noop)
		.on('end', done);
	});

	it('`width` value -> should be able to get correct width value.', function(done) {
		vfs.src('./test/src/css/style.css')
			.pipe(postcss([lazyimagecss({
				imagePath: ['../img','../slice']
			})]))
			.pipe(through2.obj(function(file, enc, cb){
				content = file.contents.toString();
				content.indexOf('width: 14px').should.be.above(0);
				cb();
			}))
			.on('data', noop)
			.on('end', done);
	});

	it('`height` value -> should be able to get correct height value.', function(done) {
		vfs.src('./test/src/css/style.css')
			.pipe(postcss([lazyimagecss({
				imagePath: ['../img','../slice']
			})]))
			.pipe(through2.obj(function(file, enc, cb){
				content = file.contents.toString();
				content.indexOf('height: 16px').should.be.above(2);
				cb();
			}))
			.on('data', noop)
			.on('end', done);
	});

	it('`background-size` value -> should be able to get correct height value.', function(done) {
		vfs.src('./test/src/css/style.css')
			.pipe(postcss([lazyimagecss({
				imagePath: ['../img','../slice']
			})]))
			.pipe(through2.obj(function(file, enc, cb){
				content = file.contents.toString();
				content.indexOf('background-size: 14px 14px').should.be.above(0);
				cb();
			}))
			.on('data', noop)
			.on('end', done);
	});


	it(' Option: imagePath -> should work with another Option of imagePath.', function(done) {
		vfs.src('./test/src/css/style.css')
			.pipe(postcss([lazyimagecss({
				imagePath: ['../slice']
			})]))
			.pipe(through2.obj(function(file, enc, cb){
				content = file.contents.toString();
				content.match(/width/g).length.should.equal(12);
				content.match(/height/g).length.should.equal(10);
				content.match(/background-size/g).length.should.equal(7);
				cb();
			}))
			.on('data', noop)
			.on('end', done);
	});

	it(' Option: width -> should work when disable Option width.', function(done) {
		vfs.src('./test/src/css/style.css')
			.pipe(postcss([lazyimagecss({
				imagePath: ['../slice'],
				width: false
			})]))
			.pipe(through2.obj(function(file, enc, cb){
				content = file.contents.toString();
				content.match(/width/g).length.should.equal(4);
				cb();
			}))
			.on('data', noop)
			.on('end', done);
	});

	it(' Option: height -> should work when disable Option height.', function(done) {
		vfs.src('./test/src/css/style.css')
			.pipe(postcss([lazyimagecss({
				imagePath: ['../slice'],
				height: false
			})]))
			.pipe(through2.obj(function(file, enc, cb){
				content = file.contents.toString();
				content.match(/height/g).length.should.equal(1);
				cb();
			}))
			.on('data', noop)
			.on('end', done);
	});

	it(' Option: backgroundSize -> should work when disable Option backgroundSize.', function(done) {
		vfs.src('./test/src/css/style.css')
			.pipe(postcss([lazyimagecss({
				imagePath: ['../slice'],
				backgroundSize: false
			})]))
			.pipe(through2.obj(function(file, enc, cb){
				content = file.contents.toString();
				content.match(/background-size/g).length.should.equal(3);
				cb();
			}))
			.on('data', noop)
			.on('end', done);
	});

	it(' Multi path support -> should work in Multi path.', function(done) {
		vfs.src('./test/src/css/second/second.css')
			.pipe(postcss([lazyimagecss({
				imagePath: ['../../slice']
			})]))
			.pipe(through2.obj(function(file, enc, cb){
				content = file.contents.toString();
				content.match(/width/g).length.should.equal(2);
				content.match(/height/g).length.should.equal(2);
				content.indexOf('width: 100px').should.be.above(0);
				cb();
			}))
			.on('data', noop)
			.on('end', done);
	});
});

