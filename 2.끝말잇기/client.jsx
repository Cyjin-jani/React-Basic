const React = require('react');
const ReactDom = require('react-dom');
const { hot } = require('react-hot-loader/root'); //뒤의 root쓰는 것은 고정.

const WordRelay = require('./WordRelay');

const Hot = hot(WordRelay);

ReactDom.render(<Hot />, document.querySelector('#root'));

