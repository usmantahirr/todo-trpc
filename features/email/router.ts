import { TRPCError } from "@trpc/server"
import { z } from "zod"

import { sendAllTodosCompletedEmail } from "@lib/mailer"
import { publicProcedure, router } from "@server/trpc"

import { checkAndNotifyAllTodosComplete } from "./checkAndNotifyAllTodosComplete"

export const emailRouter = router({
  sendTodosCompletedEmail: publicProcedure
    .input(z.object({ sessionId: z.string() }))
    .mutation(async ({ input }) => {
      try {
        const shouldSendEmail = await checkAndNotifyAllTodosComplete(
          input.sessionId,
        )

        if (shouldSendEmail) {
          await sendAllTodosCompletedEmail()
          return { success: true, message: "Email sent successfully" }
        }

        return { success: false, message: "Not all todos are complete" }
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to send email",
          cause: error,
        })
      }
    }),
})
