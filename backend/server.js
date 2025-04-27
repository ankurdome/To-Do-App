import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"

import userRouter from "./routes/userRoute.js"
import taskRouter from "./routes/taskRoute.js"
import forgotPasswordRouter from "./routes/forgotPassword.js"

// Get directory path in ES module context
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//app config
dotenv.config()
const app = express()
const port = process.env.PORT || 8001
mongoose.set('strictQuery', true);

//middlewares
app.use(express.json())
app.use(cors())

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection options
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // Timeout after 30 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    connectTimeoutMS: 30000, // Give up initial connection after 30 seconds
    keepAlive: true,
    retryWrites: true
};

// Connect to MongoDB
console.log("Connecting to MongoDB...");
mongoose.connect(process.env.MONGO_URI, mongoOptions)
    .then(() => {
        console.log("MongoDB Connected Successfully");
        // Only start the server after successful DB connection
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
            console.log(`MongoDB connection state: ${mongoose.connection.readyState}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB Connection Error:", err);
        process.exit(1); // Exit if unable to connect to database
    });

// Monitor MongoDB connection
mongoose.connection.on('error', err => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

mongoose.connection.on('reconnected', () => {
    console.log('MongoDB reconnected');
});

// Health check endpoint
app.get('/health', (req, res) => {
    const healthcheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now(),
        mongoState: mongoose.connection.readyState // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    };
    try {
        // Only return 200 if MongoDB is connected
        if (mongoose.connection.readyState === 1) {
            res.status(200).send(healthcheck);
        } else {
            healthcheck.message = 'Database not connected';
            res.status(503).send(healthcheck);
        }
    } catch (error) {
        healthcheck.message = error;
        res.status(503).send(healthcheck);
    }
});

//api endpoints
app.use("/api/user", userRouter)
app.use("/api/task", taskRouter)
app.use("/api/forgotPassword", forgotPasswordRouter)

// The "catchall" handler for any request that doesn't match the ones above
// This ensures React router can handle routes properly
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});