"use strict";

var babelCore = require('@babel/core');
var reactDOMServer = require('react-dom/server');
var fs = require('fs');
var path = require('path');

module.exports = renderToHtmlString;

const DEFAULT_TEMP_FILE_PATH = '~jsx-render-to-html-temp-file.js';

/**
 * @description 转换 jsx 内容成 html 内容
 * @param {string} jsxContent 
 * @param {object} [options]
 */
function renderToHtmlString(jsxContent, options) {
  if (jsxContent === null || jsxContent === undefined) {
    return '';
  }

  options = (options || {});
  var tempFilePath = (options.tempFilePath || DEFAULT_TEMP_FILE_PATH);

  // 转换 JSX 成 JS 脚本
  var transformResult = babelCore.transformSync(jsxContent, {
    "presets": [
      [
        "@babel/preset-react",
        {
          "pragma": "React.createElement",
          "pragmaFrag": "React.Fragment",
          "throwIfNamespace": true,
          "runtime": "classic"
        }
      ]
    ]
  });

  // 写入 JS 内容到临时文件
  var jsContent = transformResult.code;
  fs.writeFileSync(tempFilePath, jsContent);
  // 加载 JS 脚本
  var reactElement = require(tempFilePath);
  // 渲染成 HTML 字符串
  var htmlContent = reactDOMServer.renderToStaticMarkup(reactElement);
  // 删除 JS 临时脚本
  fs.unlink(tempFilePath, function (err) {
    //
  });

  return htmlContent;
}
