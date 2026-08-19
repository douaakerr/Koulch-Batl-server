
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import chalk from "chalk";
import dns from "dns";
import connectDB from "./config/connectDB.js";

dotenv.config( {path: ".env.development"});
//dns config

dns.setServers(["8.8.8.8", "8.8.4.4"]);

//var 
const app = express();
const port = process.env.PORT ;

//middleware
app.use(express.json());
app.use(morgan("dev"));


app.get("/", (req, res) => {
  res.send("Hello World!");
});



connectDB();

const server = app.listen(port, () => {
  console.log(chalk.green(` Server running on port ${port}`));
});

// node grace exit
async function shutdown() {
  console.log(chalk.yellow("Shutting down gracefully..."));

  server.close(async () => {
    console.log('HTTP server closed.');
    
    process.exit(0);
  });

  
  setTimeout(() => {
    console.error('Forcing shutdown due to timeout.');
    process.exit(1);
  }, 10000);
}


process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);