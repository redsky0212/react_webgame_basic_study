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
    - 모듈 시스템으로 인해 파일로 많이 분리하고 필요한것만 불러와 넣을 수 있게 되었다.
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
