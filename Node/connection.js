// Import the mongoose library for MongoDB interaction
const mongoose = require('mongoose');

// Function to connect to the MongoDB database
const connectMongoDb = async () => {
    // Attempt to connect to the MongoDB database
    await mongoose.connect('mongodb://127.0.0.1:27017/user')
        .then(() => console.log('MongoDb Connected :)')) // Log a success message if connection is successful
        .catch((err) => console.log(err)); // Log an error message if connection fails
};

// Export the connectMongoDb function for use in other parts of the application
module.exports = connectMongoDb;
