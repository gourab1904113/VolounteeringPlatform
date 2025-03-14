//const express = require("express");
import express from "express";

import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import productRoutes from "./routes/productRoute.js"; //type module, must have extension at end like(.js)
import { sql } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
console.log(PORT);

app.use(express.json()); ///extract json data
app.use(cors());
app.use(helmet());
app.use(morgan("dev")); //log the request
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import eventJoin from "./routes/eventJoin.js";

app.use("/api/events", productRoutes); //call productRoutes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/join-event", eventJoin);

async function initDB() {
  try {
    await sql`
    CREATE TABLE IF NOT EXISTS users (
      user_id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      skills TEXT,
      causes TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `;

    await sql`
    CREATE TABLE IF NOT EXISTS VolunteerEvents (
      event_id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      event_date DATE NOT NULL,
      event_time TIME NOT NULL,
      location VARCHAR(255) NOT NULL,
      category VARCHAR(100) NOT NULL,
      created_by INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `;

    await sql`
       CREATE TABLE IF NOT EXISTS UserEvent (
        user_id INT,
        event_id INT,
        PRIMARY KEY (user_id, event_id),
        FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
        FOREIGN KEY (event_id) REFERENCES VolunteerEvents(event_id) ON DELETE CASCADE
      );
    `;

    console.log("Database initialized");
  } catch (error) {
    console.log("Error initDB", error);
  }
}

///when database is ready
initDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running port " + PORT);
  });
});
