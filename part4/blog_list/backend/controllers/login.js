// Import jsonwebtoken library for generating and verifying JWT tokens
const jwt = require('jsonwebtoken');

// Import bcrypt library for hashing and comparing passwords
const bcrypt = require('bcrypt');

// Create a new express Router for handling login routes
const loginRouter = require('express').Router();

// Import the User model to interact with the user collection in MongoDB
const User = require('../models/user');

// Route for handling login requests (POST to '/')
loginRouter.post('/', async (request, response) => {
  // Extract username and password from the request body
  const { username, password } = request.body;

  // Find a user by the provided username
  const user = await User.findOne({ username });

  // Check if the user exists and if the provided password matches the stored password hash
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash);  // Compare the plain password with the stored hashed password

  // If the user doesn't exist or the password is incorrect, return a 401 error
  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password',  // Send an error message if authentication fails
    });
  }

  // Create a token payload with the user's username and ID
  const userForToken = {
    username: user.username,
    id: user._id,
  };

  // Generate a JWT token with the user info, signing it with a secret, and setting an expiration time of 1 hour
  const token = jwt.sign(
    userForToken,
    process.env.SECRET,  // Use a secret from environment variables to sign the token
    { expiresIn: 60 * 60 },  // Token expires in 1 hour (60 minutes * 60 seconds)
  );

  // Respond with a 200 status and send the token along with the username and name of the user
  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

// Export the loginRouter to be used in other parts of the application
module.exports = loginRouter;
