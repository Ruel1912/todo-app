import { vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoInput from '../components/Todo/TodoInput';

test("adds a new todo", () => {
  const addTodoMock = vi.fn();
  render(<TodoInput addTodo={addTodoMock} />);

  const input = screen.getByPlaceholderText("Enter a new task");
  const button = screen.getByText("Add");

  fireEvent.change(input, { target: { value: "New Task" } });
  fireEvent.click(button);

  expect(addTodoMock).toHaveBeenCalledWith("New Task");
  expect(input).toHaveValue("");
});
