import React, {useCallback, useEffect, useState} from 'react';
import './App.scss'
import 'bootstrap/scss/bootstrap.scss'
import {useTypedDispatch, useTypedSelector} from "./store/hooks";
import {fetchAllTodos} from "./store/thunks/todo";
import TodoItem from "./components/TodoItem/TodoItem";
import {addTodo, toggleCompleted} from "./store/reducers/todoSlice";

function App() {
    const dispatch = useTypedDispatch()

    const {todos, pending, error} = useTypedSelector(state => state.todoReducer)
    useEffect(() => {
        dispatch(fetchAllTodos())
    }, [dispatch])

    const [todoTitle, setTodoTitle] = useState<string>("")

    const sendTodo = () => {
        if (todoTitle !== "") {
            dispatch(addTodo(todoTitle))
            setTodoTitle("")
        }
    }

    const todoClicked = useCallback((id: number) => {
        dispatch(toggleCompleted(id))
    }, [dispatch])

    if (pending) return <h1>Загрузка...</h1>
    else if (error !== "") return <h1>Ошибка: {error}</h1>

    return (
        <div className="App">
            <main className={"container"}>
                <form className="input-group input-group-lg mb-3 mt-3">
                    <input value={todoTitle}
                           onChange={(e) => setTodoTitle(e.target.value)}
                           type="text"
                           className="form-control"
                           placeholder="Новое задание"
                           aria-label="Новое задание"
                           aria-describedby="button-addon2"
                    />
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        id="button-addon2"
                        onClick={sendTodo}
                    >
                        Добавить
                    </button>
                </form>
                {todos && todos.map(todo => (
                    <TodoItem todo={todo}
                              onClick={() => todoClicked(todo.id)}
                              key={todo.id}
                    />
                ))}
            </main>
        </div>
    );
}

export default App;
