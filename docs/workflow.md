Task 2 — Feature via modes (Plan → Agent)
Add to existing todo list - functionality of multi-lists
Acceptance criteria
Two lists with proper todos 
Colors — green list section + rows; blue todo section + rows
No historical data — new todo-lists:v2 key only; drop todos:v1 on load
Lists on top — lists block rendered above todos block in component JSX

Promt:
Please add to existing todo list functionality to create saparete todo list with possibility to name it and in front of each name of todo list should be reflected number of todo which it contains.
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
Change in file lib/todos.ts: New types, createDefaultState(), loadState() / saveState(), remove old key, helpers
Change in file components/todo-list.tsx: Two-section UI, list selection, green/blue styling, create-list form
Mode 2 — Agent
Execute promt

Verification
Clear site data or load app fresh → see (5) working days and (2) weekend days
Click each list → correct todos shown below
Create a third list → count prefix updates
npm run build passes