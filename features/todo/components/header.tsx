import { format } from "date-fns"
import { CheckCircle2, ClipboardList } from "lucide-react"

interface HeaderProps {
  completedCount: number
  totalCount: number
}

export default function Header({ completedCount, totalCount }: HeaderProps) {
  return (
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
  )
}
