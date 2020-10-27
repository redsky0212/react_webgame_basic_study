// const React = require('react');
// const { Component } = React;
import React, {Component} from 'react';
import WordRelayHooks from './WordRelayHooks';

class WordRelay extends React.Component {
  state = {
    word: '레드스카이',
    value: '',
    result: '',
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
      this.setState({
        result: '딩동댕',
        word: this.state.value,
        value: '',
      });
      this.input.focus();
    } else {
      this.setState({
        result: '땡',
        value: '',
      });
      this.input.focus();
    }
  };

  onChangeInput = (e) => {
    this.setState({ value: e.target.value });
  };

  onRefInput = (c) => {
    this.input = c;
  };

  render() {
    return (
      <>
        <div>{this.state.word}</div>
        <form onSubmit={this.onSubmitForm}>
          <input ref={this.onRefInput} value={this.state.value} onChange={this.onChangeInput} />
          <button>클릭!</button>
        </form>
    <div>{this.state.result}</div>
    <ul>
          {['like', 'like', 'like', 'like'].map(() => {
            return (
              <li>like</li>
            );
          })}
        </ul>
      </>
    );
  }
}

// module.exports = WordRelay;
export default WordRelay;