const React = require('react');
const { useState, useRef, useEffect } = React;
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

const Lotto = () => {
    const [winNumbers, setWinNumbers] = useState(getWinNumbers());
    const [winBalls, setWinBalls] = useState([]);
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

    const onClickRedo = () => { //state 초기화
        console.log('Redo');
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current = []; //이때 timeouts.current가 바뀜
    };

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
