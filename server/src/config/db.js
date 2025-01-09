import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // Enable mongoose debug mode in development
        mongoose.set('debug', process.env.NODE_ENV === 'development');
        
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000, // Timeout after 10s
            heartbeatFrequencyMS: 5000,     // Check connection every 5s
            maxPoolSize: 10,                // Maximum number of connections
            minPoolSize: 2,                 // Minimum number of connections
            socketTimeoutMS: 45000,         // Close sockets after 45s
            family: 4,                      // Use IPv4
            maxIdleTimeMS: 10000,           // Close idle connections after 10s
            connectTimeoutMS: 10000         // Timeout connecting to MongoDB
        });

        console.log(`MongoDB connected: ${conn.connection.host}`);
        
        // Monitor connection events
        mongoose.connection.on('connected', () => {
            console.log('Mongoose connected to MongoDB');
        });

        mongoose.connection.on('error', (err) => {
            console.error('Mongoose connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose disconnected from MongoDB');
        });

        // Handle process termination
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('MongoDB connection closed through app termination');
            process.exit(0);
        });

    } catch (err) {
        console.error("Database connection error:", err);
        process.exit(1);
    }
}

export default connectDB;