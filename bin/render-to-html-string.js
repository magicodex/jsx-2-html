"use strict";

var fs = require('fs');
var reactDOMServer = require('react-dom/server');
var transformJsxToJs = require('./transform-jsx-to-js');

module.exports = renderToHtmlString;

const OPTIONS_TEMP_FILE_PATH_DEFAULT = '~jsx-render-to-html-temp-file.js';

/**
 * @description 转换 jsx 内容成 html 内容
 * @param {string} jsxContent 
 * @param {object} [options]
 * @returns {string}
 */
function renderToHtmlString(jsxContent, options) {
  if (jsxContent === null || jsxContent === undefined) {
    return '';
  }

  options = (options || {});
  var tempFilePath = (options.tempFilePath || OPTIONS_TEMP_FILE_PATH_DEFAULT);
  var prettyFormat = (options.prettyFormat === true);
  var deleteTempFile = !(options.deleteTempFile === false);

  // 转换 JSX 成 JS 脚本
  var jsContent = transformJsxToJs(jsxContent, {
    prettyFormat: prettyFormat
  });

  // 写入 JS 内容到临时文件
  fs.writeFileSync(tempFilePath, jsContent);
  // 加载 JS 脚本
  var reactElement = require(tempFilePath);
  // 渲染成 HTML 字符串
  var htmlContent = reactDOMServer.renderToStaticMarkup(reactElement);

  if (deleteTempFile) {
    // 删除 JS 临时脚本
    fs.unlink(tempFilePath, function (err) {
      //
    });
  }

  return htmlContent;
}
