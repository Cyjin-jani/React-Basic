// import React, { useEffect, useRef, useState } from "react";
// import "./styles.css";

const useNotification = (title, options) => {
  if (!("Notification" in window)) {
    return;
  }
  const fireNotif = () => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(title, options);
        } else {
          return;
        }
      });
    } else {
      new Notification(title, options);
    }
  };
  return fireNotif;
};

// const App = () => {
//   const triggerNotif = useNotification("can i steal your km?", {
//     body: "i love km dont you?"
//   });
//   return (
//     <div className="App" style={{ height: "1000vh" }}>
//       <button onClick={triggerNotif}>hello</button>
//     </div>
//   );
// };

// export default App;
