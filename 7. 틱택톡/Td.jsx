import React , { useCallback } from 'react';
import { CLICK_CELL } from './TicTacToe';

const Td = ({ rowIndex, cellIndex, dispatch, cellData }) => {
    console.log('td rendered');

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
}

export default Td;
