import { FC } from 'react'
import { TODO_FILTERS } from '../../constants'

interface TodoFilterProps {
  filterChange: (filter: string) => void
  clearTodo: () => void
  selectedTodoFilter: string
  remain: number
}

const remmainFormat = (remain: number) => `${remain} ${remain <= 1 ? "item" : "items"} left`

const TodoFilter: FC<TodoFilterProps> = ({ filterChange, clearTodo, selectedTodoFilter, remain }) => {
  return (
    <div className='p-4 bg-white border border-slate-200 flex justify-between gap-2 items-center'>
      <span className='text-gray-400'>{remmainFormat(remain)}</span>
      <div className='flex gap-2'>
        {TODO_FILTERS.map((filter) => (<button
          key={filter}
          className={`btn text-gray-400 font-light bg-white shadow-none border-white rounded-none min-h-8 max-h-8 border hover:bg-white hover:border-gray-900
          ${filter === selectedTodoFilter ? 'border-gray-900 text-gray-900' : ''}`}
          onClick={() => filterChange(filter)}>{filter}</button>))}
      </div>
      <button className='text-gray-400  hover:text-gray-900' onClick={clearTodo}>Clear completed</button>
    </div>
  )
}

export default TodoFilter