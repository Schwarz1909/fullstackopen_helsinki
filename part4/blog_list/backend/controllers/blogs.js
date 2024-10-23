// Import the express Router to create a modular, mountable route handler
const blogsRouter = require('express').Router();

// Import the jsonwebtoken library for token verification and authentication
const jwt = require('jsonwebtoken');

// Import the Blog and User models for interacting with MongoDB collections
const Blog = require('../models/blog');
const User = require('../models/user');

// Route to get all blogs, with the associated user data populated (only username, name, and id)
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 });
  response.json(blogs);  // Respond with the blogs in JSON format
});

// Route to get a specific blog by its ID
blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);  // Find the blog by ID
  if (blog) {
    response.json(blog);  // If the blog exists, respond with its data
  } else {
    response.status(404).end();  // If not found, respond with 404 status
  }
});

// Route to create a new blog
blogsRouter.post('/', async (request, response) => {
  const { body } = request;  // Destructure the request body

  const { user } = request;  // Get the user from the request (assumed to be set by middleware)

  if (!user) {
    // If the user is not authenticated (e.g., missing or invalid token), respond with 401 status
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  // Create a new Blog object with the data from the request body and the authenticated user's ID
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,  // Default likes to 0 if not provided
    user: user.id,  // Associate the blog with the user's ID
  });

  if (body.title === undefined || body.url === undefined) {
    // If required fields (title or url) are missing, respond with 400 status
    response.status(400).end();
  } else {
    const savedBlog = await blog.save();  // Save the new blog to the database
    user.blogs = user.blogs.concat(savedBlog._id);  // Add the blog's ID to the user's blogs array
    await user.save();  // Save the updated user information

    // Respond with the saved blog data and 201 status for successful creation
    response.status(201).json(savedBlog);
  }
});

// Route to delete a blog by its ID
blogsRouter.delete('/:id', async (request, response) => {
  const { user } = request;  // Get the user from the request (assumed to be set by middleware)

  if (!user) {
    // If the user is not authenticated (e.g., missing or invalid token), respond with 401 status
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const blog = await Blog.findById(request.params.id);  // Find the blog by its ID
  if (blog.user.toString() === request.user.id) {
    // If the blog belongs to the authenticated user, delete it
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();  // Respond with 204 status for successful deletion
  } else {
    // If the user is not authorized to delete the blog, respond with 401 status
    return response.status(401).json({ error: 'Unauthorized to delete the blog' });
  }
});

// Route to update a blog by its ID
blogsRouter.put('/:id', async (request, response) => {
  const { body } = request;  // Destructure the request body

  // Create an updated blog object with the new data
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,  // Default likes to 0 if not provided
  };

  // Find the blog by its ID and update it with the new data, returning the updated blog
  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
  response.json(blog);  // Respond with the updated blog
});

// Export the blogsRouter to be used in other parts of the application
module.exports = blogsRouter;
