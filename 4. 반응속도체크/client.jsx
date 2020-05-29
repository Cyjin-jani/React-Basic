const React = require('react');
const ReactDOM = require('react-dom');

const { hot } = require('react-hot-loader/root');


//const ResponseCheck = require('./ResponseCheck');
const ResponseCheckHOOKS = require('./ResponseCheckHOOKS');

const Hot = hot(ResponseCheckHOOKS);

ReactDOM.render(<Hot />, document.querySelector('#root'));