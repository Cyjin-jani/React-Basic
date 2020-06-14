//const React = require('react');
//const ReactDOM = require('react-dom');
//const { hot } = require('react-hot-loader/root');

// import React from 'react';
// import { ReactDOM } from 'react-dom';
// import { hot } from 'react-hot-loader/root';

// import { TicTacToe } from './TicTacToe';
// //const TicTacToe = require('./TicTacToe');

// const Hot = hot(TicTacToe);

// ReactDOM.render(<Hot />, document.querySelector('#root'));



import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';

import TicTacToe from './TicTacToe';

const Hot = hot(TicTacToe);

ReactDOM.render(<Hot />, document.querySelector('#root'));