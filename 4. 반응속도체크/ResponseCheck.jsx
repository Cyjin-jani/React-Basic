//import React, { Component } from 'react';

const React = require('react');
const { Component } = React;

class ResponseCheck extends Component {
   state = {
      state: 'waiting', //state 안에 state라는 것을 쓸 수 있다.
      message: '클릭해서 시작하세요',
      result: [],
   };

   onClickScreen = () => {

   };

   renderAverage = () => {
      const { result } = this.state;
      return result.length === 0
         ? null
         : <div> 평균 시간: {this.state.result.reduce((a,c) => a+c) / this.state.result.length}ms </div>
   };
   
   render() {
      const {state, message} = this.state;
      return (
      <>
         <div
            id="screen"
            className={state}
            onClick={this.onClickScreen}
         >
            {message}
         </div>
         {/* 리액트에서는 if 조건문을 따로 쓸 수가 없어서 삼항 연산자를 써야만 한다. */}
         {/* 그리고 for라는 반복문도 사용할 수 없기에, map함수를 써야 한다 */}
         {this.renderAverage()}
      </>   
      );
   }
}

module.exports =  ResponseCheck;