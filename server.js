// server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import ruleRoutes from './routes/ruleRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 

// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to the Rule Engine API');
});

// Routes
app.use('/api/rules', ruleRoutes); 
// Connect to MongoDB
connectDB();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
