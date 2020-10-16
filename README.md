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