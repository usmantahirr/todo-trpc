"use client"

import { motion } from "framer-motion"
import { Trash2 } from "lucide-react"
import { useState } from "react"

import { cn } from "@lib/utils"

import { Button, Checkbox } from "@ui"

import { useTodoContext } from "@features/todo/context"

import type { Todo } from "@types"

interface TodoItemProps {
  todo: Todo
}

export default function TodoItem({ todo }: TodoItemProps) {
  const { toggleTodo, deleteTodo } = useTodoContext()
  const [isHovering, setIsHovering] = useState(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "flex items-center gap-3 rounded-lg p-4 transition-all",
        todo.completed ? "bg-muted/50" : "bg-background",
        "border shadow-sm hover:bg-accent/10",
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="flex-shrink-0">
        <Checkbox
          id={`todo-${todo._id}`}
          checked={todo.completed}
          onCheckedChange={() => toggleTodo(todo._id)}
          className="transition-all data-[state=checked]:border-green-500 data-[state=checked]:bg-green-500"
        />
      </div>
      <label
        htmlFor={`todo-${todo._id}`}
        className={cn(
          "flex-1 cursor-pointer text-sm transition-all duration-300 md:text-base",
          todo.completed && "text-muted-foreground line-through",
        )}
      >
        {todo.text}
      </label>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "h-8 w-8 text-muted-foreground transition-all hover:text-destructive",
          !isHovering && "opacity-0 md:opacity-0",
        )}
        onClick={() => deleteTodo(todo._id)}
        aria-label="Delete task"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </motion.div>
  )
}
