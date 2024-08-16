// Import the JSON Web Token (JWT) library
const jwt = require('jsonwebtoken');

// Secret key for signing JWT tokens
const secret = 'XYZ@123';

// Stateful session management using a Map
const sessionIdToUserMap = new Map(); // Map to store user sessions

// Function to store a user session (stateful)
function setUser(id, user) {
    sessionIdToUserMap.set(id, user); // Associate the session ID with the user object
}

// Function to retrieve a user session by ID (stateful)
function getUser(id) {
    return sessionIdToUserMap.get(id); // Retrieve the user associated with the session ID
}

// Stateless session management using JWT

// Function to generate a JWT token for a user (stateless)
function setUserStateless(user) {
    return jwt.sign({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role  
    }, secret); // Sign and return the token with the user's details
}

// Function to verify and decode a JWT token (stateless)
function getUserStateless(token) {
    if (!token) return null; // If no token is provided, return null

    try {
        return jwt.verify(token, secret); // Verify the token using the secret key
    } catch (error) {
        return null; // Return null if token verification fails
    }
}

// Export the functions for use in other parts of the application
module.exports = {
    setUser,
    getUser,
    setUserStateless,
    getUserStateless
};
