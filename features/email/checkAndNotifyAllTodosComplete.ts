import { TRPCError } from "@trpc/server"

import { getTodoModel } from "@server/db"

const TodoModel = getTodoModel()

export async function checkAndNotifyAllTodosComplete(
  sessionId: string,
): Promise<boolean> {
  try {
    const incompleteTodosCount = await TodoModel.countDocuments({
      sessionId,
      completed: false,
    })

    return incompleteTodosCount === 0
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to check todos completion status",
      cause: error,
    })
  }
}
