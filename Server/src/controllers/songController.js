import { v2 as cloudinary } from "cloudinary";

const addSong = async (req, res) => {
    try {
      const name = req.body.name;
      const desc = req.body.desc;
      const album = req.body.album;
  
      // Kiểm tra xem file có tồn tại không
      if (!req.files || !req.files.audio || !req.files.image) {
        return res.status(400).send({ error: "Both audio and image files are required." });
      }
  
      // Truy cập các file đã upload
      const audioFile = req.files.audio[0]; // Truy cập file audio
      const imageFile = req.files.image[0]; // Truy cập file image

      // Upload lên Cloudinary
      const audioUpload = await cloudinary.uploader.upload(audioFile.path, { resource_type: "video" });
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
      return res.status(200).send({
        message: "Song added successfully",
        audioUpload,
        imageUpload
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "Server error" });
    }
  };

const listSong = (req, res) => {};

export { addSong, listSong };
