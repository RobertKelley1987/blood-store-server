import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  // Log error
  console.log(error);

  // Return status and message to client
  const { statusCode, message } = error;
  res.send({ error: { statusCode, message } });
};

export default errorHandler;
