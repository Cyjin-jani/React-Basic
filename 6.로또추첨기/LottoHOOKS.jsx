const React = require('react');
const { useState, useRef, useEffect, useMemo, useCallback } = React;
const Ball = require('./Ball');

function getWinNumbers() { //state 안쓰는 경우는 이렇게 분리 해두면 편함
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map((v,i)=> i + 1);
    const shuffle = [];
    while (candidate.length > 0 ) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
    return [...winNumbers, bonusNumber];
}
//Hooks는 순서가 매우 중요!
const Lotto = () => {
    const lottoNumbers = useMemo(()=> getWinNumbers(), []); //두번째 인자가 바뀌지 않는 한 다시 실행되지 않음
    //useMemo를 쓰면 해당 값을 캐싱(?)하여 미리 가지고 있을 수 있다 (함수의 실행값을 저장하기 위함)
    //useMemo: 복잡한 함수 결과 값을 기억 useRef: 일반 값을 기억
    //useCallback은 함수 자체를 기억하고 있는 것
    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [winBalls, setWinBalls] = useState([]);
    //순서 중요의 예시
    // if (조건){
    //     const [redo, setRedo] = useState(false);
    // }
    //이런 식으로 특정 조건에서만 hooks가 실행되도록 하는 것은 문제...
    //조건문 안에 절대 넣으면 안되고, 함수나 반복문 안에도 웬만하면 넣지 말아야 함
    //즉, hooks는 무조건 최상위에 위치하도록 하기
    //그리고 마찬가지로 useEffect, useMemo, useCallback 안에서 useState를 쓰지 않도록 한다
    //무엇이 먼저 실행될 지 알 수 없음.... 에러가 날 수도 있다
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeouts = useRef([]);

    useEffect(()=> {
        console.log('useEffect');
        for(let i=0; i < winNumbers.length-1; i++) {
            timeouts.current[i] = setTimeout(() => {
                setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
            }, (i + 1) * 1000);
        }
        timeouts.current[6] = setTimeout(() => {
            setBonus(winNumbers[6]);
            setRedo(true);
        }, 7000);
        return () => {
            timeouts.current.forEach((v) => {
                clearTimeout(v);
            });
        };
    }, [timeouts.current]); //[]배열자리가 빈 배열이면 componentDidMount와 동일
    //배열에 요소가 있으면, componentDidMount, componentDidUpdate 둘 다 수행

    //useEffect는 여러번 사용이 가능 (자신이 원하는 대로 componentDidUpdate를 하는 느낌)
    useEffect(()=>{
        console.log('로또숫자를 생성합니다!');
    }, [winNumbers]); //여기서는 winNumbers가 바뀔 때 마다 이 useEffect를 실행함

    //componentDidUpdate에서만! 실행되도록 하고 싶은 경우는 아래와 같이 사용 (componentDidMount는 x)
    //아래와 같은 패턴을 적용해보자
    // const mounted = useRef(false);
    // useEffect(() => {
    //     if(!mounted.current) {
    //         mounted.current = true;
    //     } else {
    //         //ajax처리
    //     }
    // }, [바뀌는 값]);
    //반대로, componentDidMount만 하고 싶은 경우는 그냥 useEffect의 2번째 인자 배열에 아무것도 넣지 않으면 된다

    const onClickRedo = useCallback(() => { //state 초기화
        console.log('Redo');
        console.log(winNumbers);
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current = []; //이때 timeouts.current가 바뀜
    }, [winNumbers]); //useCallback도 2번째 인자 배열 안의 값이 바뀌면 그걸 인지해서 다시 실행함
    //useCallback을 사용한 함수 안에서 state의 값을 사용(참조나 변경 등)을 하는 경우,
    //두번째 인자에 똑같은 state를 세팅해줘야함
    //useCallback을 필수로 적용해주어야 할 경우가 생김 (=자식 컴포넌트에 props로 함수를 넘길 경우 useCallback필수)
    //자식 컴포넌트에 넘기는 함수를 useCallback을 안하면, 매번 새로운 함수로 가정하여 렌더링을 다시 해버림

    return (
        <>
        <div>당첨 숫자</div>
        <div id="결과창">
            {winBalls.map((v) => <Ball key={v} number={v} />)} {/*반복문 기점으로 컴포넌트 분리 */}
        </div>
        <div>보너스!</div>
        {bonus && <Ball number={bonus} />}
        {redo && <button onClick={onClickRedo}>한 번 더!</button>}
        </>
    );
}


module.exports = Lotto;
