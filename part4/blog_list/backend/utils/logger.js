// Define a logging function for informational messages
const info = (...params) => {
  // Check if the current environment is not 'test'
  if (process.env.NODE_ENV !== 'test') {
    // Log the provided parameters to the console
    console.log(...params);
  }
};

// Define a logging function for error messages
const error = (...params) => {
  // Check if the current environment is not 'test'
  if (process.env.NODE_ENV !== 'test') {
    // Log the provided parameters as errors to the console
    console.error(...params);
  }
};

// Export the logging functions for use in other modules
module.exports = {
  info, 
  error,
};
