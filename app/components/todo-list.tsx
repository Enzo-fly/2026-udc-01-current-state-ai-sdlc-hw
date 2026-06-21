"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  createTodo,
  loadTodos,
  saveTodos,
  type Todo,
  type TodoFilter,
} from "@/lib/todos";

const FILTERS: { value: TodoFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
];

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [draft, setDraft] = useState("");
  const [filter, setFilter] = useState<TodoFilter>("all");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setTodos(loadTodos());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      saveTodos(todos);
    }
  }, [todos, hydrated]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const text = draft.trim();
    if (!text) {
      return;
    }

    setTodos((current) => [...current, createTodo(text)]);
    setDraft("");
  }

  function toggleTodo(id: string) {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }

  function deleteTodo(id: string) {
    setTodos((current) => current.filter((todo) => todo.id !== id));
  }

  function clearCompleted() {
    setTodos((current) => current.filter((todo) => !todo.completed));
  }

  const visibleTodos = todos.filter((todo) => {
    if (filter === "active") {
      return !todo.completed;
    }
    if (filter === "completed") {
      return todo.completed;
    }
    return true;
  });

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.length - activeCount;

  return (
    <div className="w-full max-w-xl">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
          Todo list
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Add tasks, mark them done, and filter your list. Saved in this browser.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="What needs to be done?"
          aria-label="New todo"
          className="min-w-0 flex-1 rounded-lg border border-zinc-200 bg-white px-4 py-3 text-black outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-500"
        />
        <button
          type="submit"
          disabled={!draft.trim()}
          className="rounded-lg bg-foreground px-5 py-3 font-medium text-background transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40 dark:hover:bg-zinc-200 dark:hover:text-black"
        >
          Add
        </button>
      </form>

      <div className="mt-6 flex flex-wrap gap-2">
        {FILTERS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => setFilter(value)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              filter === value
                ? "bg-foreground text-background"
                : "border border-zinc-200 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-900"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-500">
        {activeCount} active · {completedCount} completed
      </p>

      <ul className="mt-4 space-y-2">
        {!hydrated ? (
          <li className="rounded-lg border border-dashed border-zinc-200 px-4 py-8 text-center text-zinc-500 dark:border-zinc-700 dark:text-zinc-500">
            Loading todos…
          </li>
        ) : visibleTodos.length === 0 ? (
          <li className="rounded-lg border border-dashed border-zinc-200 px-4 py-8 text-center text-zinc-500 dark:border-zinc-700 dark:text-zinc-500">
            {filter === "all"
              ? "No todos yet. Add one above."
              : `No ${filter} todos.`}
          </li>
        ) : (
          visibleTodos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                aria-label={`Mark "${todo.text}" as ${
                  todo.completed ? "incomplete" : "complete"
                }`}
                className="size-4 shrink-0 accent-foreground"
              />
              <span
                className={`min-w-0 flex-1 break-words ${
                  todo.completed
                    ? "text-zinc-400 line-through dark:text-zinc-600"
                    : "text-black dark:text-zinc-50"
                }`}
              >
                {todo.text}
              </span>
              <button
                type="button"
                onClick={() => deleteTodo(todo.id)}
                aria-label={`Delete "${todo.text}"`}
                className="shrink-0 rounded-md px-2 py-1 text-sm text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-red-600 dark:hover:bg-zinc-900 dark:hover:text-red-400"
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>

      {completedCount > 0 && (
        <button
          type="button"
          onClick={clearCompleted}
          className="mt-4 text-sm text-zinc-500 transition-colors hover:text-zinc-800 dark:hover:text-zinc-300"
        >
          Clear completed
        </button>
      )}
    </div>
  );
}
