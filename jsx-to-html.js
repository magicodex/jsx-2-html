"use strict";

var babelCore = require('@babel/core');
var reactDOMServer = require('react-dom/server');
var fs = require('fs');
var path = require('path');

module.exports = jsxToHtml;

/**
 * @description 转换 jsx 文件成 html 文件
 * @param {string} jsxPath 
 * @param {string} htmlPath 
 * @param {object} [options]
 */
function jsxToHtml(jsxPath, htmlPath, options) {
  if (jsxPath === null || jsxPath === undefined) {
    throw new Error('argument#0 "jsxPath" is null/undefined');
  }

  if (htmlPath === null || htmlPath === undefined) {
    throw new Error('argument#1 "htmlPath" is null/undefined');
  }

  options = (options || {});
  var encoding = (options.encoding || 'utf8');

  // 读取 JSX 文件内容
  var jsxContent = fs.readFileSync(jsxPath, {
    encoding: encoding,
    flag: 'r'
  });

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

  var basePath = path.dirname(jsxPath);
  var jsxName = path.basename(jsxPath);
  var jsName = '~' + jsxName + '.js';
  var tempJsPath = path.join(basePath, jsName);

  // 写入 JS 内容到临时文件
  var jsContent = transformResult.code;
  fs.writeFileSync(tempJsPath, jsContent);
  // 加载 JS 脚本
  var reactElement = require(tempJsPath);
  // 渲染成 HTML 字符串
  var htmlContent = reactDOMServer.renderToStaticMarkup(reactElement);

  // 写入 HTML 到目的文件
  fs.writeFileSync(htmlPath, htmlContent);
  // 删除 JS 临时脚本
  fs.unlink(tempJsPath, function (err) {
    //
  });
}
