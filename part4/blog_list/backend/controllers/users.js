// Import bcrypt library for hashing passwords
const bcrypt = require('bcrypt');

// Create a new express Router for handling user-related routes
const usersRouter = require('express').Router();

// Import the User model to interact with the user collection in MongoDB
const User = require('../models/user');

// Route to get all users, along with their associated blogs
// The blogs are populated with specific fields (url, title, author, id)
usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    url: 1, title: 1, author: 1, id: 1,
  });
  response.json(users);  // Respond with the list of users in JSON format
});

// Route to create a new user
usersRouter.post('/', async (request, response) => {
  // Destructure the username, name, and password from the request body
  const { username, name, password } = request.body;

  // If either the password or username is missing, respond with a 400 status and an error message
  if (password === undefined || username === undefined) {
    return response.status(400).json({ error: 'password and username must be given' });
  }

  // If the password or username is less than 3 characters long, respond with a 400 status and an error message
  if (password.length < 3 || username.length < 3) {
    return response.status(400).json({ error: 'password or username must be at least 3 characters long' });
  }

  // Define the number of salt rounds for bcrypt to use when hashing the password
  const saltRounds = 10;

  // Hash the password using bcrypt before storing it in the database
  const passwordHash = await bcrypt.hash(password, saltRounds);

  // Create a new user object with the username, name, and hashed password
  const user = new User({
    username,
    name,
    passwordHash,
  });

  // Save the new user to the database
  const savedUser = await user.save();

  // Respond with the newly created user and a 201 status to indicate successful creation
  response.status(201).json(savedUser);
});

// Export the usersRouter to be used in other parts of the application
module.exports = usersRouter;
