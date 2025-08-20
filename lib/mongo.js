// lib/db/connectDb.js
import mongoose from "mongoose";

// Use a global variable to cache the connection
// In Next.js, this variable is persisted across requests on the same server instance
let cachedConnection = null;

export async function connectDb() {
  // If a connection is already cached, reuse it
  if (cachedConnection) {
    console.log("Using existing database connection. 🟢");
    return;
  }

  try {
    // Attempt to connect to the database
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    // Cache the new connection for future use
    cachedConnection = conn;

    // Optional: Add event listeners for logging
    conn.connection.on("connected", () => {
      console.log("New database connection established. ✨");
    });
    conn.connection.on("disconnected", () => {
      console.log("Database disconnected. 💔");
    });
    conn.connection.on("error", (err) => {
      console.error("Database connection error: 😢", err);
    });

  } catch (error) {
    console.error("Failed to connect to the database. 😟", error);
    // Throwing an error here will stop the server action
    throw new Error("Database connection failed."); 
  }
}