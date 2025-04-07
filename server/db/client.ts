import mongoose from "mongoose"

const uri: string = process.env.MONGODB_URI as string
if (!uri) throw new Error("Missing MONGODB_URI")

let mongooseClientPromise: Promise<typeof mongoose> | null = null

export async function connectDB(): Promise<typeof mongoose> {
  if (mongoose.connection.readyState >= 1) {
    return mongoose
  }

  if (!mongooseClientPromise) {
    mongooseClientPromise = mongoose.connect(uri)
  }

  await mongooseClientPromise
  return mongoose
}
