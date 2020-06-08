const React = require('react');
const { useState, useReducer } = React;
const Table = require('./Table');

const initialState = {
    winner: '',
    turn: 'o',
    tableData: [['', '', ''], ['', '', ''], ['', '', '']],
};

const reducer = (state, action) => {
    //이 안에서 state를 어떻게 바꿀지 적어주는 것.
};

const TicTacToe = () => {
    const [state, dispatch] = useReducer(reducer, initialState); //원래 인자가 3개까지 있지만 요 2개로 충분!
    // const [winner, setWinner] = useState('');
    // const [turn, setTurn] = useState('o');
    // const [tableData, setTableData] = useState([['', '', ''], ['', '', ''], ['', '', '']]);
    return (
    <>
        <Table />
        {winner && <div>{winner}님의 승리</div>}
    </>    
    );
};


module.exports = TicTacToe;