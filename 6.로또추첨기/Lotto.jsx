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

    componentDidMount() {
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
    };

    componentWillUnmount() {
        this.timeouts.forEach((v) => {
            clearTimeout(v);
        });
    };

    onClickRedo = () => { //초기화
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
