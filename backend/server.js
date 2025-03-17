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
import postRoutes from "./routes/postRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import teamJoin from "./routes/teamJoin.js";
import teamJoinEmail from "./routes/teamJoinEmail.js";
import teamInfo from "./routes/team_info.js";

// Use event-related routes here (change to something more relevant to the purpose)
app.use("/api/events", productRoutes); // This might need to be changed to something like eventRoutes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/join-event", eventJoin);
app.use("/api/myparticipation", myparticipation);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/join-team", teamJoin);
app.use("/api/join-team-email", teamJoinEmail);
app.use("/api/teaminfo", teamInfo);

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

    await sql`
       CREATE TABLE IF NOT EXISTS userevent (
        user_id INT,
        event_id INT,
        PRIMARY KEY (user_id, event_id),
        FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
        FOREIGN KEY (event_id) REFERENCES volunteerevents(event_id) ON DELETE CASCADE
      );
    `;

    await sql`
     CREATE TABLE IF NOT EXISTS  posts (
      post_id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(user_id),
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
       );
    `;

    await sql`
       CREATE TABLE IF NOT EXISTS  comments (
      comment_id SERIAL PRIMARY KEY,
      post_id INTEGER REFERENCES posts(post_id),
      user_id INTEGER REFERENCES users(user_id),
      content TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
      );
   `;

    await sql`
    CREATE TABLE IF NOT EXISTS  teams (
    team_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    type Text NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
    );
  `;

    await sql`
  CREATE TABLE IF NOT EXISTS  teamsuser (
  teamuser_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id),
  team_id INTEGER REFERENCES teams(team_id)
  );
`;

    console.log("DB initialized");
  } catch (error) {
    console.log("Error in initDB", error);
  }
}

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
