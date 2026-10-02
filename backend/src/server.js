import express from "express";
import cors from "cors";
import { config } from "./config/index.js";
import { connectDatabase, disconnectDatabase } from "./config/db.js";
import ApiResponse from "./utils/ApiResponse.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";
import errorHandler from "./middlewares/errorHandler.js";
import healthRouter from "./routes/health.routes.js";

const app = express();

// Middlewares
app.use(
  cors({
    origin: config.clientUrl,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Base routes
app.use("/api/health", healthRouter);

// Root informational endpoint
app.get("/", (req, res) => {
  new ApiResponse(
    200,
    {
      service: "roomly-backend",
      docs: "/api/health",
      intent: "People don't join a meeting; they join an activity.",
    },
    "Roomly API gateway is active"
  ).send(res);
});

// Catch-all 404 handler for undefined routes
app.use(notFoundHandler);

// Centralized global error handling middleware
app.use(errorHandler);

// Initialize database connection
await connectDatabase();

// Start HTTP server
const server = app.listen(config.port, () => {
  console.log(`[Roomly Server] Running on http://localhost:${config.port} in ${config.nodeEnv} mode`);
});

// Handle graceful shutdown on termination signals
const handleGracefulShutdown = async (signal) => {
  console.log(`\n[Roomly Server] Received ${signal}. Starting graceful shutdown...`);
  server.close(async () => {
    console.log("[Roomly Server] HTTP server closed.");
    await disconnectDatabase();
    process.exit(0);
  });
};

process.on("SIGINT", () => handleGracefulShutdown("SIGINT"));
process.on("SIGTERM", () => handleGracefulShutdown("SIGTERM"));

export default app;
