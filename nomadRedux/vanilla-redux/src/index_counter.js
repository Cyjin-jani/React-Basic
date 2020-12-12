import { createStore } from 'redux';

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

number.innerText = 0;

const ADD = "ADD";
const MINUS = "MINUS";

const countModifier = (count = 0, action) => {
  
  switch (action.type) {
    case ADD:
      return count + 1;
    case MINUS:
      return count - 1;  
    default:
      return count
  }
  
  return count;
}

const countStore = createStore(countModifier);

const onChange = () => {
  // console.log('changed!');
  // console.log(countStore.getState());
  number.innerText = countStore.getState();
}
countStore.subscribe(onChange);

add.addEventListener("click", () => countStore.dispatch({type: ADD}))
minus.addEventListener("click", () => countStore.dispatch({type: MINUS}))


//anonymous function없이는 아래와 같이 할 수 있음

// const handleAdd = () => {
//   countStore.dispatch({type: "ADD"})
// }
// const handleMinus = () => {
//   countStore.dispatch({type: "MINUS"})
// }
// add.addEventListener("click", handleAdd)
// minus.addEventListener("click", handleMinus)



//**************************** */
// normal vanilla JS without redux
//**************************** */

// let count = 0;
// number.innerText = count;

// const updateText = () => {
//   number.innerText = count;
// }

// const handleAdd = () => {
//   count += 1;
//   updateText()

// }

// const handleMinus = () => {
//   count -= 1;
//   updateText()

// }

// add.addEventListener("click",handleAdd);
// minus.addEventListener("click", handleMinus);