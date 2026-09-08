"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import {
  createList,
  createTodo,
  loadState,
  saveState,
  type AppState,
  type TodoFilter,
} from "@/lib/todos";

const FILTERS: { value: TodoFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
];

export const TodoList = () => {
  const [state, setState] = useState<AppState>({ lists: [], selectedListId: "" });
  const [hydrated, setHydrated] = useState(false);
  const [listDraft, setListDraft] = useState("");
  const [todoDraft, setTodoDraft] = useState("");
  const [filter, setFilter] = useState<TodoFilter>("all");

  useEffect(() => {
    setState(loadState());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      saveState(state);
    }
  }, [state, hydrated]);

  const selectedList = state.lists.find((l) => l.id === state.selectedListId) ?? null;

  const handleCreateList = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = listDraft.trim();
    if (!name) return;
    const newList = createList(name);
    setState((curr) => ({
      lists: [...curr.lists, newList],
      selectedListId: newList.id,
    }));
    setListDraft("");
  }, [listDraft]);

  const handleSelectList = useCallback((id: string) => {
    setState((curr) => ({ ...curr, selectedListId: id }));
    setFilter("all");
  }, []);

  const handleAddTodo = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = todoDraft.trim();
    if (!text || !selectedList) return;
    const todo = createTodo(text);
    setState((curr) => ({
      ...curr,
      lists: curr.lists.map((l) =>
        l.id === curr.selectedListId
          ? { ...l, todos: [...l.todos, todo] }
          : l,
      ),
    }));
    setTodoDraft("");
  }, [todoDraft, selectedList]);

  const toggleTodo = useCallback((todoId: string) => {
    setState((curr) => ({
      ...curr,
      lists: curr.lists.map((l) =>
        l.id === curr.selectedListId
          ? {
              ...l,
              todos: l.todos.map((t) =>
                t.id === todoId ? { ...t, completed: !t.completed } : t,
              ),
            }
          : l,
      ),
    }));
  }, []);

  const deleteTodo = useCallback((todoId: string) => {
    setState((curr) => ({
      ...curr,
      lists: curr.lists.map((l) =>
        l.id === curr.selectedListId
          ? { ...l, todos: l.todos.filter((t) => t.id !== todoId) }
          : l,
      ),
    }));
  }, []);

  const clearCompleted = useCallback(() => {
    setState((curr) => ({
      ...curr,
      lists: curr.lists.map((l) =>
        l.id === curr.selectedListId
          ? { ...l, todos: l.todos.filter((t) => !t.completed) }
          : l,
      ),
    }));
  }, []);

  const visibleTodos = (selectedList?.todos ?? []).filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const activeCount = (selectedList?.todos ?? []).filter((t) => !t.completed).length;
  const completedCount = (selectedList?.todos ?? []).length - activeCount;

  return (
    <div className="w-full max-w-xl space-y-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
          Todo lists
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Manage named lists and their todos. Saved in this browser.
        </p>
      </header>

      {/* ── Lists block (green) ──────────────────────────────────────── */}
      <section className="rounded-xl border border-green-300 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/30">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-green-800 dark:text-green-400">
          Lists
        </h2>

        {!hydrated ? (
          <p className="text-sm text-green-700 dark:text-green-500">Loading…</p>
        ) : (
          <ul className="space-y-2">
            {state.lists.map((list) => {
              const isSelected = list.id === state.selectedListId;
              return (
                <li key={list.id}>
                  <button
                    type="button"
                    onClick={() => handleSelectList(list.id)}
                    className={`w-full rounded-lg border px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                      isSelected
                        ? "border-green-500 bg-green-200 text-green-900 dark:border-green-600 dark:bg-green-800/60 dark:text-green-100"
                        : "border-green-300 bg-white text-green-800 hover:bg-green-100 dark:border-green-700 dark:bg-green-950/20 dark:text-green-300 dark:hover:bg-green-900/40"
                    }`}
                  >
                    <span className="mr-2 font-mono text-green-600 dark:text-green-400">
                      ({list.todos.length})
                    </span>
                    {list.name}
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        <form onSubmit={handleCreateList} className="mt-3 flex gap-2">
          <input
            type="text"
            value={listDraft}
            onChange={(e) => setListDraft(e.target.value)}
            placeholder="New list name…"
            aria-label="New list name"
            className="min-w-0 flex-1 rounded-lg border border-green-300 bg-white px-3 py-2 text-sm text-black outline-none placeholder:text-green-400 focus:border-green-500 dark:border-green-700 dark:bg-green-950/30 dark:text-green-50 dark:focus:border-green-500"
          />
          <button
            type="submit"
            disabled={!listDraft.trim()}
            className="rounded-lg border border-green-500 bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Create
          </button>
        </form>
      </section>

      {/* ── Todos block (blue) ───────────────────────────────────────── */}
      <section className="rounded-xl border border-blue-300 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/30">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-800 dark:text-blue-400">
          {selectedList ? `Todos — ${selectedList.name}` : "Todos"}
        </h2>

        {!selectedList ? (
          <p className="text-sm text-blue-600 dark:text-blue-400">
            Select or create a list above.
          </p>
        ) : (
          <>
            <form onSubmit={handleAddTodo} className="flex gap-2">
              <input
                type="text"
                value={todoDraft}
                onChange={(e) => setTodoDraft(e.target.value)}
                placeholder="What needs to be done?"
                aria-label="New todo"
                className="min-w-0 flex-1 rounded-lg border border-blue-300 bg-white px-3 py-2 text-sm text-black outline-none placeholder:text-blue-400 focus:border-blue-500 dark:border-blue-700 dark:bg-blue-950/30 dark:text-blue-50 dark:focus:border-blue-500"
              />
              <button
                type="submit"
                disabled={!todoDraft.trim()}
                className="rounded-lg border border-blue-500 bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Add
              </button>
            </form>

            <div className="mt-3 flex flex-wrap gap-2">
              {FILTERS.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setFilter(value)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    filter === value
                      ? "bg-blue-600 text-white"
                      : "border border-blue-300 text-blue-700 hover:bg-blue-100 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-900/40"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <p className="mt-2 text-xs text-blue-500 dark:text-blue-400">
              {activeCount} active · {completedCount} completed
            </p>

            <ul className="mt-3 space-y-2">
              {!hydrated ? (
                <li className="rounded-lg border border-dashed border-blue-200 px-4 py-6 text-center text-sm text-blue-400">
                  Loading…
                </li>
              ) : visibleTodos.length === 0 ? (
                <li className="rounded-lg border border-dashed border-blue-200 px-4 py-6 text-center text-sm text-blue-400 dark:border-blue-800">
                  {filter === "all" ? "No todos yet. Add one above." : `No ${filter} todos.`}
                </li>
              ) : (
                visibleTodos.map((todo) => (
                  <li
                    key={todo.id}
                    className="flex items-center gap-3 rounded-lg border border-blue-200 bg-white px-4 py-2.5 dark:border-blue-800 dark:bg-blue-950/20"
                  >
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                      aria-label={`Mark "${todo.text}" as ${todo.completed ? "incomplete" : "complete"}`}
                      className="size-4 shrink-0 accent-blue-600"
                    />
                    <span
                      className={`min-w-0 flex-1 break-words text-sm ${
                        todo.completed
                          ? "text-blue-300 line-through dark:text-blue-700"
                          : "text-blue-900 dark:text-blue-100"
                      }`}
                    >
                      {todo.text}
                    </span>
                    <button
                      type="button"
                      onClick={() => deleteTodo(todo.id)}
                      aria-label={`Delete "${todo.text}"`}
                      className="shrink-0 rounded px-2 py-0.5 text-xs text-blue-400 transition-colors hover:bg-blue-100 hover:text-red-600 dark:hover:bg-blue-900/40 dark:hover:text-red-400"
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
                className="mt-3 text-xs text-blue-400 transition-colors hover:text-blue-700 dark:hover:text-blue-300"
              >
                Clear completed
              </button>
            )}
          </>
        )}
      </section>
    </div>
  );
};
