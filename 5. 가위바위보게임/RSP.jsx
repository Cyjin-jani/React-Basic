//import React, { Component } from 'react';

const React = require('react');
const { Component } = React;

//실행 순서
//class의 경우 -> constructor 및 state, 만든 메서드들 -> render -> ref -> componentDidMount
// -> (setState/props 바뀔 때 -> shouldComponentUpdate(true) -> render -> componentDidUpdate)
// 부모가 나(자식 컴포넌트)를 없앴을 때 -> componentWillUnmount -> 소멸

//코드(가위바위보)
const rspCoords = {
   바위: '0',
   가위: '-142px',
   보: '-284px'
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
      result: ' ',
      imgCoord: '0',
      score: 0,
   }

   //인터벌 
   interval;

   //컴포넌트의 라이프사이클 (아래 3가지 함수)

   //render가 성공적으로 실행 되었다면, 아래 함수가 실행이 된다. (즉, 컴포넌트가 첫 렌더링 된 후 실행)
   //하지만, 그 다음부터 setState등으로 렌더링이 다시 되는 경우에는 실행되지 않음 (즉 초기에만 한 번 실행)
   componentDidMount() { // -> 여기에 비동기 요청을 많이 한다.
      //인터벌 예시
      //이 셋인터벌은 RSP 컴포넌트가 없어져도 그대로 남아서 돌아가게 되므로, 
      //아래에서 제거를 해주어야 한다.
       this.interval = setInterval(this.changeHand, 100);
   }

   //setState나 props가 바뀌었거나 등 리렌더링이 되는 경우, 리렌더링 후 실행되는 부분
   componentDidUpdate() {
      //요번 예시에서는 쓰이지 않음.
   }

   //컴포넌트가 제거되기 직전에 실행 됨
   //componentDidMount에서 했던 작업들을 제거하는 용도... (보통 쌍으로 쓰임)
   componentWillUnmount() { // -> 여기에 비동기 요청 정리를 많이 한다.
      //인터벌 예시
      //위에서 셋 인터벌 해준걸 지우지 않으면, 메모리 누수가 생김
      clearInterval(this.interval);
   }

   changeHand = () => { //1초마다 가위바위보 돌아감
      const {imgCoord} = this.state; //비동기 함수인 경우, 비동기 함수 바깥에 있는 변수 참조하면 클로저 문제가 발생!! 주의해야 함! 
      if(imgCoord === rspCoords.바위) {
         this.setState({
             imgCoord: rspCoords.가위,
          });
       } else if(imgCoord === rspCoords.가위) {
         this.setState({
            imgCoord: rspCoords.보,
         });
       } else if(imgCoord === rspCoords.보) {
         this.setState({
            imgCoord: rspCoords.바위,
         });
       }
    }

   onClickBtn = (choice) => {
      const {imgCoord} = this.state;
      clearInterval(this.interval);
      const myScore = scores[choice];
      const cpuScore = scores[computerChoice(imgCoord)];
      const diff = myScore - cpuScore;

      if(diff === 0) {
         this.setState({
            result: '비겼습니다!',
         });
      } else if ([-1, 2].includes(diff)) {
         this.setState((prevState) => {
            return {
               result: '이겼습니다',
               score: prevState.score + 1,
            };
         });
      } else {
         this.setState((prevState) => {
            return {
               result: '졌습니다ㅠ',
               score: prevState.score - 1,
            };
         });
      }
      setTimeout(() => {
         this.interval = setInterval(this.changeHand, 100);
      }, 2000);
   };

   render() {
      const { result, score, imgCoord } = this.state;
      return (
      <>
         <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }}></div>
         <div>
            <button id="rock" className="btn" onClick={() => this.onClickBtn('바위')}>바위</button>
            <button id="scissor" className="btn" onClick={() => this.onClickBtn('가위')}>가위</button>
            <button id="paper" className="btn" onClick={() => this.onClickBtn('보')}>보</button>
         </div>
         <div>{result}</div>
      <div>현재 점수 : {score} 점</div>
      </>
      );
   }
} 

module.exports =  RSP;