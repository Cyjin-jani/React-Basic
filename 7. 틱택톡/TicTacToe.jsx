const React = require('react');
const { useState, useReducer, useCallback } = React;
const Table = require('./Table');

const initialState = {
    winner: '',
    turn: 'o',
    tableData: [['', '', ''], ['', '', ''], ['', '', '']],
};

const SET_WINNER = 'SET_WINNER'; //상수로 빼두는 것이 좋음, 액션의 이름은 대문자로 하는 것이 보통 규칙

const reducer = (state, action) => {
    //이 안에서 state를 어떻게 바꿀지 적어주는 것.
    switch (action.type) {
        case SET_WINNER : 
            // state.winner = action.winner; 이렇게 하면 안됨
            return {
                ...state, //기존 객체를 새롭게 복사하는 스펠드? 문법이라고 함 (얕은 복사)
                winner: action.winner, //바뀔 부분만 새롭게 바꿔주는 것
            };
    };
};


const TicTacToe = () => {
    const [state, dispatch] = useReducer(reducer, initialState); //원래 인자가 3개까지 있지만 요 2개로 충분!
    // const [winner, setWinner] = useState('');
    // const [turn, setTurn] = useState('o');
    // const [tableData, setTableData] = useState([['', '', ''], ['', '', ''], ['', '', '']]);
    
    const onClickTable = useCallback(() => {
        dispatch({ type: SET_WINNER, winner: 'o' }); //dispatch안에 들어가는 것이 액션객체이다. 이 객체안에 타입 등을 적어두면 된다. 
        //액션만 있다고 state가 바뀌는 것이 아니고, 실제로 액션을 하게끔 해주는 것이 바로 reducer이다
        //action을 dispatch할 때 마다 액션이 실행이 된다
    
    }, []);
    
    
    return (
    <>
        <Table onClick={onClickTable} tableData={state.tableData} />
        {state.winner && <div>{state.winner}님의 승리</div>}
    </>    
    );
};


module.exports = TicTacToe;