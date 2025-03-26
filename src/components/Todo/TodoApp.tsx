import { useState } from "react";
import { ITodo } from '../../types';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import TodoFilter from './TodoFilter';
import { TODO_FILTERS, TODO_FILTERS_LOCALSTORAGE_KEY, TODO_ITEMS_LOCALSTORAGE_KEY } from '../../constants';

const TodoApp: React.FC = () => {

  const storageTodo: ITodo[] = localStorage.getItem(TODO_ITEMS_LOCALSTORAGE_KEY)
    ? JSON.parse(localStorage.getItem(TODO_ITEMS_LOCALSTORAGE_KEY) as string)
    : []

  const storageFilter = localStorage.getItem(TODO_FILTERS_LOCALSTORAGE_KEY) || TODO_FILTERS[0]

  const [todos, setTodos] = useState<ITodo[]>(storageTodo);
  const [selectedTodoFilter, setSelectedTodoFilter] = useState(storageFilter);

  const updateTodos = (newTodos: ITodo[]) => {
    localStorage.setItem(TODO_ITEMS_LOCALSTORAGE_KEY, JSON.stringify(newTodos))
    setTodos(newTodos);
  }

  const addTodo = (text: string) => {
    const newTodo: ITodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    updateTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id: number) => {
    const editedTodos = todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo);
    updateTodos(editedTodos);
  };

  const deleteTodo = (id: number) => {
    const deletedTodos = todos.filter((todo) => todo.id !== id);
    updateTodos(deletedTodos);
  };

  const clearTodo = () => {
    updateTodos([]);
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
    localStorage.setItem(TODO_FILTERS_LOCALSTORAGE_KEY, filter)
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
