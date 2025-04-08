import mongoose, { Schema, Document, Model, model } from "mongoose"

export interface TodoDocument extends Document {
  _id: string
  text: string
  completed: boolean
  createdAt: Date
  sessionId: string
}

export type TodoModelType = Model<TodoDocument>

const TodoSchema = new Schema<TodoDocument, TodoModelType>({
  text: { type: String, required: true },
  completed: { type: Boolean, required: true, default: false },
  sessionId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

export const getTodoModel = () =>
  (mongoose.models.Todo as TodoModelType) ||
  model<TodoDocument, TodoModelType>("Todo", TodoSchema)
