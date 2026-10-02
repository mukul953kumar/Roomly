import { Router } from "express";
import { getDatabaseHealth } from "../config/db.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = Router();

// Standard health inspection endpoint
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const dbHealth = getDatabaseHealth();
    const isHealthy = dbHealth.isConnected;
    const statusCode = isHealthy ? 200 : 503;

    const payload = {
      service: "roomly-backend",
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
      database: dbHealth,
    };

    const message = isHealthy
      ? "Roomly backend services and database are healthy"
      : "Roomly backend services are degraded: database is not connected";

    new ApiResponse(statusCode, payload, message).send(res);
  })
);

// Diagnostic test endpoint to verify ApiError handling
router.get(
  "/error-test",
  asyncHandler(async (req, res) => {
    const { type = "bad-request" } = req.query;

    switch (type) {
      case "unauthorized":
        throw ApiError.unauthorized("Authentication required to access this resource");
      case "forbidden":
        throw ApiError.forbidden("You do not have permission to perform this action");
      case "not-found":
        throw ApiError.notFound("The requested resource was not found");
      case "conflict":
        throw ApiError.conflict("A conflicting resource already exists");
      case "server":
        throw ApiError.internal("Simulated internal server error");
      case "bad-request":
      default:
        throw ApiError.badRequest("Invalid input parameters", ["Field 'query' is required", "Field 'mode' is invalid"]);
    }
  })
);

export default router;
