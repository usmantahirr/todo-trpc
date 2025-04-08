"use client"

import { createContext, ReactNode, useContext, useMemo } from "react"

import { getOrCreateSessionId } from "@lib/sessions"
import { trpc } from "@lib/trpcClient"
import { TodoDocument } from "@server/db"

interface TodoContextProps {
  todos: TodoDocument[]
  addTodo: (text: string) => void
  toggleTodo: (id: string) => void
  deleteTodo: (id: string) => void
}

const TodoContext = createContext<TodoContextProps | null>(null)

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const sessionId = getOrCreateSessionId()
  const { data: todos = [], error } = trpc.todo.list.useQuery(
    { sessionId },
    {
      select: (data) => data as TodoDocument[],
      retry: false,
    },
  )
  const utils = trpc.useUtils()

  const addMutation = trpc.todo.add.useMutation({
    onMutate: async ({ text }) => {
      await utils.todo.list.cancel()
      const previous = utils.todo.list.getData({ sessionId })

      const optimisticTodo = {
        _id: Date.now().toString(),
        text,
        sessionId,
        completed: false,
        createdAt: new Date(),
      }

      utils.todo.list.setData({ sessionId }, (old = []) => [
        optimisticTodo,
        ...old,
      ])
      return { previous }
    },

    onError: (_err, _input, context) => {
      if (context?.previous) {
        utils.todo.list.setData({ sessionId }, context.previous)
      }
      alert(_err.message ?? "Something went wrong")
    },

    onSettled: () => {
      utils.todo.list.invalidate({ sessionId })
    },
  })

  const toggleMutation = trpc.todo.toggle.useMutation({
    onMutate: async ({ id }) => {
      await utils.todo.list.cancel()
      const previous = utils.todo.list.getData({ sessionId })

      utils.todo.list.setData({ sessionId }, (old = []) =>
        (old as TodoDocument[]).map((todo) =>
          todo._id === id ? { ...todo, completed: !todo.completed } : todo,
        ),
      )
      return { previous }
    },
    onError: (_err, _input, context) => {
      if (context?.previous) {
        utils.todo.list.setData({ sessionId }, context.previous)
      }
      alert(_err.message ?? "Something went wrong")
    },
    onSettled: () => utils.todo.list.invalidate({ sessionId }),
  })

  const deleteMutation = trpc.todo.delete.useMutation({
    onMutate: async ({ id }) => {
      await utils.todo.list.cancel()
      const previous = utils.todo.list.getData({ sessionId })

      utils.todo.list.setData({ sessionId }, (old = []) =>
        (old as TodoDocument[]).filter((todo) => todo._id !== id),
      )
      return { previous }
    },
    onError: (_err, _input, context) => {
      if (context?.previous) {
        utils.todo.list.setData({ sessionId }, context.previous)
      }
      alert(_err.message ?? "Something went wrong")
    },
    onSettled: () => utils.todo.list.invalidate({ sessionId }),
  })

  const value = useMemo<TodoContextProps>(
    () => ({
      todos,
      addTodo: (text) => addMutation.mutate({ text, sessionId }),
      toggleTodo: (id) => toggleMutation.mutate({ id, sessionId }),
      deleteTodo: (id) => deleteMutation.mutate({ id, sessionId }),
    }),
    [todos, sessionId, addMutation, toggleMutation, deleteMutation],
  )
  if (error) {
    console.error("Failed to fetch todos:", error)
    // Optional: throw error to crash ErrorBoundary
  }
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}

export const useTodoContext = () => {
  const ctx = useContext(TodoContext)
  if (!ctx) throw new Error("useTodoContext must be used within TodoProvider")
  return ctx
}
