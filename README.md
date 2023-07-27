# jsx-render-to-html
转换 jsx 文件成 html 文件。

## 代码示例
```
var jsxRenderToHtml = require('jsx-render-to-html');
var renderToHtmlString = require('jsx-render-to-html/render-to-html-string');
var sourceJsxPath = ... // 要转换的 JSX 文件路径
var destHtmlPath = ... // 转换后的 HTML 文件路径

// 转换 jsx 文件成 html 文件
jsxRenderToHtml(sourceJsxPath, destHtmlPath);

// 转换时指定字符编码和是否美化格式处理
jsxRenderToHtml(sourceJsxPath, destHtmlPath, {
  encoding: 'utf8', // 默认 utf8 编码
  prettyFormat: true, // 默认不对生成的内容做美化格式处理
  deleteTempFile: true, // 默认删除临时生成的 JS 文件
  afterRender: null // 在保存到 html 文件前修改要保存的内容，比如 (html) => html.replaceAll('&#x27;', '\'')
});

// 转换 jsx 字符串成 html 字符串，在转换过程中会生成临时的 JS 文件做编译处理
var htmlString = renderToHtmlString('JSX字符串', {
  tempFilePath: 'temp.js', // 默认临时生成的 JS 文件路径是 ~jsx-render-to-html-temp-file.js
  prettyFormat: true, // 默认不对生成的内容做美化格式处理
  deleteTempFile: true, // 默认删除临时生成的 JS 文件
});
```

