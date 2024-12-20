import { useState } from "react";
import { ITodo } from '../../types';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import TodoFilter from './TodoFilter';
import { TODO_FILTERS } from '../../constants';

const TodoApp: React.FC = () => {

  const [todos, setTodos] = useState<ITodo[]>([]);
  const [selectedTodoFilter, setSelectedTodoFilter] = useState(TODO_FILTERS[0]);

  const addTodo = (text: string) => {
    const newTodo: ITodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearTodo = () => {
    setTodos([]);
  }

  const filterTodos = () => {
    switch (selectedTodoFilter) {
      case "Active":
        return todos.filter((todo) => !todo.completed);
      case "Completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  };

  const handleTodoFilterChange = (filter: string) => {
    setSelectedTodoFilter(filter);
  };

  const filteredTodos = filterTodos();

  const remain = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="app w-full max-w-2xl mx-auto">
      <h1 className='text-9xl text-center mb-4 font-light text-orange-200'>todos</h1>
      <TodoInput addTodo={addTodo} />
      {todos.length > 0 && (
        <>
          <TodoList todos={filteredTodos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
          <TodoFilter filterChange={handleTodoFilterChange} clearTodo={clearTodo} selectedTodoFilter={selectedTodoFilter} remain={remain} />
        </>
      )}
    </div>
  );
};

export default TodoApp;
