// const React = require('react');
// const ReactDom = require('react-dom');

// const WordRelay = require('./WordRelay');

// ReactDom.render(<WordRelay />, document.querySelector('#root'));

const React = require('react');
const ReactDom = require('react-dom');
const { hot } = require('react-hot-loader/root'); // hot을 불러와서

const WordRelay = require('./WordRelay');

const Hot = hot(WordRelay); // WordRelay를 연결시킨다.

ReactDom.render(<Hot />, document.querySelector('#root'));