//  import React, { useState, useReducer, useCallback } from 'react';
//  import { Table } from './Table';
// //const React = require('react');
// //const { useState, useReducer, useCallback } = React;
// //const Table = require('./Table');

// const initialState = {
//     winner: '',
//     turn: 'o',
//     tableData: [
//         ['', '', ''],
//         ['', '', ''],
//         ['', '', ''],
//     ],
// };

//   export const SET_WINNER = 'SET_WINNER'; //상수로 빼두는 것이 좋음, 액션의 이름은 대문자로 하는 것이 보통 규칙
//   export const CLICK_CELL = 'CLICK_CELL';
//   export const CHANGE_TURN = 'CHANGE_TURN';

// const reducer = (state, action) => {
//     //이 안에서 state를 어떻게 바꿀지 적어주는 것.
//     switch (action.type) {
//         case SET_WINNER : 
//             // state.winner = action.winner; 이렇게 하면 안됨
//             return {
//                 ...state, //기존 객체를 새롭게 복사하는 스펠드? 문법이라고 함 (얕은 복사)
//                 winner: action.winner, //바뀔 부분만 새롭게 바꿔주는 것
//             };
//         case CLICK_CELL: {
//             const tableData = [...state.tableData]; //객체 얕은 복사
//             console.log('얕은 복사');
//             console.log(tableData);
//             tableData[action.row] = [...tableData[action.row]]; //immer라는 라이브러리로 가독성 해결
//             tableData[action.row][action.cell] = state.turn; //지금 현재 state를 넣어준다고 보면 됨
//             return {
//                 ...state,
//             }; 
//         }
//         case CHANGE_TURN: {
//             return {
//                 ...state,
//                 turn: state.turn === 'o' ? 'x' : 'o',
//             };
//         }  
//     };
// };


// const TicTacToe = () => {
//     const [state, dispatch] = useReducer(reducer, initialState); //원래 인자가 3개까지 있지만 요 2개로 충분!
    
//     // const [winner, setWinner] = useState('');
//     // const [turn, setTurn] = useState('o');
//     // const [tableData, setTableData] = useState([['', '', ''], ['', '', ''], ['', '', '']]);
    
//     const onClickTable = useCallback(() => {
//         dispatch({ type: SET_WINNER, winner: 'o' }); //dispatch안에 들어가는 것이 액션객체이다. 이 객체안에 타입 등을 적어두면 된다. 
//         //액션만 있다고 state가 바뀌는 것이 아니고, 실제로 액션을 하게끔 해주는 것이 바로 reducer이다
//         //action을 dispatch할 때 마다 액션이 실행이 된다
    
//     }, []);
    
//     return (
//     <>
//         <Table onClick={onClickTable} tableData={state.tableData} dispatch={dispatch}/>
//         {state.winner && <div>{state.winner}님의 승리</div>}
//     </>    
//     );
// };

// export default TicTacToe;
// //module.exports = TicTacToe;
// //module.exports = SET_WINNER, CLICK_CELL, CHANGE_TURN;






import React, { useEffect, useReducer, useCallback } from 'react';
import Table from './Table';

const initialState = {
  winner: '',
  turn: 'O',
  tableData: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
  recentCell: [-1, -1],
};

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_WINNER:
      // state.winner = action.winner; 이렇게 하면 안됨.
      return {
        ...state,
        winner: action.winner,
      };
    case CLICK_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...tableData[action.row]]; // immer라는 라이브러리로 가독성 해결
      tableData[action.row][action.cell] = state.turn;
      return {
        ...state,
        tableData,
        recentCell: [action.row, action.cell],
      };
    }
    case CHANGE_TURN: {
      return {
        ...state,
        turn: state.turn === 'O' ? 'X' : 'O',
      };
    }
    case RESET_GAME: {
      return {
        ...state,
        turn: 'O',
        tableData: [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ],
        recentCell: [-1, -1],
      };
    }
    default:
      return state;
  }
};

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, turn, winner, recentCell } = state;
  // const [winner, setWinner] = useState('');
  // const [turn, setTurn] = useState('O');
  // const [tableData, setTableData] = useState([['', '', ''], ['', '', ''], ['', '', '']]);

  const onClickTable = useCallback(() => {
    dispatch({ type: SET_WINNER, winner: 'O' });
  }, []);

  useEffect(() => {
    const [row, cell] = recentCell;
    if (row < 0) {
      return;
    }
    let win = false;
    if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
      win = true;
    }
    if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
      win = true;
    }
    if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
      win = true;
    }
    if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
      win = true;
    }
    console.log(win, row, cell, tableData, turn);
    if (win) { // 승리시
      dispatch({ type: SET_WINNER, winner: turn });
      dispatch({ type: RESET_GAME });
    } else {
      let all = true; // all이 true면 무승부라는 뜻
      tableData.forEach((row) => { // 무승부 검사
        row.forEach((cell) => {
          if (!cell) {
            all = false;
          }
        });
      });
      if (all) {
        dispatch({ type: RESET_GAME });
      } else {
        dispatch({ type: CHANGE_TURN });
      }
    }
  }, [recentCell]);

  return (
    <>
      <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch} />
      {winner && <div>{winner}님의 승리</div>}
    </>
  )
};
export default TicTacToe;