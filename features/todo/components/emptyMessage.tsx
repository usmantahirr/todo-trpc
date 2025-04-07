import { motion } from "framer-motion"
import { ClipboardList } from "lucide-react"
import type React from "react"

export default function EmptyMessage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center py-8 text-center"
    >
      <div className="mb-4 rounded-full bg-muted/50 p-4">
        <ClipboardList className="h-8 w-8 text-muted-foreground" />
      </div>
      <p className="font-medium text-muted-foreground">No tasks yet</p>
      <p className="text-sm text-muted-foreground">Add a task to get started</p>
    </motion.div>
  )
}
