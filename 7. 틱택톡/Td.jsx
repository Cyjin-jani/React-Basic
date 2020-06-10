const React = require('react');
const { useCallback } = React;
const { ClICK_CELL, CHANGE_TURN } = require('./TicTacToe'); 

const Td = ({ rowIndex, cellIndex, dispatch, cellData }) => {
    const onClickTd = useCallback(() => {
        console.log(rowIndex, cellIndex);
        dispatch({ type: ClICK_CELL, row: rowIndex, cell: cellIndex});
        dispatch({ type: CHANGE_TURN });
    }, []);

    return (
    <td onClick={onClickTd}>{cellData}</td>
    );
}

module.exports = Td;