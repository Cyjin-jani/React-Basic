import React , { useCallback, useEffect, useRef, memo } from 'react';
import { CLICK_CELL } from './TicTacToe';

const Td = memo(({ rowIndex, cellIndex, dispatch, cellData }) => {
    console.log('td rendered');

    const ref = useRef([]);
    useEffect(() => {
        console.log(rowIndex === ref.current[0], cellIndex === ref.current[1], dispatch === ref.current[2], cellData === ref.current[3]); //true true true false가 나옴... cellData가 바뀐것
        //바뀌지 않는 경우가 가끔 있어서 그것을 확인하는 작업임
        ref.current = [rowIndex, cellIndex, dispatch, cellData];
    }, [rowIndex, cellIndex, dispatch, cellData]);

    const onClickTd = useCallback( () => {
        console.log(rowIndex, cellIndex);

        if (cellData) {
            return;
        }
        //redux는 동기적으로 바뀌지만, reducer에서 디스패치는 비동기로 바뀐다
        //비동기로 뭔가 처리할 때에는 useEffect를 사용한다
        dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
        
    }, [cellData]);

    return (
    <td onClick={onClickTd}>{cellData}</td>
    );
});

export default Td;
