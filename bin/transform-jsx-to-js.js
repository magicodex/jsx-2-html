"use strict";

var babelCore = require('@babel/core');
var beautifyJs = require('js-beautify/js').js;

module.exports = transformJsxToJs;

/**
 * @description 转换 jsx 内容成 js 内容
 * @param {string} jsxContent 
 * @param {object} [options]
 * @returns {string}
 */
function transformJsxToJs(jsxContent, options) {
  if (jsxContent === null || jsxContent === undefined) {
    return '';
  }

  options = (options || {});
  var prettyFormat = (options.prettyFormat === true);

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
      wrap_line_length: 120,
      space_in_empty_paren: true
    });
  }

  return jsContent;
}
