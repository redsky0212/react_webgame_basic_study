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
  "dev": "webpack serve --env development"
},
```
  - webpack-dev-server가 webpack.config.js 읽어서 빌드해주고 뒤쪽에서 항상 서버로 유지를 시켜준다.
  - webpack-dev-server를 실행했을때 버전때문에 에러가 발생하였다. 그래서 아래와 같이 버전을 맞춰 다시 설치하고 실행하니 되었다.
  - Webpack버전이 바뀜에 따라 항상 설정내용이 바뀌고 있다. 그때그때 바뀐 내용을 강좌로 확인해야할것 같음.
  ```js
  // 2023 package.json파일의 아래 내용
  "react-refresh": "^0.11.0",
  "webpack": "^5.3.2",
  "webpack-cli": "^4.1.0",
  "webpack-dev-server": "^4.0.0"
  ```

* 추가로 client.jsx를 아래와 같이 수정
```javascript
import React from 'react';
import ReactDom from 'react-dom';
import WordRelay from './WordRelay';

ReactDom.render(<WordRelay />, document.querySelector('#root'));
```
* 또 webpack.config.js도 아래부분에 plugin을 추가해준다.
```javascript
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

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
        'react-refresh/babel', // 리엑트 refresh사용
      ],
    },
  }],
},
plugins: [
  new RefreshWebpackPlugin()  // 그냥 reloading이 아니라 hot reloading시켜주므로 데이타가 남아있게 처리
],
devServer: {
  devMiddleware: { publicPath: '/dist' },
  static: { directory: path.resolve(__dirname) },
  hot: true
}
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
## 컨트롤드 인풋 vs 언컨트롤드 인풋
---
* 컨트롤드 인풋
```html
// value와 onChange가 셋팅 되어있는 형태(react에서 권장)
<input
  ref={inputEl}
  value={value}
  onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)}
/>
```
* 언컨트롤드 인풋
  - onSubmit내 에서만 사용되어질때 사용.
```html
// value, onChange가 없는 형태(간단한 앱에서 주로 사용)
<input ref={inputEl} />
```
:star: 참조 : https://goshacmd.com/controlled-vs-uncontrolled-inputs-react/

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
* useState로 state를 초기화 하는 시점에 값을 셋팅할 때 만약 값이 함수라면 함수를 호출하지 말고 lazy init을 사용한다. (아래 코드 참조)
```javascript
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
```

## React Devtools
* 크롭 웹스토어에서 react devtools를 다운 받아 설치한다.
* redux devtools도 설치한다.

## shouldComponentUpdate(성능최적화 방법중 하나)
* state의 변화가 생기면 render가 실행되므로 성능 최적화가 필요하다.
* state의 변화가 생겼는지 아닌지를 react가 멍청하기때문에 shouldComponentUpdate에서 명시해주는 방법을 사용할때도 있다.
```javascript
class Test extends Component {
  state = {
    counter: 0,
  };
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (this.state.counter !== nextState.counter) {
      return true;  // 값의 변화가 생겼으므로 렌더링한다.
    }
    return false; // 값의 변화가 없으므로 렌더링 안한다.
  }
  render() {
    return (<div></div>);
  }
}
```

## PureComponent와 React.memo(성능최적화의 또다른방법)
* class방식일때는 PureComponent를 사용하여 최소한의 성능최적화를 할 수 있다.
* PureComponent는 불변성을 유지하지않고 값을 넣으면 알아차리지 못한다.
```javascript
class Test extends PureComponent {
  state = {
    counter: 0,
    string: 'hello',
    number: 1,
    object: {}, // 하지만 object, array는 PureComponent도 어려워 한다.
    arrar: [],  // 예를들어 array에 push로 값을 넣으면 PureComponent는 state의 변화를 알지 못한다.
  };
  
  render() {
    return (<div></div>);
  }
}
```
* Hooks방식일때는 React.memo를 사용한다.
```javascript
const Test = React.memo(() => {
  const [counter, setCounter] = useState(0);
  const [string, setString] = useState('hello');
  const [number, setNumber] = useState(1);
  const [object, setObject] = useState({});
  const [array, setArray] = useState([]);
  
  render() {
    return (<div></div>);
  }
});
```
* 상황에 따라 shouldComponentUpdate, PureComponent, React.memo를 적절히 사용해야한다.
* 부모가 PureComponent이면 자식에도 적용해서 최적화를 할 수 있다.
* Hooks방식일때 React.memo를 적용하면 DevTools에서 봤을때 자식 컴포넌트의 이름이 이상하게 바뀐다. 이때 자식 컴포넌트의 이름을 `displayName`으로 다시 셋팅 해줄 수 있다.
```js
const Try = memo(({tryInfo}) => {
  return (
    <li></li>
  );
});
Try.displayName = 'Try';

export default Try;
```

## React.createRef
* class방식일때 ref적용할때 hooks방식과 current부분이 다른부분이 있었다.
  - class일때는 : this.inputRef.focus();
  - hooks일때는 : inputRef.current.focus();
* 이럴때 createRef를 사용하면 class방식일때 hooks방식과 같이 적용할 수 있다.
  - 통일성 유지
```javascript
import React, {createRef} from 'react';
class Test extends Component{

  inputRef = createRef();

  onSubmit = () => {
    this.inputRef.current.focus();
  }

  render() {
    return (
      <input ref={this.inputRef} />
    );
  }
}
```
* ref의 예전방식도 함수여서 좀 더 디테일한 조정을 할 수 있다.

## props와 state 연결
* props는 자식에서 값을 바꾸면 안됨.
  - 경우에 따라 props를 바꾸고자 할때는 props를 state에 넣어주고 state를 바꾼다.
  ```javascript
  const Try = memo(({tryInfo}) => {
    const [result, setResult] = setState(tryInfo.result); // 부모로부터 받은 props를 state에 넣어줌.
    const onClick = () => {
      setResult('1');
    };
    return (
      <li>
        <div>{tryInfo.try}</div>
        <div onClick={onClick}>{result}</div>
      </li>
    );
  });
  ```
