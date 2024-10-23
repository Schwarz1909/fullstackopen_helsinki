// Import the express Router to create a modular, mountable route handler for testing purposes
const testingRouter = require('express').Router();

// Import the Blog and User models to interact with the corresponding MongoDB collections
const Blog = require('../models/blog');
const User = require('../models/user');

// Route to reset the database by deleting all Blog and User documents
// This is useful for testing environments to start with a clean database
testingRouter.post('/reset', async (request, response) => {
  // Delete all documents from the Blog collection
  await Blog.deleteMany({});

  // Delete all documents from the User collection
  await User.deleteMany({});

  // Respond with a 204 No Content status to indicate the operation was successful
  response.status(204).end();
});

// Export the testingRouter to be used in other parts of the application
module.exports = testingRouter;
