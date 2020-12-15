// import React, { useEffect, useRef, useState } from "react";
// import "./styles.css";

const useFullScreen = (onFullS) => {
  const element = useRef();

  const triggerFull = () => {
    if (element.current) {
      element.current.requestFullscreen();
      if (onFullS && typeof onFullS === "function") {
        onFullS(true);
      }
    }
  };
  const exitFull = () => {
    document.exitFullscreen();
    if (onFullS && typeof onFullS === "function") {
      onFullS(false);
    }
  };
  return { element, triggerFull, exitFull };
};

// const App = () => {
//   const onFullS = (isFull) => {
//     console.log(isFull ? "we r full" : "we r small");
//   };
//   const { element, triggerFull, exitFull } = useFullScreen(onFullS);
//   return (
//     <div className="App" style={{ height: "1000vh" }}>
//       <div ref={element}>
//         <img src="https://pbs.twimg.com/profile_images/915168817675931648/W9tXUyfM_400x400.jpg" />
//         <button onClick={exitFull}> exit Full screen</button>
//       </div>
//       <button onClick={triggerFull}> Mk Full screen</button>
//     </div>
//   );
// };

// export default App;
