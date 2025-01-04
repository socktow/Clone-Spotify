import express from "express";
import cors from "cors";
import 'dotenv/config';
import songRouter from "./src/routes/songRoute.js";
import connectDB from "./src/config/mongodb.js";
import connectCloudinary from "./src/config/cloudinary.js";

// app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();
// middlewares
app.use(cors());
app.use(express.json());

// initialize routes
app.use("/api/song", songRouter);
app.get("/", (req, res) => res.status(200).send("Hello World!"));

// listen
app.listen(port, () => console.log(`Listening on port ${port}`));