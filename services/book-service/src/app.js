const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const bookRoutes = require('./routes/bookRoutes');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/image', express.static('src/uploads/image'));

app.use('/api/books', bookRoutes);

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
    console.log(`Book Service is running on port ${PORT}`);
});
