// Import mongoose library for creating schemas and models to interact with MongoDB
const mongoose = require('mongoose');

// Define the schema for a blog, specifying the fields and their types
const blogSchema = new mongoose.Schema({
  title: String,  // Title of the blog
  author: String,  // Author of the blog
  url: String,  // URL of the blog
  likes: Number,  // Number of likes the blog has received
  user: {
    type: mongoose.Schema.Types.ObjectId,  // Reference to the user who created the blog (foreign key relationship)
    ref: 'User',  // Link to the 'User' model for population
  },
});

// Set the toJSON transformation for the schema
blogSchema.set('toJSON', {
  // This function transforms the returned object when a document is converted to JSON
  transform: (document, returnedObject) => {
    // Convert the _id field (which is an ObjectId in MongoDB) to a string and rename it as 'id'
    returnedObject.id = returnedObject._id.toString();
    // Remove the _id and __v fields from the returned object for cleaner output
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// Export the Blog model based on the blogSchema
module.exports = mongoose.model('Blog', blogSchema);
