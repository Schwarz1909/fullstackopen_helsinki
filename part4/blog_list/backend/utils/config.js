// Load environment variables from a .env file into process.env
require('dotenv').config();

// Set the server port to the value from the environment variable PORT, or default to 3003 if not defined
const PORT = process.env.PORT || 3003;

// Set the MongoDB URI based on the current environment
const MONGODB_URI = process.env.NODE_ENV === 'test'  // Check if the environment is set to 'test'
  ? process.env.TEST_MONGODB_URI  // Use the test MongoDB URI if in test mode
  : process.env.MONGODB_URI;       // Otherwise, use the standard MongoDB URI

// Export the configuration as an object for use in other parts of the application
module.exports = {
  MONGODB_URI,
  PORT,
};
