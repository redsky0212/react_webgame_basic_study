// const React = require('react');
// const ReactDom = require('react-dom');

// const WordRelay = require('./WordRelay');

// ReactDom.render(<WordRelay />, document.querySelector('#root'));

// const React = require('react');
// const ReactDom = require('react-dom');
// const { hot } = require('react-hot-loader/root'); // hot을 불러와서
// const WordRelayHooks = require('./NumberBaseball');

// const Hot = hot(WordRelayHooks); // WordRelay를 연결시킨다.

// ReactDom.render(<Hot />, document.querySelector('#root'));

// import React from 'react';
// import ReactDom from 'react-dom';
// import { hot } from 'react-hot-loader/root'; // hot을 불러와서
// import WordRelayHooks from './ResponseCheckHooks';

// const Hot = hot(WordRelayHooks); // WordRelay를 연결시킨다.

// ReactDom.render(<Hot />, document.querySelector('#root'));

import React from 'react';
import ReactDom from 'react-dom';
import WordRelay from './NumberBaseballHooks';

ReactDom.render(<WordRelay />, document.querySelector('#root'));