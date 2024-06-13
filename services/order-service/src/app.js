const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const orderRoutes = require('./routes/orderRoutes');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
    console.log(`Order Service is running on port ${PORT}`);
});