* class방식일때 constructor에서 props를 좀 더 필터링을 하거나 디테일 조작을 하여 state에 넣어줄 수도있다.
* 부모자식간에는 props로 넘겨주는데 depth가 길어지면 복잡해지므로 조금 쉽게 전달하는 방식은 context api(공부필요)를 사용하면 됨.

## context API
* 컴포넌트 구조가 A -> B -> C -> D - E 와 같이 부모 자식이 깊을때 A가 중간에 다른 자식 컴포넌트를 거치지 않고 바로 최 하위의 E컴포넌트로 props를 전달 하고자 할때 사용하는 것 `context API`, 또한 `Redux`도 가능하다. 간단하게 말하면 props의 진화형이 context API라고 생각하면 됨.
```
API

React.createContext
Context.Provider
Class.contextType
Context.Consumer
Context.displayName
```
[참조URL:https://ko.reactjs.org/docs/context.html](https://ko.reactjs.org/docs/context.html)

## React 조건문(반응속도체크 ResponseCheck)
* css, style은 client.jsx에 보통 하는 방식 똑같이 넣어주면 된다.
* react의 render안에는 for, if를 사용하지 못한다.
  - 그래서 사용할 수 있는 방법 설명
  - 삼항연산자 사용.
    - Array의 reduce는 합계를 나는 메서드 인데 array의 값이 없을때는 에러가 남. 그래서 없을때는 그리지 않게 하기 위해 조건문을 넣는다.
    - jsx에서는 아무것도 안한다... null 로 한다.
  ```javascript
  render() {
    const { state, message } = this.state;
    return (
      <>
        <div
          id="screen"
          className={state}
          onClick={this.onClickScreen}
        >
          {message}
        </div>
        {result.length === 0
        ? null
        : <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
          <button onClick={this.onReset}>리셋</button>
        }
      </>
    )
  }
  ```
  - 삼항연산자를 render의 return안에 쓰면 좀 지저분하다. react의 단점.
    - 그래서 삼항연산자를 함수로 빼서 쓰는게 보기가 더 좋음.
    - 사실은 함수보다 컴포넌트로 따로 빼서 분리하는게 더 좋음. (파일이 많아져서 복잡해질 수는 있지만...)
    ```javascript
    renderAverage = () => {
      const {result} = this.state;
      return result.length === 0
        ? null
        : <>
          <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
          <button onClick={this.onReset}>리셋</button>
        </>
    };
    render() {
      const { state, message } = this.state;
      return (
        <>
          <div
            id="screen"
            className={state}
            onClick={this.onClickScreen}
          >
            {message}
          </div>
          {this.renderAverage()}
        </>
      )
    }
    ```
## setTimeout 넣어 반응속도체크
* state, props등들은 처음부터 구조분해해서 가져와 사용하는게 좋음.
* 반응속도체크 컴포넌트 코딩...(ResponseCheck.jsx참조)
```javascript
import React, { Component, createRef } from 'react';

class ResponseCheck extends Component {
  state = {
    state: 'waiting',
    message: '클릭해서 시작하세요.',
    result: [],
  };

  timeout = createRef();
  startTime = createRef();
  endTime = createRef();

  onClickScreen = () => {
    const { state } = this.state;
    if (state === 'waiting') {
      this.timeout = setTimeout(() => {
        this.setState({
          state: 'now',
          message: '지금 클릭',
        });
        this.startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000); // 2초~3초 랜덤
      this.setState({
        state: 'ready',
        message: '초록색이 되면 클릭하세요.',
      });
    } else if (state === 'ready') { // 성급하게 클릭
      clearTimeout(this.timeout);
      this.setState({
        state: 'waiting',
        message: '너무 성급하시군요! 초록색이 된 후에 클릭하세요.',
      });
    } else if (state === 'now') { // 반응속도 체크
      this.endTime.current = new Date();
      this.setState((prevState) => {
        return {
          state: 'waiting',
          message: '클릭해서 시작하세요.',
          result: [...prevState.result, this.endTime.current - this.startTime.current],
        };
      });
    }
  };

  onReset = () => {
    this.setState({
      result: [],
    });
  };

  renderAverage = () => {
    const {result} = this.state;
    return result.length === 0
      ? null
      : <>
        <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
        <button onClick={this.onReset}>리셋</button>
      </>
  };
  render() {
    const { state, message } = this.state;
    return (
      <>
        <div
          id="screen"
          className={state}
          onClick={this.onClickScreen}
        >
          {message}
        </div>
        {this.renderAverage()}
      </>
    )
  }
}
export default ResponseCheck;
```
## 성능체크
* 리셋버튼 클릭시 위쪽 색깔부분도 렌더링 된다.
  - 이런경우에는 보통 그냥 넘어가는데 이것도 렌더링을 피해서 최적화 하고자 할때는 컴포넌트로 분리해서 작업한다.
* Hooks컴포넌트는 렌더링 될때 함수 전체가 다시 렌더링 되므로 무건운 공통함수를 콜 하는경우에는 문제가 될 수도있다.
  - 이럴경우에는 useMemo, useCallback, useEffect등을 이용하여 처리 할 수 있다.(뒤쪽에서 공부할꺼임)

## 반응속도체크 컴포넌트 Hooks로 전환
* Hooks방식에서 일반 변수는 useRef로 선언해서 사용할 수 있다.
  - jsx의 태그 DOM에 접근할때 사용, 일반 변수 선언할때 사용. 두가지로 사용할 수 있다.
  - `중요` : `그럼 state와 ref로 선언한것의 차이는 state는 렌더링이 되지만 ref로 선언한것은 렌더링 되지 않으므로 화면에 영향을 주지 않는 변수는 ref로 선언해서 사용하는게 좋다.`
  - ref로 선언한것은 항상 current써주는거 잊지말자.
```javascript
import React, { useState, useRef } from 'react';

const ResponseCheck = () => {
  const [state, setState] = useState('waiting');
  const [message, setMessage] = useState('클릭해서 시작하세요.');
  const [result, setResult] = useState([]);
  const timeout = useRef(null);
  const startTime = useRef(0);
  const endTime = useRef(0);

  const onClickScreen = () => {
    if (state === 'waiting') {
      timeout.current = setTimeout(() => {
        setState('now');
        setMessage('지금 클릭');
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000); // 2초~3초 랜덤
      setState('ready');
      setMessage('초록색이 되면 클릭하세요.');
    } else if (state === 'ready') { // 성급하게 클릭
      clearTimeout(timeout.current);
      setState('waiting');
      setMessage('너무 성급하시군요! 초록색이 된 후에 클릭하세요.');
    } else if (state === 'now') { // 반응속도 체크
      endTime.current = new Date();
      setState('waiting');
      setMessage('클릭해서 시작하세요.');
      setResult((prevResult) => {
        return [...prevResult, endTime.current - startTime.current];
      });
    }
  };
  const onReset = () => {
    setResult([]);
  };

  const renderAverage = () => {
    return result.length === 0
      ? null
      : <>
        <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
        <button onClick={onReset}>리셋</button>
      </>
  };
  return (
    <>
      <div
        id="screen"
        className={state}
        onClick={onClickScreen}
      >
        {message}
      </div>
      {renderAverage()}
    </>
  );
};
export default ResponseCheck;
```

## return 안에서 for와 if 쓰기
* return안에 for, if를 쓰면 리엑트는 좀 지저분하다.
  - jsx안에 { }를 이용하여 `즉시실행함수`를 사용하여 반복문,조건문 js코딩을 하는 방법
    - 이 방법 보다는 그냥 함수로 빼던지 자식컴포넌트로 분리하는게 더 좋음.(성능문제도 있고...)
  ```javascript
  return (
    <>
      <div
        id="screen"
        className={state}
        onClick={onClickScreen}
      >
        {message}
      </div>
      {/*즉시실행함수*/}
      {(() => {
        if (result.length === 0) {
          return null;
        } else {
          return <>
            <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
            <button onClick={this.onReset}>리셋</button>
          </>
        }
      })()}
    </>
  );
  ```

## 리엑트 라이프사이클 소개(가위,바위,보 게임)
* 리액트17부터는 componentWillMount, componentWillUpdate, componentWillReceiveProps 비추천.
  
  ■ 컴포넌트가 처음 실행될때(mount) 순서
  1. context, defaultProps, state 저장
  2. componentWillMount호출 <-비추
      - `mount진행중이므로 props, state를 여기서 변경하면 안됨.`
      - `DOM에 접근 불가능` 
  3. render실행 DOM에 부착
  4. DOM에 mount완료 후 componentDidMount 호출.
      - `DOM에 접근 가능.`

  ■ props가 업데이트될 때 순서 (첫번째 인자는 update이전의 props)
  1. componentWillReceiveProps <-비추
  2. shouldComponentUpdate
      - `업데이트되기 전 이므로 return false하면 render를 하지 않는다.`
      - `그래서 이 함수에서 성능최적화를 하여 쓸데없는 update를 걸러낸다.`
      - `얕은 props, state의 비교를 통해 성능최적화를 위해서 사용하고 렌더링 방지 목적으로 장황하고 깊게 사용하면 버그생길 확율이 크다.`
      - `이것 보다는 PureComponent를 먼저 사용하는걸 고려하자.`
  3. componentWillUpdate <-비추
      - `state를 변경하면 안됨. 아직 props가 업데이트 되지 않았는데 state를 변경하면 또반복되므로.`
  4. 업데이트완료 후 render
  5. componentDidUpdate
      - `DOM에 접근 가능.`

  ■ state가 업데이트될 때 순서(componentWillReceiveProps는 호출안됨, 두번째 인자 state)
  1. shouldComponentUpdate
  2. componentWillUpdate
  3. render
  4. componentDidUpdate

  ■ unmount될때
  1. componentWillUnmount

  ■ Error났을때
  1. componentDidCatch
      - `에러가 발생했을때 호출됨. 에러로깅으로 사용할 수 있음.`
      - `최상위 컴포넌트에 한 번만 넣어주면 됨.`

  ■ getDerivedStateFromProps ((최초마운트, 업데이트 모두)render되기 직전에 호출)
    - 새롭게 바뀐 props를 state에 넣어주고 싶을때 사용.
    - 다른 생명주기와 달리 static을 필요로 한다. 또한 내부에서 this를 사용하지 못함.
    ```javascript
    static getDerivedStateFromProps(nextProps, prevState) {
      console.log("getDerivedStateFromProps");
      if (nextProps.color !== prevState.color) {
        return { color: nextProps.color };
      }
      return null;
    }
    ```

  ■ getSnapshotBeforeUpdate
    - render 직후 컴포넌트 변화가 일어나기 전 DOM을 가져와 필요한 작업을 할 수 있다.
    - 여기서 반환된 return값은 componentDidUpdate()의 인자로 전달된다.
    - 채팅창 스크롤 위치를 미리 계산해서 전달할 수 있는 기능에 사용할 수 있다.
    ```javascript
    class Aaa extends React.Component {
      getSnapshotBeforeUpdate(prevProps, prevState) {
        // Are we adding new items to the list?
        // Capture the scroll position so we can adjust scroll later.
        if (prevProps.list.length < this.props.list.length) {
          const list = this.listRef.current;
          return list.scrollHeight - list.scrollTop;
        }
        return null;
      }

      componentDidUpdate(prevProps, prevState, snapshot) {
        // If we have a snapshot value, we've just added new items.
        // Adjust scroll so these new items don't push the old ones out of view.
        // (snapshot here is the value returned from getSnapshotBeforeUpdate)
        if (snapshot !== null) {
          const list = this.listRef.current;
          list.scrollTop = list.scrollHeight - snapshot;
        }
      }
    }
    ```
```javascript
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Basic extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    birth: PropTypes.number.isRequired,
    lang: PropTypes.string,
  };

  static defaultProps = {
    lang: 'Javascript',
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  state = {
    hidden: false,
  };

  componentWillMount() {
    console.log('componentWillMount');
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate');
    return true / false;
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('componentWillUpdate');
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate');
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  onClickButton = () => {
    this.setState({ hidden: true });
    this.refs.hide.disabled = true;
  }

  render() {
    return (
      <div>
        <span>저는 {this.props.lang} 전문 {this.props.name}입니다!</span>
        {!this.state.hidden && <span>{this.props.birth}년에 태어났습니다.</span>}
        <button onClick={this.onClickButton} ref="hide">숨기기</button>
        <button onClick={this.context.router.goBack}>뒤로</button>
      </div>
    );
  }
}
```
## 가위 바위 보 게임 만들기
* 비동기 함수 안에서 바깥쪽 함수,변수를 사용하면 클로저 됨.
* componentDidMount 이후 componentWillUnmount는 자식 컴포넌트일때 매우 중요.
```javascript
// RSP.jsx
import React, { Component } from 'react';

// 클래스의 경우 -> constructor -> render -> ref -> componentDidMount
// (setState/props 바뀔때) -> shouldComponentUpdate(true) -> render -> componentDidUpdate
// 부모가 나를 없앴을 때 -> componentWillUnmount -> 소멸

const rspCoords = {
  바위: '0',
  가위: '-142px',
  보: '-284px',
};

const scores = {
  가위: 1,
  바위: 0,
  보: -1,
};

const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find(function(v) {
    return v[1] === imgCoord;
  })[0];
};

class RSP extends Component {
  state = {
    result: '',
    imgCoord: rspCoords.바위,
    score: 0,
  };

  interval;

  componentDidMount() { // 컴포넌트가 첫 렌더링된 후, 여기에 비동기 요청을 많이 해요
    this.interval = setInterval(this.changeHand, 100);
  }

  componentWillUnmount() { // 컴포넌트가 제거되기 직전, 비동기 요청 정리를 많이 해요
    clearInterval(this.interval);
  }

  changeHand = () => {
    const {imgCoord} = this.state;
    if (imgCoord === rspCoords.바위) {
      this.setState({
        imgCoord: rspCoords.가위,
      });
    } else if (imgCoord === rspCoords.가위) {
      this.setState({
        imgCoord: rspCoords.보,
      });
    } else if (imgCoord === rspCoords.보) {
      this.setState({
        imgCoord: rspCoords.바위,
      });
    }
  };

  onClickBtn = (choice) => () => {
    const {imgCoord} = this.state;
    clearInterval(this.interval);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      this.setState({
        result: '비겼습니다!',
      });
    } else if ([-1, 2].includes(diff)) {
      this.setState((prevState) => {
        return {
          result: '이겼습니다!',
          score: prevState.score + 1,
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          result: '졌습니다!',
          score: prevState.score - 1,
        };
      });
    }
    setTimeout(() => {
      this.interval = setInterval(this.changeHand, 100);
    }, 1000);
  };

  render() {
    const { result, score, imgCoord } = this.state;
    return (
      <>
        <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
        <div>
          <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
          <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>가위</button>
          <button id="paper" className="btn" onClick={this.onClickBtn('보')}>보</button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
      </>
    );
  }
}
export default RSP;

```

## 고차함수
* jsx부분에 함수호출내부에 함수를 호출하는부분이 있다면 바깥으로 빼서 적용한다.
  - event인자가 포함된 함수를 바깥으로 뺄때는 call하는 함수 밑으로 추가한다.(고차함수)
```javascript
// 기존코드==============================================================
  onClickBtn = (choice) => {
    //event.preventDefault(); event를 쓸 수 없음.
  }
  render() {
    const { result, score, imgCoord } = this.state;
    return (
      <>
        <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
        <div>
          <button id="rock" className="btn" onClick={(event) => {this.onClickBtn('바위')}}>바위</button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
      </>
    );
  }
  // 수정코드===========================================================
  onClickBtn = (choice) => (event) => {
    event.preventDefault();
  }
  render() {
    const { result, score, imgCoord } = this.state;
    return (
      <>
        <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
        <div>
          <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
      </>
    );
  }
```

## 가위바위보 Hooks로 교체
  - Hooks방식은 라이프사이클이 없다. 다만 흉내를 낼 수 있다.
  ```javascript
  import React, { useState, useRef, useEffect } from 'react';

  const rspCoords = {
    바위: '0',
    가위: '-142px',
    보: '-284px',
  };

  const scores = {
    가위: 1,
    바위: 0,
    보: -1,
  };

  const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function(v) {
      return v[1] === imgCoord;
    })[0];
  };

  //                        result, imgCoord, score
  // componentDidMount
  // componentDidUpdate
  // componentWillUnmount

  // componentDidMount() {
  //   this.setState({
  //     imgCoord: 3,
  //     score: 1,
  //     result: 2,
  //   })
  // }

  // useEffect(() => {
  //   setImgCoord();
  //   setScore();
  // }, [imgCoord, score]);
  // useEffect(() => {
  //   setResult();
  // }, [result]);


  const RSP = () => {
    const [result, setResult] = useState('');
    const [imgCoord, setImgCoord] = useState(rspCoords.바위);
    const [score, setScore] = useState(0);
    const interval = useRef();

    useEffect(() => { // componentDidMount, componentDidUpdate 역할(1대1 대응은 아님)
      console.log('다시 실행');
      interval.current = setInterval(changeHand, 100);
      return () => { // componentWillUnmount 역할
        console.log('종료');
        clearInterval(interval.current);
      }
    }, [imgCoord]);

    const changeHand = () => {
      if (imgCoord === rspCoords.바위) {
        setImgCoord(rspCoords.가위);
      } else if (imgCoord === rspCoords.가위) {
        setImgCoord(rspCoords.보);
      } else if (imgCoord === rspCoords.보) {
        setImgCoord(rspCoords.바위);
      }
    };

    const onClickBtn = (choice) => () => {
      clearInterval(interval.current);
      const myScore = scores[choice];
      const cpuScore = scores[computerChoice(imgCoord)];
      const diff = myScore - cpuScore;
      if (diff === 0) {
        setResult('비겼습니다!');
      } else if ([-1, 2].includes(diff)) {
        setResult('이겼습니다!');
        setScore((prevScore) => prevScore + 1);
      } else {
        setResult('졌습니다!');
        setScore((prevScore) => prevScore - 1);
      }
      setTimeout(() => {
        interval.current = setInterval(changeHand, 100);
      }, 1000);
    };

    return (
      <>
        <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
        <div>
          <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
          <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
          <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
      </>
    );
  };
  export default RSP;

  ```

## useEffect()
* componentDidMount, componentDidUpdate의 역할(1:1 대응은 아님)
```javascript
useEffect(() => { // componentDidMount, componentDidUpdate 역할(1대1 대응은 아님)
  console.log('다시 실행');
  interval.current = setInterval(changeHand, 100);
  return () => { // componentWillUnmount 역할
    console.log('종료');
    clearInterval(interval.current);
  }
}, [imgCoord]); // 두번째 인자로 뭐가 바뀌었을때 실행할지 바뀐값에 대한 실행할것들만 넣어준다.
```
* 훅스 방식은 전체함수가 매번 다시 실행하므로 useEffect를 매번 실행하고 return한다.
* useEffect내부의 setInterval은 따지고 보면 매번실행하고 매번 clearInterval하므로 SetTimeout으로 실행한것도 다를바 없다.
* class방식일때 componentDidMount에서 state를 if로 처리한 부분을 useEffect를 여러번 써서 사용할 수도 있다.
* class와 Hooks의 useEffect의 차이
  - class에서는 모든 state를 한꺼번에 라이프사이클에서 작업할 수 있지만
  - Hooks에서는 각 state마다 useEffect로 하나씩 인자로 넘겨줘서 작업한다 생각하면 됨.
  - 물론 useEffect에 두개의 인자를 넣고 작업 할 수도 있음.

## useLayoutEffect()
* 브라우저가 화면을 그리기 이전에 호출된다.
* SSR일때 문제가 될 수도 있다.
* useEffect에 문제가 있을때 차선책으로 useLayoutEffect를 고려하도록 한다.

## 로또추첨기 컴포넌트
* setTimeout사용시 주의점, 라이프사이클 사용예제, useMemo, useCallback사용법 예시
  - 먼저 class방식으로 코딩한다.
  - 라이프사이클 처음에는 콘솔로그를 보면서 특정 사이클 호출로 성능이슈가 없는지 보면서 하는게 좋다.
  - 또한 react DevTools에서 쓸데없는곳이 rendering되는곳이 없는지 성능테스트 한다.
```javascript
import React, { Component } from 'react';
import Ball from './Ball';

function getWinNumbers() {
  console.log('getWinNumbers');
  const candidate = Array(45).fill().map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}

class Lotto extends Component {
  state = {
    winNumbers: getWinNumbers(), // 당첨 숫자들
    winBalls: [],
    bonus: null, // 보너스 공
    redo: false,
  };

  timeouts = [];

  runTimeouts = () => {
    console.log('runTimeouts'); // 얼마나 반복실행되는지 보기위한 코드.
    const { winNumbers } = this.state;  // state, props는 구조분해해서 사용한다.
    for (let i = 0; i < winNumbers.length - 1; i++) {
      this.timeouts[i] = setTimeout(() => { // 여러번 실행
        this.setState((prevState) => {
          return {
            winBalls: [...prevState.winBalls, winNumbers[i]],
          };
        });
      }, (i + 1) * 1000);
    }
    this.timeouts[6] = setTimeout(() => {
      this.setState({
        bonus: winNumbers[6],
        redo: true,
      });
    }, 7000);
  };

  componentDidMount() {
    console.log('didMount');
    this.runTimeouts();
    console.log('로또 숫자를 생성합니다.');
  }

  // 값이 업데이트된 상황에서 이전값 참조로 잘 처리 해준다.
  // 조건문을 잘 처리하여 Redo가 됬을때만 runTimeouts를 실행하게 한다.
  componentDidUpdate(prevProps, prevState) {
    console.log('didUpdate');
    if (this.state.winBalls.length === 0) {
      this.runTimeouts();
    }
    if (prevState.winNumbers !== this.state.winNumbers) {
      console.log('로또 숫자를 생성합니다.');
    }
  }

  componentWillUnmount() {
    // setTimeout, setInterval사용시 반드시 Unmount에서 삭제 해줘야 한다.
    this.timeouts.forEach((v) => {
      clearTimeout(v);
    });
  }

  // 값 초기화 하고 바로 setTimeout을 실행해서 다시 실행을 해야한다. 이때 
  // componentDidUpdate에서 처리하게끔 옮겼다.
  onClickRedo = () => { // 한번더 누르면 값 초기화
    console.log('onClickRedo');
    this.setState({
      winNumbers: getWinNumbers(), // 당첨 숫자들
      winBalls: [],
      bonus: null, // 보너스 공
      redo: false,
    });
    this.timeouts = [];
  };

  render() {
    const { winBalls, bonus, redo } = this.state;
    return (
      <>
        <div>당첨 숫자</div>
        <div id="결과창">
          {winBalls.map((v) => <Ball key={v} number={v} />)}
        </div>
        <div>보너스!</div>
        {bonus && <Ball number={bonus} />}
        {redo && <button onClick={this.onClickRedo}>한 번 더!</button>}
      </>
    );
  }
}
export default Lotto;
// Ball.jsx=========================================================
// 자식 컴포넌트는 되도록이면 PureComponent로 작업한다.
// 특별한 데이터를 사용하지 않으면 그냥 함수 컴포넌트로 바로 작업해도 됨.
import React, { memo } from 'react';

const Ball = memo(({ number }) => {
  let background;
  if (number <= 10) {
    background = 'red';
  } else if (number <= 20) {
    background = 'orange';
  } else if (number <= 30) {
    background = 'yellow';
  } else if (number <= 40) {
    background = 'blue';
  } else {
    background = 'green';
  }

  return (
    <div className="ball" style={{ background }}>{number}</div>
  )
});

export default Ball;
```
## 로또추첨기 Hooks로 교체
* useEffect, useMemo, useCallback의 사용 익히기.
  - useEffect의 두번째 인자 []가 비어있으면 componentDidMount역할
  - useEffect의 두번째 인자 []가 값이 있으면 componentDidMount, componentDidUpdate모두수행.
    - 값이 바뀐걸 판단하는건 대상 변수 자체가 바뀌었을때를 체크한다. 변수 내부 아이템이 변경되는건 바뀐걸 체크하지 않는다.
```javascript
import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import Ball from './Ball';

function getWinNumbers() {
  console.log('getWinNumbers');
  const candidate = Array(45).fill().map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}

const Lotto = () => {
  const lottoNumbers = useMemo(() => getWinNumbers(), []);
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]);

  useEffect(() => {
    console.log('useEffect');
    for (let i = 0; i < winNumbers.length - 1; i++) {
      timeouts.current[i] = setTimeout(() => {
        setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
      }, (i + 1) * 1000);
    }
    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000);
    return () => {
      timeouts.current.forEach((v) => {
        clearTimeout(v);
      });
    };
  }, [timeouts.current]); // 빈 배열이면 componentDidMount와 동일
  // 배열에 요소가 있으면 componentDidMount랑 componentDidUpdate 둘 다 수행

  useEffect(() => {
    console.log('로또 숫자를 생성합니다.');
  }, [winNumbers]);

  const onClickRedo = useCallback(() => {
    console.log('onClickRedo');
    console.log(winNumbers);
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
  }, [winNumbers]);

  return (
    <>
      <div>당첨 숫자</div>
      <div id="결과창">
        {winBalls.map((v) => <Ball key={v} number={v} />)}
      </div>
      <div>보너스!</div>
      {bonus && <Ball number={bonus} onClick={onClickRedo} />}
      {redo && <button onClick={onClickRedo}>한 번 더!</button>}
    </>
  );
};
export default Lotto;
```
* `useMemo사용`
* (이슈체크)Hooks로 변경했을때 함수 전체가 다시실행되므로 getWinNumbers도 매번 호출된다.(문제점)
  - (이전소스)
  ```javascript
  // getWinNumbers를 사용한곳
  const [winNumbers, setWinNumbers] = useState(getWinNumbers());
  ```
  - useMemo로 한번 셋팅한 값 기억하고 유지하는 방법
  ```javascript
  // getWinNumbers를 호출하여 셋팅한 값을 useMemo를 사용함으로써 값을 기억하고 다시 getWinNumbers함수를 호출하지 않는다.
  // useEffect, useMemo, useCallback은 두번째 인자[]가 있다. []의 값이 변경됬을때 체크하는 인자값.
  // 결론: useMemo()는 함수결과값 기억, useRef는 일반값 기억.
  const lottoNumbers = useMemo(() => getWinNumbers(), []);
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  ```
* `useCallback사용`
* useCallback은 함수 자체를 기억하는것. (useMemo는 함수의 return값을 기억)
* 함수를 따로 빼서 jsx에서 그 함수를 자주 콜해서 사용했을때 useCallback을 사용한 함수는 그 함수 자체를 기억하므로 매번 생성되지 않는다.(성능에 좋음)
  - (중요) useCallback을 사용했을때 너무 기억이 강해서 변경되어야할 값들이 항상 같을 수 있다.
  - 이때~! useCallback의 두번째 인자 []에 변경됐을때 수행할 값을 넣어줘서 실행하면 그 값으 변화된 값으로 함수가 수행된다.(중요)
* (중요) 자식컴포넌트에 props로 함수를 넘길때는 반드시 useCallback을 사용한다.
  - 자식컴포넌트는 넘겨받은 함수가 매번 바뀌므로 매번 다시 생성해서 받아들인다.
```javascript
const onClickRedo = useCallback(() => {
  console.log('onClickRedo');
  console.log(winNumbers);
  setWinNumbers(getWinNumbers());
  setWinBalls([]);
  setBonus(null);
  setRedo(false);
  timeouts.current = [];
}, [winNumbers]);

return (
  <>
    <div>당첨 숫자</div>
    <div id="결과창">
      {winBalls.map((v) => <Ball key={v} number={v} />)}
    </div>
    <div>보너스!</div>
    {bonus && <Ball number={bonus} onClick={onClickRedo} />}
    {redo && <button onClick={onClickRedo}>한 번 더!</button>}
  </>
);
```

## Hooks관련 중요 팁
* hooks는 절대 조건문 안에 넣으면 안됨.
  - 실행 순서가 확실해야함.
* 되도록이면 함수, 반복문 안에도 넣지 않는게 좋음.
* useMemo()는 함수결과값 기억, useRef는 일반값 기억, useCallback은 함수 자체를 기억.
* 자식컴포넌트에 props로 함수를 넘길때는 무조건 useCallback사용.
* useEffect는 여러번 써도 된다.
  - class에서는 componentDidUpdate에서 한번에 조건문으로 할 수 있으나 useEffect에서는 여러번 나눠서 사용한다.
* ajax같은걸 update에서만 사용하고 싶을때는
```javascript
const mounted = useRef(false);
// mount
useEffect(() => {

}, []);

// update
useEffect(() => {
  if (!mounted.current) { // 처음엔 ajax를 하지 않기 위해
    mounted.current = true;
  } else {  // 이 후 update될때는 ajax실행
    // ajax
  }
}, [바뀌는값]);
```

## useReducer 소개 (틱택토)
* redux의 reducer를 가져왔다고 생각하면 됨.
* 소규모 앱 에서는 useReducer와 context api로 사용할 수는 있으나 대규모 앱 에서는 아무래도 redux를 사용하지 않고서는 힘들다.

* TicTacToe.jsx, Table.jsx, Tr.jsx, Td.jsx 파일 생성

```javascript
// TicTacToe.jsx==========================================
import React, { useEffect, useReducer, useCallback } from 'react';
import Table from './Table';

const initialState = {
  winner: '',
  turn: 'O',
  tableData: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
  recentCell: [-1, -1],
};

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_WINNER:
      // state.winner = action.winner; 이렇게 하면 안됨.
      return {
        ...state,
        winner: action.winner,
      };
    case CLICK_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...tableData[action.row]]; // immer라는 라이브러리로 가독성 해결
      tableData[action.row][action.cell] = state.turn;
      return {
        ...state,
        tableData,
        recentCell: [action.row, action.cell],
      };
    }
    case CHANGE_TURN: {
      return {
        ...state,
        turn: state.turn === 'O' ? 'X' : 'O',
      };
    }
    case RESET_GAME: {
      return {
        ...state,
        turn: 'O',
        tableData: [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ],
        recentCell: [-1, -1],// 바뀐값을 기억하기 위함 (useEffect에서 사용하기 위해)
      };
    }
    default:
      return state;
  }
};

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, turn, winner, recentCell } = state;
  // const [winner, setWinner] = useState('');
  // const [turn, setTurn] = useState('O');
  // const [tableData, setTableData] = useState([['', '', ''], ['', '', ''], ['', '', '']]);

  const onClickTable = useCallback(() => {
    dispatch({ type: SET_WINNER, winner: 'O' });
  }, []);

  useEffect(() => {
    const [row, cell] = recentCell;
    if (row < 0) {
      return;
    }
    let win = false;
    if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
      win = true;
    }
    if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
      win = true;
    }
    if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
      win = true;
    }
    if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
      win = true;
    }
    console.log(win, row, cell, tableData, turn);
    if (win) { // 승리시
      dispatch({ type: SET_WINNER, winner: turn });
      dispatch({ type: RESET_GAME });
    } else {
      let all = true; // all이 true면 무승부라는 뜻
      tableData.forEach((row) => { // 무승부 검사
        row.forEach((cell) => {
          if (!cell) {
            all = false;
          }
        });
      });
      if (all) {
        dispatch({ type: SET_WINNER, winner: null });
        dispatch({ type: RESET_GAME });
      } else {
        dispatch({ type: CHANGE_TURN });
      }
    }
  }, [recentCell]);

  return (
    <>
      <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch} />
      {winner && <div>{winner}님의 승리</div>}
    </>
  )
};
export default TicTacToe;

// Table.jsx=================================================
import React from 'react';
import Tr from './Tr';

const Table = ({ tableData, dispatch }) => {
  return (
    <table>
      <tbody>
        {Array(tableData.length).fill().map((tr, i) => (
          <Tr key={i} dispatch={dispatch} rowIndex={i} rowData={tableData[i]} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;

// Tr.jsx====================================================
import React, { memo } from 'react';
import Td from './Td';

const Tr = memo(({ rowData, rowIndex, dispatch }) => {
  console.log('tr rendered');
  return (
    <tr>
      {Array(rowData.length).fill().map((td, i) => (
        <Td key={i} dispatch={dispatch} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]}>{''}</Td>
      ))}
    </tr>
  );
});

export default Tr;

// Td.jsx=====================================================
import React, { useCallback, memo } from 'react';
import { CLICK_CELL } from './TicTacToe';

const Td = memo(({ rowIndex, cellIndex, dispatch, cellData }) => {
  console.log('td rendered');

  const onClickTd = useCallback(() => {
    console.log(rowIndex, cellIndex);
    if (cellData) {
      return;
    }
    dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
  }, [cellData]);

  return (
    <td onClick={onClickTd}>{cellData}</td>
  )
});

export default Td;
```
* state는 최상단 컴포넌트(TicTacToe)에 있고 이벤트가 발생하는곳은 Td컴포넌트이다.
  - 많이 떨어져있는 부모자식 관계 구조이다.
  - 이런구조를 해결을 위해 context api를 사용하기도 함.
* 많은 state를 관리하기 위하여 useReducer를 사용.
  - 아래와 같이 많은 state를 reducer로 옮겨 관리한다.
  - reducer의 하나에 통일되서 관리가 된다.
```javascript
// 초기 state값 셋팅
const initialState = {
  winner: '',
  turn: 'O',
  tableData: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
  recentCell: [-1, -1],// 바뀐값을 기억하기 위함 (useEffect에서 사용하기 위해)
};

// reducer에서 state를 어떤식으로 바꿀지를 적어준다.
const reducer = (state, action) => {};

const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, turn, winner, recentCell } = state;
  // const [winner, setWinner] = useState('');
  // const [turn, setTurn] = useState('O');
  // const [tableData, setTableData] = useState([['', '', ''], ['', '', ''], ['', '', '']]);
```
* reducer사용
  - state는 직접 바꾸지 않고 action -> reducer -> state 와 같은 흐름으로 state값을 바꾼다.
  - action의 type명은 보통 대문자로 한다.
  - Array의 fill, map, reduce등과 같은 메서드 알필요있음.
  - `여기서 문제는 dispatch를 사용하는 곳까지(자식의 자식의 자식...) props로 넘겨줘야한다.`
    - `그래서 나중에 이부분에 context api를 사용한다.`
```javascript
// 초기 state값 셋팅
const initialState = {
  winner: '',
  turn: 'O',
  tableData: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
  recentCell: [-1, -1],
};

export const SET_WINNER = 'SET_WINNER';

// reducer에서 state를 어떤식으로 바꿀지를 적어준다.
const reducer = (state, action) => {
  // 액션 타입에 따라 값들은 적용하는 로직이 들어간다.
  switch (action.type) {
    case SET_WINNER:
      // state.winner = action.winnner; 이렇게 넣으면 절대 안됨.
      return {...state, winner: action.winner}; // immer 라이브러리로 가독성 해결.
  }
};

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // 컴포넌트에 넣어줄 함수 이므로 useCallback으로 묶어준다.
  const onClickTable = useCallback(() => {
    // 리듀서의 dispatch를 사용하여 state의 값을 사용해보자.
    // 인자로 넘겨주는action객체, type은 리듀서의 액션type명을 넣어준다.
    // 두번째로 원하는state명에 값을 넣어준다.
    dispatch({type: 'SET_WINNER', winner: 'O'}); // 액션역할
  });

  return (
    <>
      <Table onClick={onClickTable} />
      {/*useReducer의 state에 들어있으므로 구조분해된 state. 이렇게 쓴다.*/}
      {state.winner && <div>{state.winner}님의 승리</div>}
    </>
  );
};
export default TicTacToe;
```
## 계속 틱택토 컴포넌트 완성하기.
* state는 비동기로 값이 바뀌니까 바꾸고 바로 아래라인에서 console을 찍으면 아직 바뀌지 않은 상태이다.
  - 그래서 이럴때 useEffect를 사용하여 코딩한다.
  - 바뀐값을 useEffect의 두번째 인자로 체크하기 위한 recentCell값을 만들어 체크하였다.

## rendering관련하여 성능 최적화 진행
* devTools를 이용하며 체크한다.
* 렌더링이 많이 발생할때 어떤state때문에 이런 렌더링이 발생하는지 체크하는 팁.
```javascript
const ref = useRef([]);// 빈배열의 ref를 만든다.
useEffect(()=>{
  // 이렇게 해서 어떤게 바뀌고 어떤게 안바뀌는지 알 수 있음.
  // 성능최적화를 위해 우선 바뀌는값 파악을 위한 임시코딩.
  console.log(rowIndex===ref.current[0], cellIndex===ref.current[1], dispatch===ref.current[2], cellData===ref.current[3]);
  ref.current = [rowIndex, cellIndex, dispatch, cellData];
}, [rowIndex, cellIndex, dispatch, cellData]); // 의심가는 state를 모두 넣어준다.
```
* useMemo는 값을 기억하는건데 콤포넌트를 그릴때 컴포넌트를 기억할 수도 있다.
  - 우선 `React.memo`를 각각 자식 컴포넌트에 적용해 보고 그래도 문제가 있으면 아래처럼 차선책으로 useMemo를 사용해본다.
  - 리랜더링은 자식에서 부모로 전파 되므로 사실 최상위컴포넌트는 의미가 없을 수도 있다.
```javascript
return (
  <tr>
    useMemo(
      () => <Td key={i} dispatch={dispatch} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]}>{''}</Td>,
      [rowData[i]], // 로우데이터가 바뀌었을때만 새로 그린다.
    )
  </tr>
)
```

## Context API 소개 (지뢰찾기)
* 부모 자식 관계
  - MineSearch -> Form, Table -> Tr -> Td
  - MineSearch에 context API를 설정하면 그 아래 모든 자식에서 바로 사용할 수 있는것 만들기.
* 우선 최상단 부모인 MineSearch컴포넌트에 Context를 설정한다.
```javascript
import React, {createContext, useMemo} from 'react'; // createContext를 가져온다.

// context를 하나 만든다.
// createContext함수에 인자로 초기 기본값을 넣어줄 수 있다.(type만 맞춰준다.)
// 만들어진 TableContext는 다른 파일에서 사용할 수 있게 export해준다.
export const TableContext = createContext({
  tableData: [],
  dispatch: () => {},
});

// 리듀서로 담겨있는 state
const [state, dispatch] = useReducer(reducer, initialState);

// render return부분의 jsx에 자식 컴포넌트에서 context로 접근하고자 하는 컴포넌트를 TableContext.Provider로 묶어준다.
// 그리고 넘겨질 값들은 value속성에 객체로 넘겨준다.
// <TableContext.Provider value={{ tableData: state.tableData, dispatch }}>
// 중요 : value에 들어가는 값은 위 처럼 그냥 넣으면 안되고 반드시 캐싱해서 넣어줘야한다.(useMemo)
// ---- value에 값을 바로 객체로 넣어주면 매번 새로 생성되며, 자식컴포넌트에서도 매번 render된다.
// ---- 그래서 최종 아래 소스처럼 useMemo로 묶어서 값을 캐싱해준다.
// ---- dispatch는 값변화가 없기 때문에 변화값인자로 안넣어준다.
const value = useMemo(() => ({ tableData: state.tableData, dispatch }), [state.tableData]);

return (
  <TableContext.Provider value={value}>
    <Form />
    <div>{state.timer}</div>
    <Table />
    <div>{state.result}</div>
  </TableContext.Provider>
);
```
* 위에서 부모컴포넌트에서 설정된 context API를 자식 컴포넌트에서 사용하는 부분
```javascript
// useContext를 가져온다.
import React, {useContext} from 'react';
// 부모에서 export한 context API인 'TableContext'를 가져온다.
import { TableContext } from './MineSearch';
// 가져온 TableContext를 useContext함수 인자로 넣어서 생성한다.
// 여기에는 부모컴포넌트에서 넣어줬던 값들을 그대로 구조분해 해서 바로 쓸 수 있다.
const { dispatch } = useContext( TableContext );

// dispatch를 사용하여 액션을 사용하는 부분.
const onClickBtn = useCallback(() => {
  dispatch({ type:START_GAME, row, cell, mine });
}, [row, cell, mine]);

```

## context API사용한 컴포넌트 최적화하기
* 중요: 개발 후 최적화는 필수 사항이므로 최적화를 해준다.
  - memo, useMemo, useCallback 를 적절히 사용해야한다.
* context API를 쓰면 기본적으로 최적화가 힘들 수 있다.
  - context API를 사용한 자식 컴포넌트는 비록 호출이 되더라도 아래와 같이 최적화를 하면 render는 하지 않게 적용할 수도있다. (console.log를 찍어 직접 확인하는 습관을 들이자.)
```javascript
// 이렇게 return부분을 useMemo로 묶어줄 수도있다.
return useMemo(() => {
  <td 
    style={getTdStyle(tableData[rowIndex][cellIndex])} 
    onClick={onClickTd}
    onContextMenu={onRightClickTd}
  >
    {getTdText(tableData[rowIndex][cellIndex])}
  </td>
}, [tableData[rowIndex][cellIndex]]);
// 어떤땐 아래와 같이 따로 콤포넌트로 빼는게 더 효율적일 수도있다.
return <RealTd onClickTd={onClickTd} onRightClickTd={onRightClickTd} data={tableData[rowIndex][cellIndex]} />;

const RealTd = memo(({ onClickTd, onRightClickTd, data}) => {
  console.log('real td rendered');
  return (
    <td
      style={getTdStyle(data)}
      onClick={onClickTd}
      onContextMenu={onRightClickTd}
    >{getTdText(data)}</td>
  )
});
```