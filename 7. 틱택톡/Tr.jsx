import React, { useRef, useEffect, memo, useMemo } from 'react';
import Td from './Td';

 const Tr = memo(({ rowData, rowIndex, dispatch }) => {
    console.log('tr rendered');

    const ref = useRef([]);
    useEffect(() => {
        console.log(rowData === ref.current[0], rowIndex === ref.current[1], dispatch === ref.current[2]); //true true true false가 나옴... cellData가 바뀐것
        //바뀌지 않는 경우가 가끔 있어서 그것을 확인하는 작업임
        ref.current = [rowData, rowIndex, dispatch];
    }, [rowData, rowIndex, dispatch]);

    return (
    <tr>
    {Array(rowData.length).fill().map((td, i) => (
    useMemo( //컴포넌트 자체를 이렇게 유즈메모로 기억할 수 있다
    () => <Td key={i} dispatch={dispatch} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]}>{''}</Td>, [rowData[i]],
    )
    ))}
    </tr>
    );
});

 export default Tr;
