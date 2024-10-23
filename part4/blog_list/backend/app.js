// Import the Express library to create the application
const express = require('express');

// Import configuration settings (e.g., database URI, port) from config file
const config = require('./utils/config');

// Import the express-async-errors library to handle async errors in routes
require('express-async-errors');

// Create an instance of the Express application
const app = express();

// Import the CORS middleware to allow cross-origin requests
const cors = require('cors');

// Import route controllers for blogs, users, and login functionalities
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

// Import custom middleware for logging, token extraction, and error handling
const middleware = require('./utils/middleware');

// Import the logger utility for logging important events (e.g., connections, errors)
const logger = require('./utils/logger');

// Import Mongoose to interact with MongoDB
const mongoose = require('mongoose');

// Set Mongoose to use a less strict query mode (optional configuration)
mongoose.set('strictQuery', false);

// Log an info message to indicate that the connection to MongoDB is starting
logger.info('connecting to', config.MONGODB_URI);

// Connect to MongoDB using the URI specified in the config
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    // Log a success message if the connection is successful
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    // Log an error message if the connection fails
    logger.error('error connecting to MongoDB:', error.message);
  });

// Use the CORS middleware to enable cross-origin requests
app.use(cors());

// Serve static files from the 'build' directory (for example, a front-end React app)
app.use(express.static('build'));

// Use the built-in middleware to parse incoming JSON requests
app.use(express.json());

// Use custom middleware to log incoming requests
app.use(middleware.requestLogger);

// Use custom middleware to extract tokens from requests (e.g., for authentication)
app.use(middleware.tokenExtractor);

// Use custom middleware to extract user information from tokens
app.use(middleware.userExtractor);

// Define the routes for the blogs, users, and login endpoints
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

// If the app is running in a test environment, add the testing router
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing');
  app.use('/api/testing', testingRouter);
}

// Handle requests to unknown endpoints with a custom middleware
app.use(middleware.unknownEndpoint);

// Handle errors that occur during request processing with a custom error handler
app.use(middleware.errorHandler);

// Export the app instance for use in other files (e.g., server.js)
module.exports = app;
