const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB (replace with your own MongoDB URI)
mongoose.connect('mongodb://localhost:27017/userdata', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log('MongoDB connection error:', err));

// Create a schema for the user data
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

// Route to handle user form data submission
app.post('/submit', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const newUser = new User({ name, email, message });

        await newUser.save();
        res.status(201).send('User data saved successfully');
    } catch (error) {
        res.status(400).send('Error saving user data: ' + error);
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
