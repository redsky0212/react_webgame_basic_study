import React, {useRef, useState} from 'react';
import Try from './Try';

function getNumbers() { // 숫자 네 개를 겹치지 않고 랜덤하게 뽑는 함수
  const candidate = [1,2,3,4,5,6,7,8,9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
}

const NumberBaseballHooks = () => {
  const [result, setResult] = useState('');
  const [value, setValue] = useState('');
  // Hooks방식에서는 state가 바뀌면 함수 전체가 다시 render되므로 아래 getNumbers()함수를
  // 쓸데없이 매번 호출하게 되므로 아래와 같이 넣으면 안됨
  // const [answer, setAnswer] = useState(getNumbers());  // getNumbers 함수명만 넣어줘야함.
  const [answer, setAnswer] = useState(getNumbers); // lazy init(초기에 한번만 초기화 하면 되므로)
  const [tries, setTries] = useState([]);
  const inputRef = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (value === answer.join('')) {
      setResult('홈런!');
      setTries((prevTries) => {
        return [...prevTries, { try: value, result: '홈런!' }];
      });
      alert('게임을 다시 시작합니다!');
      setValue('');
      setAnswer(getNumbers());
      setTries([]);
      
      inputRef.current.focus();
    } else { // 답 틀렸으면
      const answerArray = value.split('').map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) { // 10번 이상 틀렸을 때
        setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`);
        alert('게임을 다시 시작합니다!');
        setValue('');
        setAnswer(getNumbers());
        setTries([]);
        inputRef.current.focus();
      } else {
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === answer[i]) {
            strike += 1;
          } else if (answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        setTries((prevTries) => {
          return [...prevTries, { try: value, result: `${strike} 스트라이크, ${ball} 볼입니다`}];
        });
        setValue('');
        inputRef.current.focus();
      }
    }
  };

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input ref={inputRef} maxLength={4} value={value} onChange={onChangeInput} />
      </form>
      <div>시도: {tries.length}</div>
      <ul>
        {tries.map((v, i) => {
          return (
            <Try key={`${i + 1}차 시도 :`} tryInfo={v} />
          );
        })}
      </ul>
    </>
  );
};

export default NumberBaseballHooks;
