import mongoose from "mongoose";
import { config } from "./index.js";

const connectionStates = {
  0: "disconnected",
  1: "connected",
  2: "connecting",
  3: "disconnecting",
};

export const connectDatabase = async () => {
  try {
    const connectionInstance = await mongoose.connect(config.mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(
      `[Database] Successfully connected to MongoDB: ${connectionInstance.connection.host}/${connectionInstance.connection.name}`
    );
  } catch (error) {
    console.error(`[Database Error] Initial connection failed: ${error.message}`);
    if (config.isProduction) {
      process.exit(1);
    }
  }
};

// Connection lifecycle event listeners
mongoose.connection.on("disconnected", () => {
  console.warn("[Database] MongoDB connection lost. Attempting reconnection...");
});

mongoose.connection.on("reconnected", () => {
  console.log("[Database] MongoDB reconnected successfully.");
});

mongoose.connection.on("error", (error) => {
  console.error(`[Database Error] Runtime connection error: ${error.message}`);
});

export const getDatabaseHealth = () => {
  const stateCode = mongoose.connection.readyState;
  return {
    status: connectionStates[stateCode] || "unknown",
    isConnected: stateCode === 1,
    host: mongoose.connection.host || null,
    name: mongoose.connection.name || null,
  };
};

export const disconnectDatabase = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
    console.log("[Database] Connection closed gracefully.");
  }
};
