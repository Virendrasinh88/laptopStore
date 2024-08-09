require('dotenv').config();
const mongoose = require('mongoose');

// Use template literals to embed environment variables
const connectionStr = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PW}@cluster0.vcqyhqb.mongodb.net/laptop-store`;

// Connect to MongoDB
mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Connection error:', err));

// Handle connection errors
mongoose.connection.on('error', err => {
    console.error('Connection error:', err);
});
