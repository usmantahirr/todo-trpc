import { fetchRequestHandler } from "@trpc/server/adapters/fetch"
import { NextRequest } from "next/server"

import { appRouter } from "@server/root"

export const dynamic = "force-dynamic"

const handler = (req: NextRequest) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => ({}),
  })
}

export { handler as GET, handler as POST }
