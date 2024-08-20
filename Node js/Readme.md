
## Introduction

Project is a Node.js application that provides user registration and login functionality. The project is structured to follow best practices for organizing Node.js applications, making it easy to extend and maintain.

## Features

- User registration with email and password
- User login with JWT authentication
- Secure password storage using bcrypt
- Organized folder structure for scalability

## Folder Structure

The project is organized as follows:


### Explanation of Key Folders:

- **`controllers/`**: Houses the controllers that handle HTTP requests and send responses.
- **`middlewares/`**: Contains middleware functions such as authentication and error handling.
- **`models/`**: Defines the data models (e.g., User model) used in the application.
- **`routes/`**: Includes the API routes, grouping related endpoints together (e.g., user-related routes).
- **`service/`**: Contains the service layer, where business logic is implemented.
- **`uploads/`**: Directory for handling file uploads if required.
- **`utils/`**: Utility functions that can be used throughout the project.
- **`views/`**: This is where the view templates are stored, if you're rendering HTML directly from your Node.js application.
- **`connection/`**: Manages the database connection setup (e.g., connecting to MongoDB, MySQL).

## Installation

To install the project, follow these steps:

To install the node modules
- npm install

To start the Project
- npm start



