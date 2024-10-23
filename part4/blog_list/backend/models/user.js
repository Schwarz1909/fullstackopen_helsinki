// Import mongoose library for creating schemas and models to interact with MongoDB
const mongoose = require('mongoose');

// Define the schema for a user, specifying the fields and their properties
const userSchema = new mongoose.Schema({
  username: {
    type: String,      // Type of the username field
    required: true,    // Ensure that the username is provided
    unique: true,      // Ensure that the username is unique across the collection
  },
  name: String,        // Name of the user
  passwordHash: String, // Hashed password for security purposes
  blogs: [             // Array of references to the blogs created by the user
    {
      type: mongoose.Schema.Types.ObjectId,  // Type of the blog field is an ObjectId
      ref: 'Blog',  // Link to the 'Blog' model for population
    },
  ],
});

// Set the toJSON transformation for the schema
userSchema.set('toJSON', {
  // This function transforms the returned object when a document is converted to JSON
  transform: (document, returnedObject) => {
    // Convert the _id field (which is an ObjectId in MongoDB) to a string and rename it as 'id'
    returnedObject.id = returnedObject._id.toString();
    // Remove the _id, __v (version key), and passwordHash fields from the returned object for security and cleaner output
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;  // Exclude the passwordHash for security
  },
});

// Create the User model based on the userSchema
const User = mongoose.model('User', userSchema);

// Export the User model for use in other parts of the application
module.exports = User;
