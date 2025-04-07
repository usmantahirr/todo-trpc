"use client"

import { format } from "date-fns"
import { CheckCircle2, ClipboardList, Copy, Fingerprint } from "lucide-react"
import { useState } from "react"

import { getOrCreateSessionId } from "@lib/sessions"

interface HeaderProps {
  completedCount: number
  totalCount: number
}

export default function Header({ completedCount, totalCount }: HeaderProps) {
  const [sessionId] = useState(getOrCreateSessionId())
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (!sessionId) return
    await navigator.clipboard.writeText(sessionId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Fingerprint className="h-5 w-5 text-primary" />
          <p className="text-sm font-semibold text-foreground">{sessionId}</p>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 rounded-md border border-primary px-2 py-1 text-xs font-medium text-primary transition hover:bg-muted"
          aria-label="Copy Session ID"
        >
          <Copy className="h-4 w-4" />
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-primary" />
          <p className="text-sm text-muted-foreground">
            {format(new Date(), "EEEE, MMMM d")}
          </p>
        </div>

        {totalCount > 0 && (
          <div className="flex items-center gap-1.5 text-sm font-medium">
            <span
              className={`${completedCount === totalCount ? "text-green-500" : "text-muted-foreground"}`}
            >
              {completedCount}/{totalCount}
            </span>
            <CheckCircle2
              className={`h-4 w-4 ${completedCount === totalCount ? "text-green-500" : "text-muted-foreground"}`}
            />
          </div>
        )}
      </div>
    </>
  )
}
