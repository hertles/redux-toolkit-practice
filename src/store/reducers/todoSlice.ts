import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Todo} from "../../types";
import {fetchAllTodos} from "../thunks/todo";

interface todoState {
    todos: Todo[],
    pending: boolean,
    error: string
}

const initialState: todoState = {
    todos: [],
    pending: true,
    error: ''
}

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        toggleCompleted(state, action: PayloadAction<number>) {
            const foundTodo = state.todos.find(todo => todo.id === action.payload);
            if (foundTodo) {
                foundTodo.completed = !foundTodo.completed;
            }
        },
        addTodo: (state, action: PayloadAction<string>) => {
            state.todos.unshift({
                title: action.payload,
                id: state.todos.length + 1,
                userId: 1,
                completed: false
            })
        }
    },
    extraReducers: {
        [fetchAllTodos.fulfilled.type]: (state: todoState, action: PayloadAction<Todo[]>) => {
            state.pending = false
            state.error = ''
            state.todos = action.payload.reverse()
        },
        [fetchAllTodos.pending.type]: (state: todoState) => {
            state.pending = true
        },
        [fetchAllTodos.rejected.type]: (state: todoState, action: PayloadAction<string>) => {
            state.pending = false
            state.error = action.payload
        }
    }

})

export default todoSlice.reducer

export const {toggleCompleted,addTodo} = todoSlice.actions
