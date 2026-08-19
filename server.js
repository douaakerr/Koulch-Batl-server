const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const chalk = require("chalk");
const mongoose = require("mongoose");



const app = express();
const port = process.env.PORT ;


app.use(express.json());
app.use(morgan("dev"));


app.get("/", (req, res) => {
  res.send("Hello World!");
});

const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    console.log(chalk.green(" MongoDB connected"));
  })
  .catch((error) => {
    console.error(chalk.red("MongoDB connection failed"));
    console.error(error);
  });


const server = app.listen(port, () => {
  console.log(chalk.green(` Server running on port ${port}`));
});


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