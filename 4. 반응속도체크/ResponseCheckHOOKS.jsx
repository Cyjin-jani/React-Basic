//import React, { Component } from 'react';

const React = require('react');
const { useState, useRef } = React;

const ResponseCheck = () => {
   const [state, setState] = useState('waiting');
   const [message, setMessage] = useState('클릭해서 시작하세요');
   const [result, setResult] = useState([]);
   //class때와는 다르게 그냥 변수 선언하듯 this.~~로 선언이 불가하다
   //그래서 REF를 써주어야 한다
   //보통 돔에 접근하려 할 때 Ref를 쓰는것으로 알지만, 이런 경우에도 사용 가능
   const timeout = useRef(null);
   const startTime = useRef();
   const endTime = useRef();

   //useState와 useRef와의 다른점: state는 값이 바뀌면 결국 return이 실행되어, 렌더링이 되어 버린다
   //다만, Ref의 경우는 값이 바뀌어도 렌더링이 되지 않는다.
   //그러므로, 화면에서 보이는 부분이 아닌 값이 바뀌는 경우에는 불필요한 렌더링이 안되도록 ref에 넣어서 조작한다

   const onClickScreen = () => {
      if (state === 'waiting') {
         setState('ready');
         setMessage('초록색이 되면 클릭하세요.');
         timeout.current = setTimeout(() => { //타임아웃이 초기화 될 경우를 위해 변수에 넣음.
            setState('now');
            setMessage('지금 클릭');
            startTime.current = new Date();
         }, Math.floor(Math.random() * 1000) + 2000); //2~3초 랜덤
      } else if (state === 'ready') { //성급하게 클릭한 경우
         clearTimeout(timeout.current); //timeout의 초기화
         setState('waiting');
         setMessage('너무 성급하셨네요! 초록색이 된 후에 클릭해주세요');         
      }else if (state === 'now') { //반응 속도 체크
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
            <div> 평균 시간: {result.reduce((a,c) => a+c) / result.length}ms </div>
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
         {/* 리액트에서의 if와 for 사용 (for는 numberbaseballhooks에 있음)*/}
         {/* 함수 안에서는 기본적으로 if와 for가 사용 가능하기에, 함수형태로 만든다. 대신 즉시실행함수여야만 함 */}
         
         {/* 아래 renderAverage함수를 다시 적어보자 */}
         {/* {(() => {
            if (result.length === 0) {
               return null;
            } else {
               return <>
               <div> 평균 시간: {result.reduce((a,c) => a+c) / result.length}ms </div>
               <button onClick={onReset}>리셋</button>
            </>
            }
         })()} */}
         
         {renderAverage()}
      </> 
   );
   
};

module.exports =  ResponseCheck;