//const React = require('react');
//const Td = require('./Td');
// const Table = require('./Table');

// import React from 'react';
// import {Td} from './Td';
// import {Table} from './Table';

// const Tr = ({ rowData, rowIndex, dispatch }) => {
//     console.log("로우데이터");
//     console.log(rowData);
//     return (
//     <tr>
//     {Array(rowData.length).fill().map((td, i) => (<Td dispatch={dispatch} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]} > {''}</Td>))}
//     </tr>
//     );
// }

// // module.exports = Tr;
// export default Tr;



import React, { useRef, useEffect, memo, useMemo } from 'react';
import Td from './Td';

const Tr = memo(({ rowData, rowIndex, dispatch }) => {
  console.log('tr rendered');

  const ref = useRef([]);
  useEffect(() => {
    console.log(rowData === ref.current[0], dispatch === ref.current[1], rowIndex === ref.current[2]);
    ref.current = [rowData, dispatch, rowIndex];
  }, [rowData, dispatch, rowIndex]);

  return (
    <tr>
      {Array(rowData.length).fill().map((td, i) => (
        useMemo(
          () => <Td key={i} dispatch={dispatch} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]}>{''}</Td>,
          [rowData[i]],
        )
      ))}
    </tr>
  );
});

export default Tr;