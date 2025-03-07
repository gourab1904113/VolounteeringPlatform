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

app.use("/api/events", productRoutes); //call productRoutes

///create Database
async function initDB() {
  try {
    await sql`
    CREATE TABLE VolunteerEvents (
    event_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    event_time TIME NOT NULL,
    location VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   )
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
