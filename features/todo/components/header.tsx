"use client"

import { format } from "date-fns"
import {
  CheckCircle2,
  ClipboardList,
  Copy,
  Fingerprint,
  Share2,
} from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

import { getOrCreateSessionId } from "@lib/sessions"

interface HeaderProps {
  completedCount: number
  totalCount: number
}

export default function Header({ completedCount, totalCount }: HeaderProps) {
  const searchParams = useSearchParams()
  const [sessionId, setSessionId] = useState<string>("")
  const [copied, setCopied] = useState(false)
  const [shared, setShared] = useState(false)

  useEffect(() => {
    const querySessionId = searchParams.get("sessionId")
    if (querySessionId) {
      localStorage.setItem("sessionId", querySessionId)
      setSessionId(querySessionId)
    } else {
      setSessionId(getOrCreateSessionId())
    }
  }, [searchParams])

  const handleCopy = async () => {
    if (!sessionId) return
    await navigator.clipboard.writeText(sessionId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = async () => {
    if (!sessionId) return
    const url = new URL(window.location.href)
    url.searchParams.set("sessionId", sessionId)
    await navigator.clipboard.writeText(url.toString())
    setShared(true)
    setTimeout(() => setShared(false), 2000)
  }

  if (!sessionId) return null

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Fingerprint className="h-5 w-5 text-primary" />
          <p className="text-sm font-semibold text-foreground">{sessionId}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleShare}
            className="flex items-center gap-1 rounded-md border border-primary px-2 py-1 text-xs font-medium text-primary transition hover:bg-muted"
            aria-label="Share Session"
          >
            <Share2 className="h-4 w-4" />
            {shared ? "Copied!" : "Share"}
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 rounded-md border border-primary px-2 py-1 text-xs font-medium text-primary transition hover:bg-muted"
            aria-label="Copy Session ID"
          >
            <Copy className="h-4 w-4" />
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
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
