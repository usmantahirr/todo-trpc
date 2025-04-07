import { TRPCError } from "@trpc/server"
import { z } from "zod"

import { connectDB, TodoDocument, getTodoModel } from "@server/db"
import { publicProcedure, router } from "@server/trpc"

const TodoModel = getTodoModel()

export const todoRouter = router({
  list: publicProcedure
    .input(z.object({ sessionId: z.string() }))
    .query(async ({ input }): Promise<TodoDocument[]> => {
      try {
        await connectDB()
        return TodoModel.find({ sessionId: input.sessionId })
          .sort({
            createdAt: -1,
          })
          .exec()
      } catch (error) {
        console.error("Add todo failed:", error)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create todo",
          cause: error,
        })
      }
    }),

  add: publicProcedure
    .input(z.object({ text: z.string().min(1), sessionId: z.string() }))
    .mutation(async ({ input }): Promise<TodoDocument> => {
      try {
        await connectDB()
        return await TodoModel.create({
          text: input.text,
          completed: false,
          sessionId: input.sessionId,
          createdAt: new Date(),
        })
      } catch (error) {
        console.error("Add todo failed:", error)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to add todo",
          cause: error,
        })
      }
    }),

  toggle: publicProcedure
    .input(z.object({ id: z.string(), sessionId: z.string() }))
    .mutation(async ({ input }): Promise<TodoDocument> => {
      try {
        await connectDB()
        const todo = await TodoModel.findOne({
          _id: input.id,
          sessionId: input.sessionId,
        }).exec()

        if (!todo) throw new Error("Todo not found")

        todo.completed = !todo.completed
        await todo.save()
        return todo
      } catch (error) {
        console.error("Add todo failed:", error)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to toggle todo",
          cause: error,
        })
      }
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string(), sessionId: z.string() }))
    .mutation(async ({ input }): Promise<{ id: string }> => {
      try {
        await connectDB()
        const todo = await TodoModel.findOneAndDelete({
          _id: input.id,
          sessionId: input.sessionId,
        }).exec()

        if (!todo) throw new Error("Todo not found")

        return { id: input.id }
      } catch (error) {
        console.error("Add todo failed:", error)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete todo",
          cause: error,
        })
      }
    }),
})
