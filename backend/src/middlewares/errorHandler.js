import ApiError from "../utils/ApiError.js";
import { config } from "../config/index.js";

export const errorHandler = (err, req, res, next) => {
  let error = err;

  // Normalize generic errors to ApiError instances
  if (!(error instanceof ApiError)) {
    // Handle Mongoose invalid ObjectId (CastError)
    if (error.name === "CastError") {
      const message = `Invalid resource identifier: ${error.value}`;
      error = ApiError.badRequest(message);
    }
    // Handle Mongoose schema validation failures
    else if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors || {}).map((item) => item.message);
      error = ApiError.badRequest("Validation failed", validationErrors);
    }
    // Handle MongoDB unique constraint violations
    else if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyValue || {})[0] || "field";
      const message = `Duplicate value entered for ${duplicateField}. Must be unique.`;
      error = ApiError.conflict(message);
    }
    // Handle JWT authentication failures
    else if (error.name === "JsonWebTokenError") {
      error = ApiError.unauthorized("Invalid authentication token");
    } else if (error.name === "TokenExpiredError") {
      error = ApiError.unauthorized("Authentication token expired");
    } else {
      const statusCode = error.statusCode || 500;
      const message = error.message || "Internal server error";
      error = new ApiError(statusCode, message, [], error.stack);
    }
  }

  // Diagnostic logging based on severity
  if (error.statusCode >= 500) {
    console.error(`[Server Error ${error.statusCode}] ${req.method} ${req.originalUrl}:`, error);
  } else {
    console.warn(`[Client Error ${error.statusCode}] ${req.method} ${req.originalUrl}: ${error.message}`);
  }

  const responsePayload = {
    success: false,
    statusCode: error.statusCode,
    message: error.message,
    errors: error.errors || [],
    ...(!config.isProduction && { stack: error.stack }),
  };

  res.status(error.statusCode).json(responsePayload);
};

export default errorHandler;
