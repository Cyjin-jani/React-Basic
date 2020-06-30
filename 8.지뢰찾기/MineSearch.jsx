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
    dispatch: () => {},
}); //기본 값을 넣을 수 있다.

const initialState = {
    tableData: [],
    timer: 0,
    result: '',
};

export const START_GAME = 'START_GAME';

const reducer = (state, action) => {
    switch (action.type) {
        case START_GAME:
            return {
                ...state,
                tableData: plantMine(action.row, action.cell, action.mine)    
            }
        default:
            return state;
    }
}

const MineSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const value = useMemo(() => ({ tableData: state.tableData, dispatch }), [state.tableData]);
    //값을 기억해주지 않으면, 매번 해당 값(객체)이 새로 렌더링 시에 생겨나게 되므로 이렇게 메모를 써서 캐싱해두는 것이 필요
    //테이블 데이터가 변경되는 경우에만 값이 바뀌도록 한다 ==> 성능 최적화에 도움

    return (
    <TableContext.Provider value={value}>
        <Form />
        <div>{state.timer}</div>    
        <Table />
        <div>{state.result}</div>
    </TableContext.Provider>   
    );
};

export default MineSearch;