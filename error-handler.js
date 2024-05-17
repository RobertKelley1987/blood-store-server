function errorHandler(err, req, res, next) {
  // Log error
  console.log(err);

  // Return status and message to client
  const { statusCode, message } = err;
  res.send({ error: { statusCode, message } });
}

export default errorHandler;
