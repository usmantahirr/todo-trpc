"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Plus } from "lucide-react"
import type React from "react"
import { useState } from "react"

import { Button, Input } from "@ui"

import { EmptyMessage, Header, TodoItem } from "./components"
import { useTodoContext } from "./context"
import { useFilteredTodos } from "./hooks"

export default function TodoContainer() {
  const [newTodo, setNewTodo] = useState("")
  const { todos, addTodo } = useTodoContext()
  const sortedTodos = useFilteredTodos()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodo.trim() === "") return

    addTodo(newTodo)
    setNewTodo("")
  }

  const completedCount = todos.filter((todo) => todo.completed).length
  const totalCount = todos.length

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 rounded-md border bg-card p-6 shadow-md"
    >
      <Header completedCount={completedCount} totalCount={totalCount} />

      <form onSubmit={handleSubmit} className="flex gap-2">
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
          <EmptyMessage />
        ) : (
          <motion.div layout className="space-y-2">
            {sortedTodos.map((todo) => (
              <TodoItem key={todo._id} todo={todo} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
