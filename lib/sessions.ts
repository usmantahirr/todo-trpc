export function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return ""

  let sessionId = localStorage.getItem("sessionId")
  if (!sessionId) {
    sessionId = crypto.randomUUID()
    localStorage.setItem("sessionId", sessionId)
  }
  return sessionId
}
