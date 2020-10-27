# React 웹게임 기초 및 문법
## 리엑트를 사용하는 이유
* 정적웹페이지, 동적웹페이지
  - 정적웹페이지는 웹서버에 이미 저장되어있는 html을 전달하여 받은 단순 정보 전달 페이지이며 사용자 상호작용(user interaction)이 별로 중요하지 않는 페이지.
  - 동적웹페이지는 유저의 행동 흐름에따라 페이지를 달리 보여주며 동적으로 변화된 html을 전달 받는 형태이고, 요즘엔 거의 이런 동적인 형태의 웹페이지들이 많아 웹페이지 보다는 웹 어플리케이션 느낌의 성격이 강하다. 이런 자연스러운 유저 인터렉션을 위하여 프론트앤드 프레임웍이 등장.
* 리엑트의 특징
  - 컴퍼넌트(Component) 단위 구성
    - UI를 구성하는 개별 뷰이며 여러 컴퍼넌트를 조립하여 완성하는 형태이고 각 컴퍼넌트는 재사용성이 좋음.(생산성와 유지보수가 좋음)
  - JSX(javascript확장구문)
    - html과 유사한 문법으로 익숙하게 컴퍼넌트를 생성할 수 있다.(babel로 컴파일됨.)
  - Virtual DOM
    - 유저인터렉션 과정에 비효율적인 렌더링이 발생할 수 있는데 그것을 최소화.
  - 데이터 사용의 편리함
## 컴퍼넌트(Component)만들기
  * component는 js또는 jsx파일로 생성한다.
    - js파일의 소스에 jsx코드가 있을경우에는 통상 .jsx확장자로 생성하여 구분한다.
    - component는 class방식과 hooks(함수형)방식 두가지가 있다.
    ```javascript
    // class방식
    class 클래스명 extends Component {
      constructor(props) {
        super(props);
        this.state = {
          test: '',
        };
      }
      render() {
        return (<div></div>);
      };
    }
    // hooks방식
    import React, {useState} from 'react';
    const 함수명 = () => {
      const [count, setCount] = useState(0);

      const 메서드 = () => {};
           
      // jsx코드를 return한다.
      // jsx코드는 babel에의해서 React.createElement형식으로 바꿔서 실행시켜준다.
      return (<div></div>);
    };
    ```
  * state설정
    - 컴퍼넌트의 화면에서 변경이 이루어지는 값들은 state라는 상태값으로 관리한다.
  * Fragment (React.Fragment, <>)
    - 각 Component의 JSX코드에서 html첫 태그는 하나여야 하는 문제가 있다. 그래서 주로 &lt;div&gt;로 감싸주는 경우가 많은데 이럴때 Fragment를 사용하면 필요없는 div를 태그상에서 제거해준다.
    - <>는 babel2에서부터 지원함. React.Fragment를 사용.
    ```html
    <React.Fragment>
     <div>{this.state.first}</div>
     <div>{this.state.second}</div>
    </React.Fragment>
    // 또는 babel2부터 지원
    <>
     <div>{this.state.first}</div>
     <div>{this.state.second}</div>
    </>
    ```
## 기타 팁들
  * class형식으로 개발할때 메서드함수는 화살표함수로 만든다.(this가 달라짐)
  * form태그에서는 onSubmit을 사용(개취)
  * render함수의 jsx에 ()연산자는 개취.
  * setState로 상태를 변경할때 rendering이 이루어진다. 성능이슈를 잘 체크해야함
    - render함수의 JSX부분에는 함수를 넣지않고 모두 밖으로 빼는게 맞음 왜냐하면 render가 이루어질때마다 jsx내부의 함수는 계속 새로 생성 되므로 성능이슈가 있음.
## setState의 함수형 사용 이유
  * state는 setState를 사용하여 상태를 변화(비동기) 시켜줘야 한다.
  * state는 항상 불변성을 유지해야함.
    - react는 state의 값들이 변화가 이뤄졌다는 것을 알아차려서 화면을 rendering하는데 setState를 연달아 사용할 경우 state의 값에 대한 오동작(비동기이기때문)이 생길 수 있다.
    ```javascript
    // 비동기 이기때문에 최종 count가 5라는 보장이 없다.
    this.setState({count: 0});
    this.setState({count: 4});
    this.setState({count: 3});
    this.setState({count: 2});
    this.setState({count: 5});
    ```
    - 그래서 이전state값으로 새로운state값으로 오동작없이 넣으려면 함수형으로 사용해서 prev state값을 사용하여 값을 셋팅한다.
    ```javascript
    this.setState((prevState) => { return {count: prevState.count + 1}; });
    ```
