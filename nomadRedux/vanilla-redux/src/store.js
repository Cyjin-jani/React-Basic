import { createStore } from 'redux';
import { configureStore, createAction, createReducer, createSlice } from '@reduxjs/toolkit';

// const addToDo = createAction("ADD");
// const deleteToDo = createAction("DELETE");

// const reducer = createReducer([], {
//     //can mutate state
//     [addToDo]: (state, action) => {
//         state.push({ text: action.payload, id: Date.now() })
//     },
//     //can return new state
//     [deleteToDo]: (state, action) => state.filter(toDo => toDo.id !== action.payload)
// })

const toDos = createSlice({
    name: 'toDosReducer',
    initialState: [],
    reducers: {
        add: (state, action) => {
            state.push({ text: action.payload, id: Date.now() })
        },
        remove: (state, action) => state.filter(toDo => toDo.id !== action.payload)
    }
})

// const store = createStore(reducer);
// const store = configureStore({reducer: toDos.reducer});

// export const actionCreators = {
//     addToDo,
//     deleteToDo
// }
export const { add, remove } = toDos.actions;

// export default store;
export default configureStore({reducer: toDos.reducer});