// Import necessary modules
const { Express, Request, Response } = require('express');
const swaggerJsdoc = require('swagger-jsdoc'); // Swagger JSDoc for API documentation
const swaggerUi = require('swagger-ui-express'); // Swagger UI for rendering the API docs
const { version } = require('../package.json'); // Import version from package.json
const path = require('path'); // Path module for resolving file paths

// Swagger configuration options
const options = {
    definition: {
        openapi: '3.0.0', // Specifies the OpenAPI version
        info: {
            title: 'REST API', // Title for the API documentation
            version, // API version from package.json
        },
        components: {
            securitySchemas: {
                bearerAuth: {
                    type: 'http', // HTTP authentication scheme
                    schema: 'bearer', // Bearer authentication
                    bearerFormat: 'JWT', // Specify that the format is JWT
                },
            },
        },
        security: [
            {
                bearerAuth: [], // Apply bearerAuth globally to all endpoints
            },
        ],
    },
    apis: [
        path.join(__dirname, '../routes/*.js'), // Specify the paths to the route files for documentation
        path.join(__dirname, '../models/*.js'), // Specify the paths to the model files for documentation
    ],
};

// Generate the Swagger specification
const swaggerSpec = swaggerJsdoc(options);

// Function to set up Swagger documentation
function swaggerDocs(app, port) {
    // Serve the Swagger UI documentation at /docs
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Serve the raw Swagger JSON spec at /docs.json
    app.get('/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec); // Send the Swagger specification as JSON
    });

    console.log(`Swagger Docs available at http://localhost:${port}/docs`);
}

// Export the swaggerDocs function for use in the main application
module.exports = {
    swaggerDocs,
};
