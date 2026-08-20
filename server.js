import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import chalk from "chalk";
import dns from "dns";
import connectDB from "./config/connectDB.js";
import router from "./routes/index.js";
import cors from "cors";
import limiter from "./config/rate-limiter.js";

dotenv.config({ path: ".env.development" });

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(limiter);

// Static folder for uploaded images
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

connectDB();

const server = app.listen(port, () => {
  console.log(chalk.blue(`Server running on port ${port}`));
});

// Graceful shutdown
async function shutdown() {
  console.log(chalk.yellow("Shutting down gracefully..."));

  server.close(() => {
    console.log("HTTP server closed.");
    process.exit(0);
  });

  setTimeout(() => {
    console.error("Forcing shutdown due to timeout.");
    process.exit(1);
  }, 10000);
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
