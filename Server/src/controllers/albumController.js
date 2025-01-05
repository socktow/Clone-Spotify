import { v2 as cloudinary } from "cloudinary";
import albumModel from "../models/albumModel.js";

const addAlbum = async (req, res) => {
    try {
      const { name, desc, bgColor } = req.body;
      const imagefile = req.file;
      const imageUpload = await cloudinary.uploader.upload(imagefile.path, {
        resource_type: "image",
      });
  
      const albumData = {
        name,
        desc,
        bgColor,
        image: imageUpload.secure_url,
      };
  
      const newAlbum = new albumModel(albumData);
      await newAlbum.save();
  
      return res.status(200).send({ message: "Album added successfully" });
    } catch (error) {
      console.error("Error adding album:", error);
      return res.status(500).send({ error: "Server error" });
    }
  };

const listAlbum = async (req, res) => {
  try {
    const allAlbums = await albumModel.find();
    return res.status(200).send(allAlbums);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Server error" });
  }
};

const removeAlbum = async (req, res) => {
  try {
    const { id } = req.body; // Lấy ID từ body request
    if (!id) {
      return res.status(400).send({ error: "Missing album ID" });
    }

    const deletedAlbum = await albumModel.findByIdAndDelete(id);
    if (!deletedAlbum) {
      return res.status(404).send({ error: "Album not found" });
    }

    return res.status(200).send({ message: "Album removed successfully", id });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Server error" });
  }
};


export { addAlbum, listAlbum, removeAlbum };
