Task 2 — Feature via modes (Plan → Agent)
Add to existing todo list - functionality of multi-lists
Acceptance criteria
Two lists with proper todos 
Colors — green list section + rows; blue todo section + rows
No historical data — new todo-lists:v2 key only; drop todos:v1 on load
Lists on top — lists block rendered above todos block in component JSX

Promt:
Please add to existing todo list functionality to create saparete todo lists with possibility to name it and in front of each name of todo list should be reflected number of todo which it contains.
block with named lists should be placed above block which reflect todos inside. 
Lists of dotos should be colored by green
Todos itself be colored by blue
Do not migrate existing data - delete it.
And create two list:
1 Name working days, in this list add names of working days
2. Name weekend days, in this list add names of weekend days
Acceptance critera:
1. Two lists with proper todos inside
2. Lists and todos colored properly
3. No historical data
4. Lists placed on top of todos
Mode 1 — Plan
Asked the agent to produce a plan before writing code. Agreed plan:

Refactor lib/todos.ts: introduce NamedTodoList and AppState (lists, selectedListId); replace flat Todo[] storage with key todo-lists:v1.
On every load, remove legacy todos:v1 without migration; if data is missing or invalid, seed defaults via createDefaultState().
Seed two lists: working days (Monday–Friday) and weekend days (Saturday, Sunday); select working days by default.
Add helpers: loadState(), saveState(), createTodo(), createList(name).
Refactor components/todo-list.tsx as a client component ("use client") with two sections: green Lists block on top, blue Todos block below.
Lists block: show each list as (N) name, click to select, form to create a new named list (non-empty trimmed name).
Todos block: scope add / toggle / delete / filter (All / Active / Completed) / clear completed to the selected list only.
Style lists with green Tailwind classes (bg-green-50, border-green-300, stronger green for selected row); style todo rows with blue classes (bg-blue-50, border-blue-300).
Keep functional setState updates and persist to localStorage after hydration (same pattern as the original single-list todo).
No routing or config changes (page.tsx, layout.tsx, next.config.ts untouched).
No new dependencies (guardrail in app/AGENTS.md).

Mode 2 — Agent
Execute promt

Verification
Clear site data or load app fresh → see (5) working days and (2) weekend days
Click each list → correct todos shown below
Create a third list → count prefix updates
npm run build passes