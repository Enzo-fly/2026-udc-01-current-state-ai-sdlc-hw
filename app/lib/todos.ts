export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export type NamedTodoList = {
  id: string;
  name: string;
  todos: Todo[];
};

export type AppState = {
  lists: NamedTodoList[];
  selectedListId: string;
};

export type TodoFilter = "all" | "active" | "completed";

const STORAGE_KEY = "todo-lists:v1";
const LEGACY_KEY = "todos:v1";

export function createTodo(text: string): Todo {
  return {
    id: crypto.randomUUID(),
    text: text.trim(),
    completed: false,
  };
}

export function createList(name: string): NamedTodoList {
  return {
    id: crypto.randomUUID(),
    name: name.trim(),
    todos: [],
  };
}

function createDefaultState(): AppState {
  const workingDays = createList("working days");
  workingDays.todos = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ].map(createTodo);

  const weekendDays = createList("weekend days");
  weekendDays.todos = ["Saturday", "Sunday"].map(createTodo);

  return {
    lists: [workingDays, weekendDays],
    selectedListId: workingDays.id,
  };
}

function isValidState(value: unknown): value is AppState {
  if (typeof value !== "object" || value === null) return false;
  const obj = value as Record<string, unknown>;
  if (!Array.isArray(obj.lists)) return false;
  if (typeof obj.selectedListId !== "string") return false;
  return obj.lists.every(
    (item) =>
      typeof item === "object" &&
      item !== null &&
      typeof (item as Record<string, unknown>).id === "string" &&
      typeof (item as Record<string, unknown>).name === "string" &&
      Array.isArray((item as Record<string, unknown>).todos),
  );
}

export function loadState(): AppState {
  if (typeof window === "undefined") {
    return createDefaultState();
  }

  try {
    localStorage.removeItem(LEGACY_KEY);
  } catch {
    // ignore
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed: unknown = JSON.parse(raw);
      if (isValidState(parsed)) {
        return parsed;
      }
    }
  } catch {
    // fall through to defaults
  }

  return createDefaultState();
}

export function saveState(state: AppState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore quota errors and private browsing restrictions.
  }
}
