import type {Todo} from '../../types'
import style from './TodoItem.module.scss'
import classNames from "classnames";
import {memo, MouseEventHandler} from "react";

interface todoProps {
    todo: Todo,
    onClick: MouseEventHandler
}

const TodoItem = memo(({todo, onClick}: todoProps) => {
    return (
        <div className={classNames([style.todo, {[style.completed] : todo.completed}])}
             key={todo.id}
             onClick={onClick}
        >
            {todo.completed
                ? <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="currentColor"
                       className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                </svg>
                : <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                       className="bi bi-check-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                </svg>}
            <div>{todo.title}</div>
        </div>
    );
})

export default TodoItem
