const Logger = require('../logging/logger');

// Middleware function to handle invalid JSON errors
function handleInvalidJson(err, req, res, next) {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      Logger.error(err);
      return res.status(400).send({ result: 400, message: 'Invalid JSON' });
    }
    next(err);
  }
  
  // Middleware function to handle unauthorized errors
  function handleUnauthorized(err, req, res, next) {
    if (err.status === 401) {
      Logger.error(err);
      return res.status(401).send({ result: 401, message: 'Unauthorized' });
    }
    next(err);
  }
  
  // Middleware function to handle not found errors
  function handleNotFound(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    Logger.error(err);
    res.status(err.status || 404).send({ result: 404, message: 'No endpoint found at this url' });
    next(err);
  }
  
  // Middleware function to handle all other errors
  function handleAllOtherErrors(err, req, res, next) {
    Logger.error(err);
    res.status(err.status || 500).send({ result: 500, message: 'Internal Server Error' });
  }

  module.exports = {
    handleInvalidJson,
    handleUnauthorized,
    handleNotFound,
    handleAllOtherErrors
  };