## ref
  * 태그자체에 동작을 추가하고 싶을때 사용.
  ```javascript
  // class 방식---------------------------------------
  state = {
    value: '',
  };
  onSubmit = (e) => {
    // form의 submit이 이루어졌을때 input에 focus를 준다.
    this.input.focus();
  };
  input; // ref로 연결된 input태그 DOM객체
  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.onSubmit}>
          <input ref={(c) => { this.input = c; }} type="number" onChange={} value={this.state.value} />
          <button>입력!</button>
        </form>
      </React.Fragment>
    );
  }

  // hooks(함수형) 방식---------------------------------
  import React, {useState, useRef} from 'react';

  const Aaaa = () => {
    // state
    const [value, setValue] = useState('');
    const inputRef = useRef(null);

    // method
    const onSubmit = () => {
      inputRef.current.focus();
    };

    return (
      <React.Fragment>
        <form onSubmit={onSubmit}>
          <input ref={inputRef} type="number" onChange={} value={value} />
          <button>입력!</button>
        </form>
      </React.Fragment>
    );
  }
  ```
## Class와 Hooks 비교
  * JSX에서 class를 className으로 사용.
  * JSX에서 for속성은 htmlFor로 사용.
  * hooks에서 state는 객체로 하나로묶어서 사용해도 되지만 바꾸지않는값은 없어질 수도 있으므로 분리해서 사용하는게 맞음.
  * render시 class방식은 전체 class를 다시 렌더링 하지 않지만 hooks방식은 함수 전체를 다시 렌더링한다. 이건 어쩔 수 없음.
  * state변경이 연달아 있을경우 react가 똑똑하게 계속 render는 하지않고 내부적으로 적절히 rendering함.
>
## React개발을 위한 환경설정 및 웹팩 설치 (실무아님, react테스트를위한 구성)
  * js실행기인 node.js가 기본 설치 되어 있어야 한다.
  * npm init : cmd창에서 프로젝트 폴더로 이동후 프로젝트 초기화 실행.
  * react개발에 필요한 것들 설치.
    - npm i react react-dom  // 리엑트 설치
    - npm i -D webpack webpack-cli  // 웹팩설치 개발시에만 사용
  * 루트에 webpack.config.js와 client.jsx(테스트를 위한 js파일), index.html 생성.
  ```javascript
  // webpack.config. js
  module.exports = {}
  // client.jsx
  const React = require('react');
  const ReactDom = require('react-dom');
  ReactDom.render(<WordRelay />, document.querySelector('#root'));
  // index.html
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>끝말잇기</title>
    </head>
    <body>
      <div id="root"></div>
      <script src="./dist/app.js"></script>
    </body>
  </html>
  ```
  * create-react-app등을 사용해서 설치하면 react의 자세한 환경내용을 모르므로 처음에는 이렇게 개별로 설치해서 적용해보는게 좋음.
  * client.jsx파일에서 불러온 컴포넌트(WordRelay)는 따로 파일(WordRelay.jsx)을 만들어 불러온다.
  ```javascript
  // WordRelay.jsx
  const React = require('react');
  const { Component } = React;

  class WordRelay extends React.Component {
    state = {};

    render() {
      
    }
  }

  module.exports = WordRelay;
  ```
  * 모듈 시스템으로 인해 파일로 많이 분리하고 필요한것만 불러와 넣을 수 있게 되었다.
  * 분리된 js파일들을 index.html에서는 합쳐진 js파일로 불러오기 위해서는 webpack이 필요하다.
  * webpack.config.js파일 설정 해보기(우선 첫 셋팅)
  ```javascript
  const path = require('path'); // node의 path조작

  module.exports = {
    name: 'wordrelay-setting',
    mode: 'development',  // 실서비스: production
    devtool: 'eval',  // 빠르게 하겠다는 의미
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    // 입력: 중요
    entry: {
      // WordRelay.jsx는 client.jsx파일에서 불러오므로 webpack에서 알아차리기 때문에 넣을필요없음.
      // 확장자는 resolve라는 옵션에서 extendsions네 적어주면 알아서 찾아줌.
      app: ['./client'],
    },
    module: {
      rules: [{
        test: /\.jsx?/, // js, jsx파일에 룰을 적용하겠다는 의미
        loader: 'babel-loader', // babel-loader의 룰
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: ['@babel/plugin-proposal-class-properties'], // 에러발생으로 추가 설치함.
        },
      }],
    },
    // 출력: 중요
    output: {
      path: path.join(__dirname, 'dist'), // 현재폴더경로에 dist에 내보냄.
      filename: 'app.js',
    },
  };
  ```
  * webpack실행 명령어는 webpack (command라인 에러가 발생)(명령어 등록 해주거나 package.json에 script로 적어주거나 npx명령어로 사용.)
    - npm run dev(script에 등록된 이름), 또는 npx webpack
  * 현재까지는 에러 발생함.
    - jsx를 읽으려면 로더가 필요하다는..., 그래서 babel을 설치하고 jsx관련 설정을 babel설정을 해줘야 한다.
    - babel설치 : npm i -D @babel/core @babel/preset-env @babel/preset-react babel-loader
      - (core: 바벨의 코어소스, preset-env: 브라우져판별하여 js소스를 변환해줌, preset-react: 리엑트관련소스 읽어줌., babel-loader: 바벨과웹팩을 연결)
    - babel설치 후 webpack.config.js파일에 module옵션 추가.
      - module: entry파일을 읽어서 module을 적용한 후 output에 뺀다로 생각하면 됨.
    - 또 에러발생 에러내용에 보면 @babel/plugin-proposal-class-properties 추가 하라고 뜸... 그래서 또 설치
      - npm i -D @babel/plugin-proposal-class-properties
      - webpack.config.js파일 이 내용 추가
        - plugins에 넣음.
