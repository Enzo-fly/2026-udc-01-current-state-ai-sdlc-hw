import { TodoList } from "@/components/todo-list";

export default function Home() {
  return (
    <div className="flex flex-1 items-start justify-center bg-zinc-50 px-6 py-16 font-sans dark:bg-black">
      <main className="w-full max-w-3xl rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-10">
        <TodoList />
      </main>
    </div>
  );
}
