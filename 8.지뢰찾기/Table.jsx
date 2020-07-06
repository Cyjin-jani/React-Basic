import React, { useContext, memo } from 'react';
import Tr from './Tr'
import { TableContext } from './MineSearch';

const Table = memo(() => { //memo를 하면, 하위 컴포넌트들 (Tr, Td)도 메모가 적용되어있어야 함
    const { tableData } = useContext(TableContext);
    return (
        <table>
            {Array(tableData.length).fill().map((tr, i) => <Tr rowIndex={i} />)}
        </table>
    );
});

export default Table;