import mongoose, { Schema, Document, models } from "mongoose"

export interface ITodo extends Document {
  text: string
  completed: boolean
  createdAt: Date
  sessionId: string
}

const TodoSchema = new Schema<ITodo>(
  {
    text: { type: String, required: true },
    completed: { type: Boolean, default: false },
    sessionId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
)

export const Todo = models.Todo || mongoose.model<ITodo>("Todo", TodoSchema)
