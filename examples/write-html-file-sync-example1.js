"use strict";

var path = require('path');
var writeHtmlFileSync = require('../write-html-file-sync');

var jsxPath = path.join(__dirname, './jsx/ul-list.jsx');
var htmlPath = path.join(__dirname, './jsx/~ul-list.html');

writeHtmlFileSync(jsxPath, htmlPath);