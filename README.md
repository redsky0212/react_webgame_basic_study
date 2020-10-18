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