## 웹팩빌드 다시 간단정리
* nodejs 설치 되어있어야한다.
* npm init
* npm i react react-dom
* npm i webpack webpack-cli
* jsx를 읽기위한, 브라우져, 등등을 위한 babel설치
  - npm i -D @babel/core @babel/preset-env @babel/preset-react babel-loader
* root에 webpack.config.js파일 생성
* webpack.config.js에 옵션 정리 시작
```javascript
  const path = require('path'); // node의 path조작

  module.exports = {
    name: 'wordrelay-setting',
    mode: 'development',  // (운영): production
    devtool: 'eval',  // (개발)빠르게 하겠다는 의미 'eval' , (운영)소스가리기 'hidden-source-map
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    // 입력: 중요
    entry: {
      // WordRelay.jsx는 client.jsx파일에서 import하므로 webpack에서 알아차림. 때문에 넣을필요없음.
      // 확장자는 resolve라는 옵션에서 extendsions네 적어주면 알아서 찾아줌.
      app: ['./client'],
    },
    module: {
      rules: [{
        test: /\.jsx?/, // js, jsx파일에 룰을 적용하겠다는 의미
        loader: 'babel-loader', // babel-loader의 룰을.
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],  // babel의 옵션을 추가적용.
          plugins: ['@babel/plugin-proposal-class-properties'], // 에러발생으로 추가 설치함.
        },
      }],
    },
    // 출력: 중요
    output: {
      path: path.join(__dirname, 'dist'), // 현재폴더경로에 dist에 내보냄.
      filename: 'app.js',
    },
  };
  ```
  * package.json의 script부분에 webpack명령어 등록
  ```javascript
  "script": {
    "div": "webpack",
  }
  ```
  * client.jsx파일 생성(진입점 파일 생성)
    - 물론 이름이 달라도 됨.
  * 그 외 필요한 js, jsx파일을 생성하여 코딩작업 시작.
    - 최신 js문법을 사용하여 필요한 코딩 시작
    - Fragment사용법(<>), 모듈시스템 사용법(require, module.exports), 구조분해문법 
  * 웹팩 빌드
    - npm run dev, npx webpack 명령어 실행
  * index.html파일을 생성
    - html파일에 dist에 생성된 js파일을 적용한 적용한 마크업 코딩.
