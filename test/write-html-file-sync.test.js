"use strict";

var assert = require('assert');
var path = require('path');
var fs = require('fs');
var writeHtmlFileSync = require('../write-html-file-sync');

describe('writeHtmlFileSync', function () {

  describe('test', function () {
    it('case 1', function () {
      var jsxPath = path.join(__dirname, './jsx/test-example1.jsx');
      var htmlPath = path.join(__dirname, './jsx/~test-example1.html');

      writeHtmlFileSync(jsxPath, htmlPath);
      var htmlContent = fs.readFileSync(htmlPath, {
        encoding: 'utf8',
        flag: 'r'
      });

      assert.equal(htmlContent, '<h1><span>Hello, world!</span></h1>');
    });
  });

});
