//import React, { Component } from 'react';

const React = require('react');
const { Component } = React;

class ResponseCheck extends Component {
   state = {
      state: 'waiting', //state 안에 state라는 것을 쓸 수 있다.
      message: '클릭해서 시작하세요',
      result: [],
   };

   timeout; //타임아웃을 초기화 하기 위함.
   startTime; //다시 랜더링 되는걸 피하기 위해 state에 넣지 않고 따로 변수로 선언
   endTime;

   onClickScreen = () => {
      const { state, message, result } = this.state;
      if (state === 'waiting') {
         this.setState({
            state: 'ready',
            message: '초록색이 되면 클릭하세요.'
         });
         this.timeout = setTimeout(() => { //타임아웃이 초기화 될 경우를 위해 변수에 넣음.
            this.setState({
               state: 'now',
               message: '지금 클릭',
            });
            this.startTime = new Date();
         }, Math.floor(Math.random() * 1000) + 2000); //2~3초 랜덤
      } else if (state === 'ready') { //성급하게 클릭한 경우
         clearTimeout(this.timeout); //timeout의 초기화
         this.setState({
            state: 'waiting',
            message: '너무 성급하셨네요! 초록색이 된 후에 클릭해주세요'
         });
      }else if (state === 'now') { //반응 속도 체크
         this.endTime = new Date();
         this.setState((prevState) => {
            return {
               state: 'waiting',
               message: '클릭해서 시작하세요',
               result: [...prevState.result, this.endTime - this.startTime],
            }
         });
      }
   };

   onReset = () => {
      this.setState({
         result: [],
      });
   };

   renderAverage = () => {
      const { result } = this.state;
      return result.length === 0
         ? null
         : <>
            <div> 평균 시간: {result.reduce((a,c) => a+c) / result.length}ms </div>
            <button onClick={this.onReset}>리셋</button>
         </>
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