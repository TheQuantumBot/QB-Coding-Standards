// Importing necessary functions from the authentication service
const { getUser, getUserStateless } = require('../service/auth');

// Middleware to check if a user is authenticated
const checkForAuthentication = async (req, res, next) => {
    const authorizationHeaderValue = req.cookies?.token; // Retrieve the token from cookies
    req.user = null; // Initialize req.user as null

    // If no token is found, proceed to the next middleware
    if (!authorizationHeaderValue) return next();

    try {
        // Try to retrieve the user based on the stateless token
        const user = await getUserStateless(authorizationHeaderValue);
        if (user) {
            req.user = user; // If a user is found, attach it to the request object
        }
    } catch (error) {
        // Log any errors encountered during user retrieval
        console.error('Error retrieving user:', error);
    }

    // Proceed to the next middleware
    return next();
};

// Middleware to restrict access based on user roles
function restrictTo(roles = []) {
    return function(req, res, next) {
        // If no user is attached to the request, redirect to the login page
        if (!req.user) return res.redirect('/login');

        // If the user's role is not in the allowed roles, return an unauthorized response
        if (!roles.includes(req.user.role)) return res.json('Unauthorized');

        // Proceed to the next middleware if the user is authorized
        return next();
    };
}

// Middleware to restrict access to logged-in users only
async function restrictToLoggedInUserOnly(req, res, next) {
    const userId = req.cookies.token; // Retrieve the token from cookies
    if (!userId) return res.redirect('/login'); // If no token is found, redirect to login

    // Try to retrieve the user based on the stateless token
    const user = await getUserStateless(userId);
    if (!user) return res.redirect('/login'); // If no user is found, redirect to login
    
    req.user = user; // Attach the user to the request object
    next(); // Proceed to the next middleware
}

// Middleware to check if a user is authenticated and attach the user to the request
async function checkAuth(req, res, next) {
    const userId = req.cookies.token; // Retrieve the token from cookies

    // Try to retrieve the user based on the stateless token
    const user = await getUserStateless(userId);
 
    req.user = user; // Attach the user to the request object
    next(); // Proceed to the next middleware
}

// Exporting the middleware functions to be used in routes
module.exports = {
    restrictToLoggedInUserOnly,
    checkAuth,
    checkForAuthentication,
    restrictTo,
};
