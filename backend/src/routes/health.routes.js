import { Router } from "express";
import { getDatabaseHealth } from "../config/db.js";

const router = Router();

router.get("/", (req, res) => {
  const dbHealth = getDatabaseHealth();
  const isHealthy = dbHealth.isConnected;

  res.status(isHealthy ? 200 : 503).json({
    status: isHealthy ? "ok" : "degraded",
    service: "roomly-backend",
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    database: dbHealth,
  });
});

export default router;
