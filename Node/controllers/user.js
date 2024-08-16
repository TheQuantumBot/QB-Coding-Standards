// Importing necessary modules and functions
const { User } = require('../models/user'); // Importing the User model
const { v4: uuidv4 } = require('uuid'); // Importing uuid for generating unique identifiers
const { getUser, setUser, setUserStateless } = require('../service/auth'); // Importing authentication-related functions

// Controller function to handle user creation
const handleCreateUser = async (req, res) => {
    const body = req.body; // Extracting the request body

    // Check if required fields are present in the request body
    if (!body.name || !body.email || !body.password) {
        return res.status(400).json({ error: 'All fields are required :(' });
    }

    // Creating a new user using the User model
    const user = await User.create({
        name: body.name,
        email: body.email,
        password: body.password
    });

    // Responding with a success message and status code
    return res.status(201).json({ message: 'User Created Successfully' });
};

// Controller function to handle fetching all users
const handleUserGet = async (req, res) => {
    const allUsers = await User.find(); // Fetching all users from the database

    // Responding with the list of all users
    return res.json({ message: 'Success', data: allUsers });
};

// Controller function to handle fetching a user by ID
const handleUserGetById = async (req, res) => {
    const userId = req.params.id; // Extracting the user ID from the request parameters

    // Check if user ID is provided
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        const user = await User.findById(userId); // Fetching the user by ID

        // If user is not found, respond with a 404 error
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Responding with the user data if found
        return res.status(200).json(user);
    } catch (error) {
        // Handle any potential errors during database interaction
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller function to handle user login
const handleUserLogin = async (req, res) => {
    const { email, password } = req.body; // Extracting email and password from the request body

    // Finding a user with the provided email and password
    const user = await User.findOne({ email, password });
    if (!user) {
        return res.json({
            error: 'Invalid User or Password'
        });
    }

    // Stateless authentication: generating a token and setting it as a cookie
    const token = setUserStateless(user);
    await res.cookie('token', token);

    // Redirecting the user to the homepage after successful login
    return res.redirect('/');
};

// Exporting the controller functions to be used in routes
module.exports = {
    handleCreateUser,
    handleUserGet,
    handleUserLogin,
    handleUserGetById,
};
