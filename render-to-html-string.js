"use strict";

var fs = require('fs');
var path = require('path');
var babelCore = require('@babel/core');
var reactDOMServer = require('react-dom/server');
var beautifyJs = require('js-beautify/js').js;

module.exports = renderToHtmlString;

const OPTIONS_TEMP_FILE_PATH_DEFAULT = '~jsx-render-to-html-temp-file.js';
const OPTIONS_PRETTY_FORMAT_DEFAULT = false;

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
  var tempFilePath = (options.tempFilePath || OPTIONS_TEMP_FILE_PATH_DEFAULT);
  var prettyFormat = (options.prettyFormat || OPTIONS_PRETTY_FORMAT_DEFAULT);

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

  var jsContent = transformResult.code;
  // 美化 JS 内容
  if (prettyFormat) {
    jsContent = beautifyJs(jsContent, {
      indent_size: 2,
      space_in_empty_paren: true
    });
  }

  // 写入 JS 内容到临时文件
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
