import mongoose from 'mongoose'

const connectDB = async () => {
    try {
      
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // Timeout after 30s
      heartbeatFrequencyMS: 10000, // Check connection every 10s
      maxPoolSize: 20, // Maximum number of connections
      minPoolSize: 5, // Minimum number of connections
      socketTimeoutMS: 60000, // Close sockets after 60s
      family: 4, // Use IPv4
      maxIdleTimeMS: 30000, // Close idle connections after 30s
      connectTimeoutMS: 30000 // Timeout connecting to MongoDB
    })

    console.log(`MongoDB connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

export default connectDB
