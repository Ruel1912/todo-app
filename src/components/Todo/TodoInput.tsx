import React, { useState } from "react";

interface TodoInputProps {
  addTodo: (text: string) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ addTodo }) => {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim()) {
      addTodo(input.trim());
      setInput("");
    }
  };

  return (
    <div className='relative'>
      <input
        type="text"
        value={input}
        className='input input-bordered w-full rounded-none p-6'
        onChange={(e) => setInput(e.target.value)}
        placeholder="Whats need to be done?"
        autoFocus
      />
      {input && (
        <button className='animate-none absolute top-1/2 right-2 transform text-lg -translate-y-1/2 btn btn-action btn-ghost btn-sm btn-square flex justify-center items-center' onClick={handleAdd}>+</button>
      )}
    </div>
  );
};

export default TodoInput;
