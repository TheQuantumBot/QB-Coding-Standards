// Importing the mongoose library for MongoDB interaction
const mongoose = require('mongoose');

/**
 * @openapi
 * components:
 *  schemas:
 *      CreateUserInput:
 *          type: object
 *          required:
 *              - name
 *              - email
 *              - password
 *          properties:
 *              name:
 *                 type: string
 *                 default: 'Name'
 *              email:
 *                 type: string
 *                 default: 'abc@gmail.com'
 *              password:
 *                 type: string
 *                 default: 'Abc@123'
 *      CreateUserResponse:
 *          type: object
 *          properties:
 *              _id:
 *                 type: string
 *              name:
 *                 type: string
 *              email:
 *                 type: string
 */

// Defining the User schema using mongoose
const UserSchema = new mongoose.Schema({
    name: {
        type: String, // Name is a string
        required: true // Name is required
    },
    email: {
        type: String, // Email is a string
        required: true, // Email is required
        unique: true // Email must be unique
    },
    password: {
        type: String, // Password is a string
        required: true // Password is required
    },
    role: {
        type: String, // Role is a string
        required: true, // Role is required
        default: 'USER' // Default role is 'USER'
    }
}, { timestamps: true }); // Automatically add createdAt and updatedAt timestamps

// Creating the User model using the defined schema
const User = mongoose.model('user', UserSchema);

// Exporting the User model to be used in other parts of the application
module.exports = {
    User,
};
