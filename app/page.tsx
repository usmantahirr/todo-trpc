import TodoApp from "@features/todo"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-muted/50 p-4 md:p-24">
      <div className="w-full max-w-md">
        <h1 className="mb-8 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-center text-3xl font-bold text-transparent">
          My Todo List
        </h1>
        <TodoApp />
      </div>
    </main>
  )
}
