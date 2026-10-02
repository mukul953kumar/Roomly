import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = ["MONGODB_URI"];

if (process.env.NODE_ENV === "production") {
  const missing = requiredEnvVars.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`[Config Error] Missing required environment variables: ${missing.join(", ")}`);
  }
}

export const config = {
  port: parseInt(process.env.PORT, 10) || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  mongoUri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/roomly",
  isProduction: process.env.NODE_ENV === "production",
};
