import { useTodoContext } from "./context"

export const useFilteredTodos = () => {
  const { todos } = useTodoContext()
  return todos.sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })
}
