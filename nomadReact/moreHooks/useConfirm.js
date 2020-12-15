// import React, { useEffect, useRef, useState } from "react";
// import "./styles.css";
const useConfirm = (message = "", callback, rejection) => {
  if (!callback || typeof callback !== "function") {
    return;
  }
  if (rejection && typeof rejection !== "function") {
      return;
  }
  const confirmAction = () => {
    if (confirm(message)) {
      callback();
    }else {
        rejection();
    }
  };
  return confirmAction;
};

// const App = () => {
//   const deleteWorld = () => console.log("deleting world");
//   const confirmDelete = useConfirm("are u sure?", deleteWorld);
//   return (
//     <div className="App">
//       <button onClick={confirmDelete}>Delete the world</button>
//     </div>
//   );
// };

// export default App;
