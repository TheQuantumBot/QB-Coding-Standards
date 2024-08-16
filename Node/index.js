// Import required modules
const express = require('express');
const connectMongoDb = require('./connection'); // Function to connect to MongoDB
const path = require('path');
const { checkAuth, checkForAuthentication } = require('./middlewares/auth'); // Import authentication middleware
const staticRoute = require('./routes/staticRouter'); // Static routes
const { URL } = require('./models/url'); // URL model
const cookieParser = require('cookie-parser'); // Middleware to parse cookies
const { swaggerDocs } = require('./utils/swagger'); // Function to set up Swagger documentation
const multer = require('multer'); // Multer for file uploads

// Set up Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './uploads/'); // Set the destination folder for uploads
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()} - ${file.originalname}`); // Set the filename to include a timestamp
    },
});
const upload = multer({ storage }); // Initialize Multer with the storage configuration

// Import routes
const userRoute = require('./routes/user'); // User-related routes

const app = express(); // Initialize the Express application

// Set up view engine
app.set('view engine', 'ejs'); // Set EJS as the view engine
app.set('views', path.resolve('./views')); // Set the views directory

// Middleware setup
app.use(cookieParser()); // Parse cookies from incoming requests
app.use(checkForAuthentication); // Check for user authentication

app.use(express.json({ extended: false })); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data

// Connect to MongoDB
connectMongoDb();

const port = 8000; // Define the port the server will listen on

// Route for file uploads using Multer
app.post('/fileUpload', upload.array('image', 12), async (req, res) => {
    console.log(req); // Log the request object
});



// Use routes with authentication checks
app.use('/', checkAuth, staticRoute); // Apply the static routes with auth check
app.use('/user', userRoute); // Apply the user-related routes



// Set up Swagger documentation
swaggerDocs(app, port);

// Start the server and listen on the defined port
app.listen(port, () => {
    console.log(`Server is running on ${port}`); // Log that the server is running
});
