import React, { useReducer, createContext, useMemo } from 'react';
import Table from './Table';
import Form from './Form';

export const CODE = { //코드 부여
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0, //0이상이면 다 opened가 되도록
};

export const TableContext = createContext({
    //일단 모양만 맞추기
    tableData: [],
    halted: true,
    dispatch: () => {},
}); //기본 값을 넣을 수 있다.

const initialState = {
    tableData: [],
    timer: 0,
    result: '',
    halted: true,
};

const plantMine = (row, cell, mine) => {
    console.log(row, cell, mine);
    const candidate = Array(row * cell).fill().map((arr, i) => {
        return i;
    });
    //셔플 정렬
    const shuffle = [];
    while (candidate.length > row * cell - mine) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen);
    }
    //테이블 데이터 만들기
    const data = [];
    for ( let i = 0; i < row; i++) {
        const rowData = [];
        data.push(rowData);
        for (let j = 0; j < cell; j++) {
            rowData.push(CODE.NORMAL);
        }
    }
    //지뢰 심기
    for (let k = 0; k < shuffle.length; k++) {
        const ver = Math.floor(shuffle[k] / cell);
        const hor = shuffle[k] % cell;
        data[ver][hor] = CODE.MINE;
    }
    console.log(data);
    return data;
};

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';

const reducer = (state, action) => {
    switch (action.type) {
        case START_GAME:
            return {
                ...state,
                tableData: plantMine(action.row, action.cell, action.mine),
                halted: false,
            };
        case OPEN_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            //tableData[action.row][action.cell] = CODE.OPENED;
            let around = [];
            //윗줄이 있는 지 체크, 있으면 윗줄의 세칸을 검사 대상에 넣어줌
            if (tableData[action.row - 1]) {
                around = around.concat(
                    tableData[action.row - 1][action.cell -1],  
                    tableData[action.row - 1][action.cell],  
                    tableData[action.row - 1][action.cell + 1],
                );
            }
            //내 왼쪽 칸, 오른쪽 칸을 검사 대상에 넣음
            around = around.concat(
                tableData[action.row][action.cell -1],  
                tableData[action.row][action.cell + 1],  
            )
            // 내 아래줄이 있는 지 체크, 있으면 아랫줄의 칸들을 검사대상에 넣어줌
            if (tableData[action.row + 1]) {
                around = around.concat(
                    tableData[action.row + 1][action.cell -1],  
                    tableData[action.row + 1][action.cell],  
                    tableData[action.row + 1][action.cell + 1],
                )
            }
            //주변에 지뢰가 있는 지 찾아서 그 갯수를 센다
            const count = around.filter((v) => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length;
            console.log(around, count);
            tableData[action.row][action.cell] = count;

            return {
                ...state,
                tableData, 
            };
        }
        case CLICK_MINE: {
            //불변성 지키기 위함(위도 동일)
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell] = CODE.CLICKED_MINE;
            return {
                ...state,
                tableData,
                halted: true,
            };    
        }
        case FLAG_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] === CODE.MINE) {
                tableData[action.row][action.cell] = CODE.FLAG_MINE;
            } else {
                tableData[action.row][action.cell] = CODE.FLAG;
            }
            return {
                ...state,
                tableData,
            };    
        }
        case QUESTION_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
                tableData[action.row][action.cell] = CODE.QUESTION_MINE;
            } else {
                tableData[action.row][action.cell] = CODE.QUESTION;
            }
            return {
                ...state,
                tableData,
            };    
        }
        case NORMALIZE_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
                tableData[action.row][action.cell] = CODE.MINE;
            } else {
                tableData[action.row][action.cell] = CODE.NORMAL;
            }
            return {
                ...state,
                tableData,
            };    
        }
        
        default:
            return state;
    }
}

const MineSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { tableData, halted, timer, result } = state;

    const value = useMemo(() => ({ tableData, halted, dispatch }), [tableData, halted]);
    //값을 기억해주지 않으면, 매번 해당 값(객체)이 새로 렌더링 시에 생겨나게 되므로 이렇게 메모를 써서 캐싱해두는 것이 필요
    //테이블 데이터가 변경되는 경우에만 값이 바뀌도록 한다 ==> 성능 최적화에 도움

    return (
    <TableContext.Provider value={value}>
        <Form />
        <div>{timer}</div>    
        <Table />
        <div>{result}</div>
    </TableContext.Provider>   
    );
};

export default MineSearch;