"use strict";

var path = require('path');
var jsToHtml = require('../jsx-to-html');

var jsxPath = path.join(__dirname, './jsx/ul-list.jsx');
var htmlPath = path.join(__dirname, './jsx/~ul-list.html');

jsToHtml(jsxPath, htmlPath);