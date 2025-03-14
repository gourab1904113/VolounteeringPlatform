import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { sql } from "./config/db.js"; // Make sure this is correctly set up

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
console.log(PORT);

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import eventJoin from "./routes/eventJoin.js";
import myparticipation from "./routes/myparticipation.js";
import productRoutes from "./routes/productRoute.js"; // Keep this if needed

// Use event-related routes here (change to something more relevant to the purpose)
app.use("/api/events", productRoutes); // This might need to be changed to something like eventRoutes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/join-event", eventJoin);
app.use("/api/myparticipation", myparticipation);

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

    console.log("Users table created or already exists.");

    await sql`
    CREATE TABLE IF NOT EXISTS volunteerevents (
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

    console.log("VolunteerEvents table created or already exists.");

    await sql`
       CREATE TABLE IF NOT EXISTS userevent (
        user_id INT,
        event_id INT,
        PRIMARY KEY (user_id, event_id),
        FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
        FOREIGN KEY (event_id) REFERENCES volunteerevents(event_id) ON DELETE CASCADE
      );
    `;

    console.log("UserEvent table created or already exists.");
  } catch (error) {
    console.log("Error in initDB", error);
  }
}

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