## 웹팩설정관련 @babel/preset-env와 plugins
  * preset은 plugins를 모아놓은 파일이다.
  * rules의 options의 presets에 좀더 구체적으로 옵션을 아래와 같이 셋팅 해줄 수 있다.
  ```javascript
  options: [
    presets: [
      ['@babel/preset-env', {
        targets: {
          browsers: ['> 5% in KR', 'last 2 chrome versions'], // 관련url(https://github.com/browserslist/browserslist#queries)
        },
        debug: true,
      }],
      '@babel/preset-react'
    ],
  ]
  ```
  * 웹팩에 중요한 entry, module, output외에 하나더 plugins라는게 있다.
  ```javascript
  entry: {
    app: ['./client'],
  },
  module: {
    rules: [{
      test: /\.jsx?/,
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env', '@babel/preset-react'],
        plugins: ['@babel/plugin-proposal-class-properties'],
      },
    }],
  },
  // 여기도 plugin이 들어갈 수 있음
  // 확장 프로그램의 개념. 추가적 기능? 종류가 많음.
  // 수많은 플러그인이 있음.
  plugins: [
    new webpack.LoaderOptionsPlugin({ debug: true }), // 위 options에 모두 debug:true를 넣는다는 의미
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
  },
  ```
  * webpack공식 문서에도 entry, output, Loaders(module), plugins, mode 이런게 가장 중요하나도 위에 나옴.
## 끝말잇기 Class 코딩
```javascript
// WordRelay.jsx
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

  onChange = (e) => {
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
          <input ref={this.onRefInput} value={this.state.value} onChange={this.onChange} />
          <button>입력!</button>
        </form>
    <div>{this.state.result}</div>
      </>
    );
  }
}

module.exports = WordRelay;
```
## 화면개발 코딩 작성 시 자동으로 리로딩 처리 해보기 (webpack-dev-server, hot-loader)
* npm i -D react-hot-loader
* npm i -D webpack-dev-server (nodemon같은거)
* 설치 되었으면 package.json scripts부분을 수정한다.
```javascript
"scripts": {
  "dev": "webpack-dev-server --hot",
}
```
  - webpack-dev-server가 webpack.config.js 읽어서 빌드해주고 뒤쪽에서 항상 서버로 유지를 시켜준다.
  - webpack-dev-server를 실행했을때 버전때문에 에러가 발생하였다. 그래서 아래와 같이 버전을 맞춰 다시 설치하고 실행하니 되었다.
    - "webpack": "^4.30.0", "webpack-cli": "^3.3.0", "webpack-dev-server": "^3.3.1"
    - 최신 버전에는 약간의 문제가 있는듯 하다.
  - webpack-dev-server는 최신 공신문서를 확인하여 hot-loader를 사용할 것인지, 아니면 사용방법을 그때그때 따라서 진행해야할거같음.
* 추가로 client.jsx를 아래와 같이 수정
```javascript
const React = require('react');
const ReactDom = require('react-dom');
const { hot } = require('react-hot-loader/root'); // hot을 불러와서

const WordRelay = require('./WordRelay');

const Hot = hot(WordRelay); // WordRelay를 연결시킨다.

ReactDom.render(<Hot />, document.querySelector('#root'));
```
* 또 webpack.config.js도 아래부분에 plugin을 추가해준다.
```javascript
module: {
    rules: [{
      test: /\.jsx?/,
      loader: 'babel-loader',
      options: {
        presets: [
          ['@babel/preset-env', {
            targets: {
              browsers: ['> 5% in KR', 'last 2 chrome versions'],
            },
            debug: true,
          }],
          '@babel/preset-react'
        ],
        plugins: [
          '@babel/plugin-proposal-class-properties',
          'react-hot-loader/babel', // 리엑트 hot-loader를 연결한다.
        ],
      },
    }],
  },
```
* 또한 index.html에 script로딩한 app.js경로를 ./dist/app.js에서 ./app.js로 수정한다.
  - 이부분은 webpack-dev-server가 실행하면서 빌드된 app.js를 읽지않고 따로 app.js를 만들어 읽는거 같음.
  - 그래서 publicPath를 넣어서 경로를 맞출 수 있음.
* publicPath맞추기
```javascript
output: {
  path: path.join(__dirname, 'dist'),
  filename: 'app.js',
  publicPath: '/dist/', // publicPath를 맞추어 webpack-dev-server와 서로 다른 부분을 맞춤.
},
```
## 끝말잇기 hooks로 전환해 보기
* useState, useRef등 사용법 익힘
* 콘솔 로그에 보면 [HMR], [WDS] 이 부분에 대하여 익힘
  - [HMR]핫모듈리로드, [WDS]웹팩데브서버 라는 뜻..
```javascript
const React = require('react');
const { useState, useRef } = React;

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
    </>
  );
};

module.exports = WordRelayHooks;
```
* jsx에 className, htmlFor적용하는법
  - jsx소스내에 class대신 className을 사용한다.
  - jsx소스내에 for속성 대신 htmlFor를 사용한다.

