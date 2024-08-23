import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";

import connectDB from "./config/dbConfig.js";
import companyRoutes from "./routes/bookRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
dotenv.config({ path: "../.env" });
connectDB();

app.use(express.json());
app.use(morgan("dev"));

// Get API
app.get("/", (req, res) => {
  res.send("<h1> Welcome to Home Page </h1>");
});

app.use("/api/v1/books", companyRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 8080; //Port No from Config File
const DEV_MODE = process.env.DEV_MODE || "Development"; // DEV_MODE from Config File

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Node Server Running in ${DEV_MODE} Mode on Port No ${PORT}`);
});
