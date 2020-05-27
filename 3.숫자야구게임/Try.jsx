//import React, { PureComponent } from 'react';
const React = require('react');
const { PureComponent, memo, useState } = React; //HOOKS일 경우엔 PureComponent 대신 memo라는 녀석을 쓴다


//memo로 감싸주는 것이 필요!
const Try = memo (({ tryInfo }) => { // props가 오는 자리. props라고 해도 되고, 구조분해문법도 가능하다.
    //tryInfo.try = 'hello'; //이런식으로 props로 받은 값을 직접적으로 바꾸면 안된다! 
    //props는 부모가 바꿔주는 것이고, 자식이 바꾸는 것이 아니다 (리액트 원칙)
    //정 props를 바꾸어야 하는 경우에는 state에 넣어서 바꿔준다.
    //아래처럼 일단 props를 state로 만든 뒤, 아래 onClick에서 처럼 바꿔주면 된다
    const [result, setResult] = useState(tryInfo.result);

    //자식이 props를 바꾸어 버리면, 물려준 부모도 그걸 바꾸어야 하는데,
    //그렇게 되면 뜻하지 않게 props가 바뀌게 될 수 있고, 그건 결국 부모 쪽에 영향을 미치게 된다

    const onClick = () => {
        setResult('1');
    };

    return (
        <li>
           <div>{tryInfo.try}</div> 
           {/* <div>{tryInfo.result}</div>  */}
           <div onClick={onClick}>{result}</div> 

        </li>
    )
});

//class형태 
// class Try extends PureComponent {
        //class의 경우, props를 변경하고 싶을 때. (state에 넣고 싶을때)
        // state = {
        //     result: this.props.result,
        //     try: this.props.try,
        // };

//     render() {
//         const { tryInfo } = this.props; //비구조화 문법으로 간단하게!
//         console.log('랜더링 try'); 
//         return (
//             <li>
//                  {/* <b>{ this.props.value.fruit}</b> - {this.props.index}
//                  <div>컨텐츠1</div>
//                  <div>컨텐츠2</div>
//                  <div>컨텐츠3</div> */}
//                 {/* 숫자야구 */}
//                  <div>{tryInfo.try}</div>
//                  <div>{tryInfo.result}</div>
//             </li>
//         )
//     }
// }

module.exports = Try;
