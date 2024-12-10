import React from "react";
import { ITodo } from '../../types';

interface TodoListProps {
  todos: ITodo[];
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleTodo, deleteTodo }) => {
  return (
    <div className='border border-slate-200'>
      {todos.map((todo) => (
        <div key={todo.id} className='relative border-b border-slate-200'>
          <label htmlFor={`todo-${todo.id}`} className='p-4 bg-white flex items-center gap-4 relative cursor-pointer'>
            <input 
              id={`todo-${todo.id}`}
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="checkbox rounded-full"
            />
            <span className={`text-xl text-gray-900 font-light ${todo.completed ? "text-gray-300" : ""}`} style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
              {todo.text}
            </span>
          </label>
          {todo.completed && <button className='animate-none absolute top-1/2 right-2 transform text-md -translate-y-1/2 btn btn-action btn-ghost btn-xs font-normal' onClick={() => deleteTodo(todo.id)}>Delete</button>}
        </div>
      ))}
    </div>
  );
};

export default TodoList;
