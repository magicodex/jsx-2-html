var React = require('react');

module.exports = function (props) {
  var children = [];

  props.data.forEach(function (text, index) {
    children.push(React.createElement('li', { key: index }, text))
  });

  return React.createElement('ul', null, children);
};
