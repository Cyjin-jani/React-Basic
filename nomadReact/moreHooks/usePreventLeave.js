// import React, { useEffect, useRef, useState } from "react";
// import "./styles.css";

const usePreventLeave = () => {
  const listener = (event) => {
    event.preventDefault();
    event.returnValue = "";
  };
  const enablePrevent = () => window.addEventListener("beforeunload", listener);
  const disablePrevent = () =>
    window.removeEventListener("beforeunload", listener);
  return { enablePrevent, disablePrevent };
};

// const App = () => {
//   const { enablePrevent, disablePrevent } = usePreventLeave();
//   return (
//     <div className="App">
//       <button onClick={enablePrevent}>Protect</button>
//       <button onClick={disablePrevent}>unProtect</button>
//     </div>
//   );
// };

// export default App;
