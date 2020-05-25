//import React, { PureComponent } from 'react';
const React = require('react');
const { PureComponent, memo } = React; //HOOKS일 경우엔 PureComponent 대신 memo라는 녀석을 쓴다


//memo로 감싸주는 것이 필요!
const Try = memo (({ tryInfo }) => { // props가 오는 자리. props라고 해도 되고, 구조분해문법도 가능하다.
    return (
        <li>
           <div>{tryInfo.try}</div> 
           <div>{tryInfo.result}</div> 
        </li>
    )
});

//class형태 
// class Try extends PureComponent {
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
