const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Import routes (update paths if needed)
const userRoutes = require('./src/routes/userRoutes');
const corpusRoutes = require('./src/routes/corpusRoutes');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/corpus', corpusRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Stellar World API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});