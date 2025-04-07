import { ConnectOptions } from "mongodb"
import mongoose from "mongoose"

const uri = process.env.MONGODB_URI
if (!uri) throw new Error("Missing MONGODB_URI")

declare global {
  // allow global caching in dev with type safety
  // eslint-disable-next-line no-var
  var _mongooseClient: Promise<typeof mongoose> | undefined
}

let mongooseClient: Promise<typeof mongoose>

const clientOptions: ConnectOptions = {}

if (process.env.NODE_ENV === "development") {
  if (!global._mongooseClient) {
    global._mongooseClient = mongoose.connect(uri, clientOptions)
  }
  mongooseClient = global._mongooseClient
} else {
  mongooseClient = mongoose.connect(uri)
}

export async function connectDB(): Promise<typeof mongoose> {
  if (mongoose.connection.readyState >= 1) {
    return mongoose
  }
  if (!global._mongooseClient) {
    console.log("🔌 Connecting to MongoDB...")
  }
  await mongooseClient
  return mongoose
}
