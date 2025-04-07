"use client"

import { format } from "date-fns"
import { AnimatePresence, motion } from "framer-motion"
import { CheckCircle2, ClipboardList, Plus } from "lucide-react"
import type React from "react"
import { useEffect, useState } from "react"

import { Button } from "@ui/button"
import { Input } from "@ui/input"

import type { Todo } from "@types"

import TodoItem from "./components/item"

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState("")

  // Load todos from localStorage on initial render
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos")
    if (storedTodos) {
      try {
        setTodos(JSON.parse(storedTodos))
      } catch (error) {
        console.error("Failed to parse todos from localStorage:", error)
        localStorage.removeItem("todos")
      }
    }
  }, [])

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodo.trim() === "") return

    const newTodoItem: Todo = {
      id: Date.now().toString(),
      text: newTodo.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    }

    setTodos((prevTodos) => [...prevTodos, newTodoItem])
    setNewTodo("")
  }

  const toggleTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
  }

  const sortedTodos = [...todos].sort((a, b) => {
    // Sort completed items to the bottom
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1
    }
    // Sort by creation date (newest first)
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  const completedCount = todos.filter((todo) => todo.completed).length
  const totalCount = todos.length

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 rounded-xl border bg-card p-6 shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-primary" />
          <p className="text-sm text-muted-foreground">
            {format(new Date(), "EEEE, MMMM d")}
          </p>
        </div>

        {totalCount > 0 && (
          <div className="flex items-center gap-1.5 text-sm font-medium">
            <span
              className={`${completedCount === totalCount ? "text-green-500" : "text-muted-foreground"}`}
            >
              {completedCount}/{totalCount}
            </span>
            <CheckCircle2
              className={`h-4 w-4 ${completedCount === totalCount ? "text-green-500" : "text-muted-foreground"}`}
            />
          </div>
        )}
      </div>

      <form onSubmit={addTodo} className="flex gap-2">
        <Input
          type="text"
          placeholder="Add a new task..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="flex-1 transition-all focus-visible:ring-primary"
        />
        <Button
          type="submit"
          size="icon"
          className="rounded-full transition-transform hover:scale-105 active:scale-95"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </form>

      <AnimatePresence mode="popLayout">
        {sortedTodos.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-8 text-center"
          >
            <div className="mb-4 rounded-full bg-muted/50 p-4">
              <ClipboardList className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="font-medium text-muted-foreground">No tasks yet</p>
            <p className="text-sm text-muted-foreground">
              Add a task to get started
            </p>
          </motion.div>
        ) : (
          <motion.div layout className="space-y-2">
            {sortedTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
