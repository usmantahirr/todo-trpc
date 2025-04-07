"use client"

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"

import { trpc } from "@lib/trpcClient"

import type { Todo } from "@types"

interface TodoContextProps {
  todos: Todo[]
  addTodo: (text: string) => void
  toggleTodo: (id: string) => void
  deleteTodo: (id: string) => void
  // loading: boolean
}

const TodoContext = createContext<TodoContextProps | null>(null)

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([])
  // const [loading, setLoading] = useState(true)

  useEffect(() => {
    const { data } = trpc.todo.list.useQuery()
    setTodos(data || [])
  }, [])

  const addMutation = trpc.todo.add.useMutation({
    onSuccess(todo) {
      setTodos((prev) => [...prev, todo])
    },
  })

  const toggleMutation = trpc.todo.toggle.useMutation({
    onSuccess(_, id) {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo,
        ),
      )
    },
  })

  const deleteMutation = trpc.todo.delete.useMutation({
    onSuccess(_, id) {
      setTodos((prev) => prev.filter((todo) => todo.id !== id))
    },
  })

  const addTodo = (text: string) => {
    addMutation.mutate({ text })
  }

  const toggleTodo = (id: string) => {
    toggleMutation.mutate(id)
  }

  const deleteTodo = (id: string) => {
    deleteMutation.mutate(id)
  }

  return (
    <TodoContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  )
}

export const useTodoContext = () => {
  const ctx = useContext(TodoContext)
  if (!ctx) throw new Error("useTodoContext must be used within TodoProvider")
  return ctx
}
