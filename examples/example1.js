"use strict";

var path = require('path');
var writeHtmlFileSync = require('../write-html-file-sync');

var jsxPath = path.join(__dirname, './jsx/example1.jsx');
var htmlPath = path.join(__dirname, './jsx/~example1.html');

writeHtmlFileSync(jsxPath, htmlPath, {
  prettyFormat: true
});