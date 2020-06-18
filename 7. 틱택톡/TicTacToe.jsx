 import React, { useEffect, useReducer, useCallback } from 'react';
 import Table from './Table';

const initialState = {
    winner: '',
    turn: 'o',
    tableData: [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ],
    recentCell: [-1,-1], //최근 눌렀던 셀을 기억
};

export const SET_WINNER = 'SET_WINNER'; //상수로 빼두는 것이 좋음, 액션의 이름은 대문자로 하는 것이 보통 규칙
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';


const reducer = (state, action) => {
    //이 안에서 state를 어떻게 바꿀지 적어주는 것.
    //state를 바꿀 때는 불변성이 중요함
    //state가 너무 많아서 setState를 일일히 하기 어려운 경우는 이처럼 reducer를 고려해 보는 것이 좋음!
    switch (action.type) {
        case SET_WINNER : 
            // state.winner = action.winner; 이렇게 하면 안됨
            return {
                ...state, //기존 객체를 새롭게 복사하는 스펠드? 문법이라고 함 (얕은 복사)
                winner: action.winner, //바뀔 부분만 새롭게 바꿔주는 것
            };
        case CLICK_CELL: {
            const tableData = [...state.tableData]; //객체 얕은 복사
            //console.log(tableData);
            tableData[action.row] = [...tableData[action.row]]; //immer라는 라이브러리로 가독성 해결
            tableData[action.row][action.cell] = state.turn; //지금 현재 state를 넣어준다고 보면 됨
            return {
                ...state,
                tableData,
                recentCell: [action.row, action.cell],
            }; 
        }
        case CHANGE_TURN: {
            return {
                ...state,
                turn: state.turn === 'o' ? 'x' : 'o',
            };
        }
        case RESET_GAME: { //게임 초기화 (state 초기화)
          return {
              ...state,
              turn: 'o',
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
    };
};


const TicTacToe = () => {
    const [state, dispatch] = useReducer(reducer, initialState); //원래 인자가 3개까지 있지만 요 2개로 충분!
    const { tableData, turn, winner, recentCell } = state; 
    // const [winner, setWinner] = useState('');
    // const [turn, setTurn] = useState('o');
    // const [tableData, setTableData] = useState([['', '', ''], ['', '', ''], ['', '', '']]);
    
    const onClickTable = useCallback(() => {
        dispatch({ type: SET_WINNER, winner: 'o' }); //dispatch안에 들어가는 것이 액션객체이다. 이 객체안에 타입 등을 적어두면 된다. 
        //액션만 있다고 state가 바뀌는 것이 아니고, 실제로 액션을 하게끔 해주는 것이 바로 reducer이다
        //action을 dispatch할 때 마다 액션이 실행이 된다
    
    }, []);

    //여기서 검사를 해줌... 승리 판단
    useEffect(() => {
        const [row, cell] = recentCell;
        if (row < 0) {
            return;
        }
        let win = false;
        //가로줄 검사
        if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
            win = true;
        }
        //세로줄 검사
        if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
            win = true;
        }
        //대각선 검사1
        if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
            win = true;
        }
        //대각선 검사2
        if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
            win = true;
        }
        //console.log(win, row, cell);
        if (win) { //승리 시
            dispatch({ type: SET_WINNER, winner: turn }); //지금 턴인 사람이 승리자!
            dispatch({ type: RESET_GAME }); //게임 초기화
        } else {
            //무승부 검사
            let all = true;
            tableData.forEach((row) => { //3*3 칸이 전부 다 차있는 지를 검사한다
                row.forEach((cell) => {
                    if (!cell) {
                        all = false;
                    }
                });
            });
            if (all) { // 이 경우는 무승부
                dispatch({ type: RESET_GAME }); //게임 초기화
            } else { //무승부가 아니니 다음 턴으로
                dispatch({ type: CHANGE_TURN });
            }
        }
    }, [recentCell]);
    
    return (
    <>
        <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch}/>
        {winner && <div>{winner}님의 승리</div>}
    </>    
    );
};

export default TicTacToe;


