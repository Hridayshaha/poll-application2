// Global 404 Error Handler
const error404 = (_req, _res, next) => {
  const error = new Error("Resources Not Found!");
  error.status = 404;
  next(error);
};

// Global Error Handler
const globalErrorHandler = (error, _req, res, _next) => {
  if (error.status === 404) {
    return res.status(404).send(`<h1>${error.message}</h1>`);
  }

  res.status(500).json({
    message: "Something wrong on server",
  });
};

// Module Export
module.exports = {
  error404,
  globalErrorHandler,
};
