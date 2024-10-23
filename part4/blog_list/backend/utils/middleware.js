// Import required modules
const jwt = require('jsonwebtoken'); // For handling JSON Web Tokens
const logger = require('./logger');   // Custom logger for logging messages
const User = require('../models/user'); // User model for database operations

// Middleware function for logging incoming requests
const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method); // Log the HTTP method of the request
  logger.info('Path:  ', request.path);    // Log the path of the request
  logger.info('Body:  ', request.body);    // Log the body of the request
  logger.info('---');                       // Log a separator for clarity
  next();                                   // Pass control to the next middleware
};

// Middleware function for handling unknown endpoints
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' }); // Send a 404 response for unknown endpoints
};

// Middleware function for handling errors
const errorHandler = (error, request, response, next) => {
  logger.error(error.message); // Log the error message

  // Handle specific error types and send appropriate responses
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' }); // Handle malformatted ID
  } if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message }); // Handle validation errors
  } if (error.name === 'JsonWebTokenError') {
    return response.status(400).json({ error: error.message }); // Handle JSON Web Token errors
  } if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired', // Handle expired tokens
    });
  }

  next(error); // Pass the error to the next error handler
};

// Middleware function for extracting the token from the request
const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization'); // Get the 'authorization' header

  // Check if the authorization header is present and starts with 'Bearer '
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', ''); // Extract the token
    return next(); // Pass control to the next middleware
  }
  request.token = null; // If no token, set it to null
  return next(); // Pass control to the next middleware
};

// Middleware function for extracting the user from the token
const userExtractor = async (request, response, next) => {
  // If no token is present, set user to null
  if (!request.token) {
    request.user = null;
  } else {
    // Verify the token and decode it
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
      request.user = null; // If no user ID in the token, set user to null
    } else {
      // Find the user in the database using the decoded ID
      request.user = await User.findById(decodedToken.id);
    }
  }
  next(); // Pass control to the next middleware
};

// Export middleware functions for use in other modules
module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
