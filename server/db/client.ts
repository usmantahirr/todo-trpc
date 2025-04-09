import { ConnectOptions } from "mongodb"
import mongoose from "mongoose"

const uri = process.env.MONGODB_URI

if (!uri) {
  console.error("Missing MONGODB_URI in environment variables. Exiting...")
  process.exit(1)
}

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
  try {
    if (mongoose.connection.readyState >= 1) {
      console.log("Already connected to MongoDB.")
      return mongoose
    }

    if (!global._mongooseClient) {
      console.log("Connecting to MongoDB...")
    }

    await mongooseClient

    console.log("Successfully connected to MongoDB.")
    return mongoose
  } catch (error) {
    console.error("MongoDB connection failed:", error)
    await mongoose.disconnect()
    console.log("Closed MongoDB connection due to failure.")
    process.exit(1)
  }
}
