const React = require('react');
const ReactDOM = require('react-dom');

const { hot } = require('react-hot-loader/root');

//const NumberBaseBall = require('./RenderTest');
const NumberBaseBall = require('./NumberBaseBallHOOKS');

const Hot = hot(NumberBaseBall);

ReactDOM.render(<Hot />, document.querySelector('#root'));