import mongoose from "mongoose";
import chalk from "chalk";
import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const connectDB = async () => {
  mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    console.log(chalk.blue(" MongoDB connected"));
  })
  .catch((error) => {
    console.error(chalk.red("MongoDB connection failed"));
    console.error(error);
  });}

export default connectDB;


