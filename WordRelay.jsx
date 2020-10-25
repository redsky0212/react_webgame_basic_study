const React = require('react');
const { Component } = React;

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
          // input에는 value와 onChange는 쌍으로 넣어줘야한다. 아니면 defaultValue를 셋팅 해줘야 한다.
          <input ref={this.onRefInput} value={this.state.value} onChange={this.onChangeInput} />
          <button>입력!</button>
        </form>
    <div>{this.state.result}</div>
      </>
    );
  }
}

module.exports = WordRelay;