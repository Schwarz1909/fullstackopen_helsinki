// Import the application setup (e.g., an Express app) from the 'app' module
const app = require('./app');

// Import the custom logger utility for logging messages (e.g., Winston, Bunyan)
const logger = require('./utils/logger');

// Import configuration settings, including the port number, from the 'config' module
const config = require('./utils/config');

// Start the server and listen on the port specified in the config file
app.listen(config.PORT, () => {
  // Log a message to indicate that the server is successfully running on the specified port
  logger.info(`Server running on port ${config.PORT}`);
});
