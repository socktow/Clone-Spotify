import { addSong, listSong } from "../controllers/songController.js";
import express from "express";
import upload from "../middleware/multer.js";

const songRouter = express.Router();

// Routes
songRouter.post(
  "/add",
  upload.fields([
    { name: "audio", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  addSong
);
songRouter.get("/list", listSong);

export default songRouter;
