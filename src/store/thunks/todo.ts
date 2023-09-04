import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllTodos = createAsyncThunk('todos', async (_,thunkAPI) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
        return response.data
    } catch (e) {
        return thunkAPI.rejectWithValue(e)
    }
})
