import { z } from "zod"

import { publicProcedure, router } from "@server/trpc"

import { Todo } from "@types"

let todos: Todo[] = [] //TODO: In-memory store; replace with MongoDB later

export const todoRouter = router({
  list: publicProcedure.query(() => todos),
  add: publicProcedure
    .input(z.object({ text: z.string().min(1) }))
    .mutation(({ input }) => {
      const newTodo = {
        id: Date.now().toString(),
        text: input.text,
        completed: false,
        createdAt: new Date().toISOString(),
      }
      todos.push(newTodo)
      return newTodo
    }),
  toggle: publicProcedure.input(z.string()).mutation(({ input }) => {
    todos = todos.map((todo) =>
      todo.id === input ? { ...todo, completed: !todo.completed } : todo,
    )
  }),
  delete: publicProcedure.input(z.string()).mutation(({ input }) => {
    todos = todos.filter((todo) => todo.id !== input)
  }),
})
