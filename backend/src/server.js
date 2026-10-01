import express from "express";
import cors from "cors";
import { config } from "./config/index.js";
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

// Root fallback route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Roomly API is running. People don't join a meeting; they join an activity.",
    healthCheck: "/api/health",
  });
});

// Start server
app.listen(config.port, () => {
  console.log(`[Roomly Server] Running on http://localhost:${config.port} in ${config.nodeEnv} mode`);
});

export default app;
