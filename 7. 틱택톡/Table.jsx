const React = require('react');
const Tr = require('./Tr');

const Table = ({ tableData, dispatch }) => {
    console.log("table"+tableData);
    return (
    <table>
        {Array(tableData.length).fill().map((tr, i) => (<Tr dispatch={dispatch} rowIndex={i} rowData={tableData[i]} />))}
    </table>
    );
}

module.exports = Table;