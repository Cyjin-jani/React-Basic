const React = require('react');
const { Component } = React;
const Ball = require('./Ball');

function getWinNumbers() {
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

class Lotto extends Component {
    state = {
        winNumbers: getWinNumbers(), //당첨 숫자들
        winBalls: [], //당첨 숫자 6개가 들어갈 배열
        bonus: null, //보너스 공
        redo: false,
    };

    timeouts = [];

    runTimeouts = () => {
        console.log('runTimeOuts');
        const { winNumbers } = this.state;
        for(let i=0; i < winNumbers.length-1; i++) {
            this.timeouts[i] = setTimeout(() => {
                this.setState((prevState) => {
                    return {
                        winBalls: [...prevState.winBalls, winNumbers[i]],
                    }
                });
            }, (i + 1) * 1000);
        }
        this.timeouts[6] = setTimeout(() => {
            this.setState({
                bonus: winNumbers[6],
                redo: true,
            });
        }, 7000);
    }

    componentDidMount() {
        console.log('didMount');
        this.runTimeouts();
    };

    componentDidUpdate(prevPros, prevState) {//무언가 변화가 있을 경우, 실행됨
        console.log('didUpdate');
        if(this.state.winBalls.length === 0) { //이 조건문이 중요하다 (어떤 상황에 업데이트를 할지)
            this.runTimeouts();
        }
    };

    componentWillUnmount() {
        this.timeouts.forEach((v) => {
            clearTimeout(v);
        });
    };

    onClickRedo = () => { //state 초기화
        console.log('Redo');
        this.setState({
            winNumbers: getWinNumbers(),
            winBalls: [],
            bonus: null,
            redo: false,
        });
        this.timeouts = [];
    };

    render() {
        const {winBalls, bonus, redo} = this.state;
        return (
        <>
        <div>당첨 숫자</div>
        <div id="결과창">
            {winBalls.map((v) => <Ball key={v} number={v} />)} {/*반복문 기점으로 컴포넌트 분리 */}
        </div>
        <div>보너스!</div>
        {bonus && <Ball number={bonus} />}
        {redo && <button onClick={this.onClickRedo}>한 번 더!</button>}
        </>
        );
    }
}

module.exports = Lotto;
