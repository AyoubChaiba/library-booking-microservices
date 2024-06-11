const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);

const { PORT } = process.env || 3001;

app.listen(PORT, () => {
    connectDB();
    console.log(`Customer Service is running on port ${PORT}`);
});