## import와 require 비교
* 많은 소스들이 require대신 import를 쓴다.
  - nodejs의 모듈시스템 require. module.exports.
  - es2015문법 import. export default.
  - import, require는 서로 호환이 됨. 어떤걸 써도 상관없음.
  - nodejs는 require만 지원한다.

## 리엑트 반복문(map)
* 숫자야구로 class 형식으로 만든다.
  - jsx에서는 속성은 카멜표기법으로 표현한다.
  - input에는 value, onChange는 셋트이다.
  - react에서 import와 require를 혼용해서 사용하니 에러가 발생하였다. 한가지만 사용하도록하자.
* map반복문 사용 예제
  - 반복문 사용시 key는 고유한값으로 반드시 설정해준다.
```javascript
['사과', '배', '바나나', '포도', '귤', '감'].map((v) => {
  return (
    <li key={v}>{v}</li>
  );
});
```

## 컴포넌트를 분리, props
* 보통 반복문, 조건문 부분에서 컴포넌트를 분리를 많이 해준다.
* NumberBaseball.jsx 클래스 방식의 코딩 예제와 Try컴포넌트로 분리한 예제
  - 분리하면 좋은점 (가독성좋음, 재사용성좋음, 성능최적화에 좋음)
  - 분리한 컴포넌트에는 부모컴포넌트에서 자식컴포넌트로 props로 넘겨줘야한다.
  - class방식일때 createRef를 사용하면 ref의 current로 hooks방식과 같이 사용할 수 있다.
```javascript
// NumberBaseball.jsx 컴포넌트 ====================================
import React, { Component, createRef } from 'react';
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

class NumberBaseball extends Component {
  state = {
    result: '',
    value: '',
    answer: getNumbers(), // ex: [1,3,5,7]
    tries: [], // push 쓰면 안 돼요
  };

  onSubmitForm = (e) => {
    const { value, tries, answer } = this.state;
    e.preventDefault();
    if (value === answer.join('')) {
      this.setState((prevState) => {
        return {
          result: '홈런!',
          tries: [...prevState.tries, { try: value, result: '홈런!' }],
        }
      });
      alert('게임을 다시 시작합니다!');
      this.setState({
        value: '',
        answer: getNumbers(),
        tries: [],
      });
      this.inputRef.current.focus();
    } else { // 답 틀렸으면
      const answerArray = value.split('').map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) { // 10번 이상 틀렸을 때
        this.setState({
          result: `10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`,
        });
        alert('게임을 다시 시작합니다!');
        this.setState({
          value: '',
          answer: getNumbers(),
          tries: [],
        });
        this.inputRef.current.focus();
      } else {
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === answer[i]) {
            strike += 1;
          } else if (answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        this.setState((prevState) => {
          return {
            tries: [...prevState.tries, { try: value, result: `${strike} 스트라이크, ${ball} 볼입니다`}],
            value: '',
          };
        });
        this.inputRef.current.focus();
      }
    }
  };

  onChangeInput = (e) => {
    console.log(this.state.answer);
    this.setState({
      value: e.target.value,
    });
  };

  inputRef = createRef(); // this.inputRef

  render() {
    const { result, value, tries } = this.state;
    return (
      <>
        <h1>{result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input ref={this.inputRef} maxLength={4} value={value} onChange={this.onChangeInput} />
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
  }
}

export default NumberBaseball;

// Try.jsx 컴포넌트 ====================================
import React, { Component } from 'react';

class Try extends Component {
  render() {
    const { tryInfo } = this.props;
    return (
      <li>
        <div>{tryInfo.try}</div>
        <div>{tryInfo.result}</div>
      </li>
    );
  }
}

export default Try;
```

## 주석처리와 메서드 바인딩 방법
* 주석 : {/**/}
* class방식에서 메서드에 화살표 함수를 사용하지 않을경우 예전방법
```javascript
class Aaa extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onChange = this.onChange.bind(this); // this를 바인드해준다.
  }
  
  onChange() {
    // this가 달라짐
    // constructor에서 bind해줬기때문에 this를 사용할 수 있다.
    // 따라서 화살표 함수로 사용하는게 편함.
  }

  render() {
    return (<div></div>);
  }
}
```

## NumberBaseball Hooks방식으로 전환해보기
* ..