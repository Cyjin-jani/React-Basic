// //const React = require('react');
// //const Tr = require('./Tr');
// import React from 'react';
// import {Tr} from './Tr';

// const Table = ({ tableData, dispatch }) => {
//     console.log("table데이터");
//     console.log(tableData);
//     return (
//     <table>
//         <tbody>
//         {Array(tableData.length).fill().map((tr, i) => (<Tr dispatch={dispatch} rowIndex={i} rowData={tableData[i]} />))}
//         </tbody>
//     </table>
//     );
// }

// //module.exports = Table;
// export default Table;


import React, { useMemo } from 'react';
import Tr from './Tr';

const Table = ({ tableData, dispatch }) => {
  return (
    <table>
      {Array(tableData.length).fill().map((tr, i) => (
        useMemo(
          () => <Tr key={i} dispatch={dispatch} rowIndex={i} rowData={tableData[i]} />,
          [tableData[i]],
        )
      ))}
    </table>
  );
};

export default Table;