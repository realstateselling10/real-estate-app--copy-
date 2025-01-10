import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import connectDB from './src/config/db.js'

import adminRoutes from './src/routes/admin.route.js'
import userRoutes from './src/routes/user.route.js'
import propertyRoutes from './src/routes/property.route.js'

const app = express()
dotenv.config()

const Port = process.env.PORT || 5010
//middlewares
// Increase the limit for JSON payloads
app.use(express.json({ limit: '50mb' }))
// If you're also using URL-encoded payloads, increase that limit too
app.use(express.urlencoded({ limit: '50mb', extended: true }))

app.use(cookieParser())

app.use(
  cors({
    origin: 'https://client-final-ten.vercel.app',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
      'Origin'
    ]
  })
)

//Routes
app.use('/api/admin', adminRoutes)
app.use('/api/user', userRoutes)
app.use('/api/property', propertyRoutes)

// Connect to database and start server
const startServer = async () => {
  try {
    await connectDB()
    app.listen(Port, () => {
      console.log(`Server is running on ${Port}`)
    })
  } catch (error) {
    console.error(`Error starting server: ${error.message}`)
    process.exit(1)
  }
}

startServer()
