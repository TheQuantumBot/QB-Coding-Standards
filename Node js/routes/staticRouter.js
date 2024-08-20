// Import necessary modules and middleware
const express = require('express');
const { URL } = require('../models/url');
const { User } = require('../models/user');
const { restrictTo } = require('../middlewares/auth'); // Importing middleware for role-based access control

// Initialize a new router
const router = express.Router();

// Route to display the home page with all URLs created by the logged-in user
router.get('/', async (req, res) => {
    const userId = req?.user?._id; // Get the logged-in user's ID from the request
    const allURLS = await URL.find({ createdBy: userId }); // Fetch URLs created by the user
    return res.render('home', {
        urls: allURLS // Pass the URLs to the template for rendering
    });
});

// Route to display the signup page
router.get('/signup', async (req, res) => {
    const allUsers = await User.find({}); // Fetch all users (if needed for signup context)
    return res.render('signUp', {
        users: allUsers // Pass users to the template (optional, depending on your implementation)
    });
});

// Route to display the login page
router.get('/login', async (req, res) => {
    return res.render('login'); // Render the login page
});

// Route to display the file upload page
router.get('/fileUpload', async (req, res) => {
    return res.render('fileUpload'); // Render the file upload page
});

// Export the router to be used in the main app
module.exports = router;
