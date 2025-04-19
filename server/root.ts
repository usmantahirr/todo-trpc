import { todoRouter } from "@features/todo/api/router"

import { emailRouter } from "@features/email/router"

import { router } from "./trpc"

export const appRouter = router({
  todo: todoRouter,
  email: emailRouter,
})

export type AppRouter = typeof appRouter
