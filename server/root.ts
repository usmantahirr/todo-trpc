import { todoRouter } from "@features/todo/api/router"

import { router } from "./trpc"

export const appRouter = router({
  todo: todoRouter,
})

export type AppRouter = typeof appRouter
