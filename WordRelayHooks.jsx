// const React = require('react');
// const { useState, useRef } = React;
import React, {useState, useRef} from 'react';

const WordRelayHooks = () => {
  const [word, setWord] = useState('레드스카이');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputRef = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (word[word.length - 1] === value[0]) {
      setResult('딩동댕');
      setWord(value);
      setValue('');
      inputRef.current.focus();
    } else {
      setResult('땡');
      setValue('');
      inputRef.current.focus();
    }
  };

  const onChangeInput = (e) => {
    setValue( e.target.value );
  };

  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <input className="aaa" ref={inputRef} value={value} onChange={onChangeInput} />
        <button>클릭!</button>
      </form>
      <div>{result}</div>
      <ul>
          {['like', 'like', 'like', 'like'].map(() => {
            return (
              <li>like</li>
            );
          })}
        </ul>
    </>
  );
};

// module.exports = WordRelayHooks;
export default WordRelayHooks;