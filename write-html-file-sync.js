"use strict";

var fs = require('fs');
var path = require('path');
var beautifyHtml = require('js-beautify/js').html;
var renderToHtmlString = require('./render-to-html-string');

module.exports = writeHtmlFileSync;

const OPTIONS_ENCODING_DEFAULT = 'utf8';
const OPTIONS_PRETTY_FORMAT_DEFAULT = false;

/**
 * @description 转换 jsx 文件成 html 文件
 * @param {string} jsxPath 
 * @param {string} htmlPath 
 * @param {object} [options]
 */
function writeHtmlFileSync(jsxPath, htmlPath, options) {
  if (jsxPath === null || jsxPath === undefined) {
    throw new Error('argument#0 "jsxPath" is null/undefined');
  }

  if (htmlPath === null || htmlPath === undefined) {
    throw new Error('argument#1 "htmlPath" is null/undefined');
  }

  options = (options || {});
  var encoding = (options.encoding || OPTIONS_ENCODING_DEFAULT);
  var prettyFormat = (options.prettyFormat || OPTIONS_PRETTY_FORMAT_DEFAULT);
  var afterRender = options.afterRender;

  // 读取 JSX 文件内容
  var jsxContent = fs.readFileSync(jsxPath, {
    encoding: encoding,
    flag: 'r'
  });

  var basePath = path.dirname(jsxPath);
  var jsxName = path.basename(jsxPath);
  var jsName = '~' + jsxName + '.js';
  var tempJsPath = path.join(basePath, jsName);

  // 渲染成 HTML 字符串
  var htmlContent = renderToHtmlString(jsxContent, {
    tempFilePath: tempJsPath,
    prettyFormat: prettyFormat,
    afterRender: afterRender
  });

  // 美化 HTML 内容
  if (prettyFormat) {
    htmlContent = beautifyHtml(htmlContent, {
      indent_size: 2,
      wrap_line_length: 120
    });
  }

  if (typeof afterRender === 'function') {
    htmlContent = afterRender(htmlContent);
  }

  // 写入 HTML 到目的文件
  fs.writeFileSync(htmlPath, htmlContent);
}
