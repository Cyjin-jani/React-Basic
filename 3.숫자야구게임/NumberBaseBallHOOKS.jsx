const React = require('react');
const { useState, memo } = React;
const Try = require('./Try');

function getNumbers() { //숫자 4개를 겹치지 않고 랜덤하게 뽑는 함수
    const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const array = [];
    for (let i=0; i < 4; i+=1) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
}
const NumberBaseBall = memo(() => {
    const [result, setResult] = useState('');
    const [value, setValue] = useState('');
    const [answer, setAnswer] = useState(getNumbers());
    const [tries, setTries] = useState([]);
    
    const onSubmitForm = (e) => { //숫자야구 로직
        e.preventDefault();
        if (value === answer.join('')) {
            setResult('홈런!');
            setTries((prevTries) => {
                return [...prevTries, {try: value, result: '홈런!'}]
            });
            alert('게임을 다시 시작합니다.');
            setValue('');
            setAnswer(getNumbers());
            setTries([]);
        } else { //답 틀린 경우
            const answerArray = value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if (tries.length >= 9) { //10번 이상 틀렸을 때
                setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')}`);
                alert('게임을 다시 시작합니다.');
                setValue('');
                setAnswer(getNumbers());
                setTries([]);
            } else { //10번 이내로 틀린 경우 기회를 줌
                for (let i=0; i < 4; i+=1) {
                    if(answerArray[i] === answer[i]) {
                        strike += 1;
                    } else if (answer.includes(answerArray[i])) {
                        ball += 1;
                    }
                }
                setTries((prevTries) => [...prevTries, { try: value, result: `${strike} 스트라이크, ${ball} 볼 입니다.`}]);
                setValue('');
            }
        }

    };

    const onChangeInput = (e) => {
        setValue(e.target.value);
    };

    return (
        <>
        <h1> {result} </h1>   
        <form onSubmit={onSubmitForm}>
        <input maxLength={4} value={value} onChange={onChangeInput}/> 
        </form> 
        <div>시도: {tries.length}</div>
        <ul>
            {/* 평범하게 for써서 만들어보기 */}
            {/* 이 코드는 바로 아래 map을 사용한 것과 같은 기능을 함 */}
            {/* {(() => {
                const array = [];
                for (let i=0; i<array.length; i++) {
                    //배열안에 jsx를 넣어서 리턴할 수도 있다!!
                    array.push(<Try key={`${ i+1 }차 시도 : `} tryInfo = {v} />);
                }
                return array;
            })()} */}
            {tries.map((v,i) => {
                return (
                    <Try key={`${ i+1 }차 시도 : `} tryInfo = {v} />
                );
            })}
        </ul>
        </>    
    );
});

module.exports = NumberBaseBall;
