
const React = require('react');
const { useState, useRef, useEffect } = React;

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

//                     result, imgCoord, score
// componentDidMount
// componentDidUpdate
// componentWillUnmount
//class에서는 위 표를 가로방식으로 보면 됨 (즉, component~~가 기준)
//반대로 훅스에서는 세로로 보면 됨, 물론 result, imgCoord 두개를 포함한 세로도 가능

const RSP = () => {
   const [result, setResult] = useState('');
   const [imgCoord, setImgCoord] = useState(rspCoords.바위); //0보다는 이런식으로 상수로 빼주는 것이 더 좋은 습관이다
   const [score, setScore] = useState(0);
   const interval = useRef();

   useEffect(() => { //componentDidMount, componentDidUpdate 역할 (1대1대응은 아님)
      console.log('다시 실행');
      interval.current = setInterval(changeHand, 100);

      return () => { //componentWillUnmount 역할
         console.log('종료');
         clearInterval(interval.current);
      }
   }, [imgCoord]); //2번째 인수 배열이 클로저 같은 역할을 해줌.
   //배열에 아무것도 넣지 않으면 처음 랜더링 될 때만 실행되고, 그 이후에는 뭐가 바뀌어도 신경쓰지 않게되서 랜더링을 하지 않음.
   //즉, 배열에 아무것도 없는 상태가 componentDidMount이고, 배열에 무언가 들어 있으면 componentDidUpdate 역할을 함
   //배열에 넣은 imgCoord가 바뀔 때 마다, useEffect함수가 계속 실행이 된다. 그러므로 위에 임시로 적어둔 로그가 계속 쌓임
   //즉, 배열에는 꼭 useEffect를 다시 실행할 값만 넣어야 함
   //매번 clearInterval을 하는 꼴이 되기 때문에, 그냥 setTimeout을 하는 것과 동일하다
   
   //또한, 아래와 같이 효과를 다르게 주고 싶을 경우, 여러번 useEffect의 사용이 가능하다
   //다만, class 방식의 경우 componentDidMount나 componentDidUpdate에서 모든 state를 조건문으로 분기 처리해야 함
   // useEffect(() => { //componentDidMount, componentDidUpdate 역할 (1대1대응은 아님)
   //    console.log('다시 실행');
   //    interval.current = setInterval(changeHand, 100);

   //    return () => { //componentWillUnmount 역할
   //       console.log('종료');
   //       clearInterval(interval.current);
   //    }
   // }, [score]); 
   // useEffect(() => { //componentDidMount, componentDidUpdate 역할 (1대1대응은 아님)
   //    console.log('다시 실행');
   //    interval.current = setInterval(changeHand, 100);

   //    return () => { //componentWillUnmount 역할
   //       console.log('종료');
   //       clearInterval(interval.current);
   //    }
   // }, [result]); 

   const changeHand = () => {
      if(imgCoord === rspCoords.바위) {
         setImgCoord(rspCoords.가위);
       } else if(imgCoord === rspCoords.가위) {
         setImgCoord(rspCoords.보);
       } else if(imgCoord === rspCoords.보) {
         setImgCoord(rspCoords.바위);
       }
   };

   const onClickBtn = (choice) => () => {
      clearInterval(interval.current);
      const myScore = scores[choice];
      const cpuScore = scores[computerChoice(imgCoord)];
      const diff = myScore - cpuScore;

      if(diff === 0) { //setState가 여러개 있어도 setState를 다 하고 렌더링 한번한다.(인터벌로 각각 setState를 하는게 아닌 이상..)
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
           <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }}></div>
         <div>
            <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button> 
            {/* onclick메소드 안에 함수를 호출하는 부분이 들어있는 경우, 밖으로 빼낼 수 있다(고차함수 활용) */}
            <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
            <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
         </div>
         <div>{result}</div>
      <div>현재 점수 : {score} 점</div>
      </>
   );
};

module.exports =  RSP;