"use client"

import { createContext, ReactNode, useContext, useMemo } from "react"

import { trpc } from "@lib/trpcClient"

import type { Todo } from "@types"

interface TodoContextProps {
  todos: Todo[]
  addTodo: (text: string) => void
  toggleTodo: (id: string) => void
  deleteTodo: (id: string) => void
}

const TodoContext = createContext<TodoContextProps | null>(null)

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const { data: todos = [] } = trpc.todo.list.useQuery()
  const utils = trpc.useUtils()

  const addMutation = trpc.todo.add.useMutation({
    onSuccess: () => utils.todo.list.invalidate(),
  })

  const toggleMutation = trpc.todo.toggle.useMutation({
    onSuccess: () => utils.todo.list.invalidate(),
  })

  const deleteMutation = trpc.todo.delete.useMutation({
    onSuccess: () => utils.todo.list.invalidate(),
  })

  const value = useMemo<TodoContextProps>(
    () => ({
      todos,
      addTodo: (text) => addMutation.mutate({ text }),
      toggleTodo: (id) => toggleMutation.mutate(id),
      deleteTodo: (id) => deleteMutation.mutate(id),
    }),
    [todos, addMutation, toggleMutation, deleteMutation],
  )

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}

export const useTodoContext = () => {
  const ctx = useContext(TodoContext)
  if (!ctx) throw new Error("useTodoContext must be used within TodoProvider")
  return ctx
}
