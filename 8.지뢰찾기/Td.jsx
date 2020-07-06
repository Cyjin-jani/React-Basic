import React, { useContext, useCallback, memo, useMemo } from 'react';
import { TableContext, CODE, OPEN_CELL, FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL, CLICK_MINE } from './MineSearch';

const getTdStyle = (code) => {
    switch (code) {
        case CODE.NORMAL:
        case CODE.MINE:
            return {
                background: '#444',
            };
        case CODE.CLICKED_MINE:
        case CODE.OPENED:
            return {
                background: 'white',
            };
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
            return {
                background: 'yellow',
            };
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return {
                background: 'red',
            };
        default: 
            return {
                background: 'white',
            };        
    }
};

const getTdText = (code) => {
    console.log('get Td text');
    
    switch(code) {
        case CODE.NORMAL:
            return '';
        case CODE.MINE:
            return 'X';
        case CODE.CLICKED_MINE:
            return '펑';
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return '!';
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
            return '?';

        default:
            return code || '';
    }
}

const Td = memo(({ rowIndex, cellIndex }) => {
    const { tableData, dispatch, halted } = useContext(TableContext);

    const onClickTd = useCallback(() => {
        if (halted) {
            return;
        }
        switch (tableData[rowIndex][cellIndex]) {
            case CODE.OPENED:
            case CODE.FLAG_MINE:
            case CODE.FLAG:
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:
                return;
            case CODE.NORMAL:
                dispatch({ type: OPEN_CELL, row: rowIndex, cell: cellIndex });
                return;
            case CODE.MINE:
                dispatch({type: CLICK_MINE, row: rowIndex, cell: cellIndex});
                return;    

        }
    }, [tableData[rowIndex][cellIndex], halted]);

    const onRightClickTd = useCallback((e) => {
        e.preventDefault();
        if (halted) {
            return;
        }
        switch (tableData[rowIndex][cellIndex]) {
            case CODE.NORMAL:
            case CODE.MINE:
                dispatch({ type: FLAG_CELL, row: rowIndex, cell: cellIndex});
                return;
            case CODE.FLAG_MINE:
            case CODE.FLAG:
                dispatch({ type: QUESTION_CELL, row: rowIndex, cell: cellIndex});
                return;
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:
                dispatch({ type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex});    
                return;
            default:
                return;
        }
    }, [tableData[rowIndex][cellIndex], halted]);
    
    //useContext가 있어서 이 Td는 리렌더링이 한 번 일어나게 됨 (필연적)
    //다만 정말 아래 리턴 부분이 렌더링 되는지를 보기 위해 getTdText에 로그를 찍어본 결과, 무사히 한 칸만 렌더링이 된다
    //console.log('td Rendered');

    // return useMemo(() => (
    //     <td style={getTdStyle(tableData[rowIndex][cellIndex])} onClick={onClickTd}
    //     onContextMenu={onRightClickTd}
    //     >
    //         {getTdText(tableData[rowIndex][cellIndex])}</td>
    // ), [tableData[rowIndex][cellIndex]]);

    //위와 같이 useMemo를 쓰기 싫은 경우, 아래와 같이 컴포넌트를 두 개 만들어서 사용이 가능하다
    return <RealTd onClickTd={onClickTd} onRightClickTd={onRightClickTd} data={tableData[rowIndex][cellIndex]}/>;
});

const RealTd = memo(({onClickTd, onRightClickTd, data}) => {
    console.log('realTd Rendered');
    return (
        <td 
        style={getTdStyle(data)} 
        onClick={onClickTd}
        onContextMenu={onRightClickTd}
        >{getTdText(data)}</td>
    )
});

export default Td;