export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export type TodoFilter = "all" | "active" | "completed";

const STORAGE_KEY = "todos:v1";

export function loadTodos(): Todo[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      return [];
    }

    const parsed: unknown = JSON.parse(data);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (item): item is Todo =>
        typeof item === "object" &&
        item !== null &&
        typeof item.id === "string" &&
        typeof item.text === "string" &&
        typeof item.completed === "boolean",
    );
  } catch {
    return [];
  }
}

export function saveTodos(todos: Todo[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch {
    // Ignore quota errors and private browsing restrictions.
  }
}

export function createTodo(text: string): Todo {
  return {
    id: crypto.randomUUID(),
    text: text.trim(),
    completed: false,
  };
}
