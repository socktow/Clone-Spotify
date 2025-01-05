import { v2 as cloudinary } from "cloudinary";
import songModel from "../models/songModel.js";

const addSong = async (req, res) => {
  try {
    const { name, desc, album } = req.body;

    // Check if files exist
    if (!req.files || !req.files.audio || !req.files.image) {
      return res
        .status(400)
        .send({ error: "Both audio and image files are required." });
    }

    // Access uploaded files
    const audioFile = req.files.audio[0]; // Access audio file
    const imageFile = req.files.image[0]; // Access image file

    // Upload to Cloudinary
    const audioUpload = await cloudinary.uploader.upload(audioFile.path, {
      resource_type: "video",
    });

    // Calculate duration after audio upload
    const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(
      audioUpload.duration % 60
    )}`;

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    const songData = {
      name,
      desc,
      album,
      image: imageUpload.secure_url,
      file: audioUpload.secure_url,
      duration,
    };

    const song = new songModel(songData);
    await song.save();

    return res.status(200).send({
      message: "Song added successfully",
      audioUpload,
      imageUpload,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Server error" });
  }
};

const listSong = async (req, res) => {
  try {
    const allsongs = await songModel.find();
    return res.status(200).send(allsongs);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Server error" });
  }
};

const removeSong = async (req, res) => {
  try {
    const { id } = req.body; // Lấy ID từ body request
    if (!id) {
      return res.status(400).send({ error: "Missing song ID" });
    }

    const deletedSong = await songModel.findByIdAndDelete(id);
    if (!deletedSong) {
      return res.status(404).send({ error: "Song not found" });
    }

    return res.status(200).send({ message: "Song removed successfully", id });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Server error" });
  }
};

export { addSong, listSong, removeSong };
