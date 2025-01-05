import { useState } from "react";
import axios from "axios";
import { url } from "../App";

const AddSong = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [album, setAlbum] = useState("");
  const [audio, setAudio] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Xử lý sự kiện thay đổi file âm thanh
  const handleAudioChange = (e) => {
    setAudio(e.target.files[0]);
  };

  // Xử lý sự kiện thay đổi file hình ảnh
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Gửi form thêm bài hát
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Tạo FormData để gửi dữ liệu
    const formData = new FormData();
    formData.append("name", name);
    formData.append("desc", desc);
    formData.append("album", album);
    formData.append("audio", audio);
    formData.append("image", image);

    try {
      const response = await axios.post(`${url}/api/song/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setMessage("Song added successfully!");
        setName("");
        setDesc("");
        setAlbum("");
        setAudio(null);
        setImage(null);
      }
    } catch (error) {
      console.error(error);
      setMessage("Failed to add song.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Add Song</h1>

      {/* Hiển thị thông báo */}
      {message && <div className="text-center text-red-500 mb-4">{message}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-lg font-medium">Song Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label htmlFor="desc" className="block text-lg font-medium">Description</label>
          <textarea
            id="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label htmlFor="album" className="block text-lg font-medium">Album</label>
          <input
            type="text"
            id="album"
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label htmlFor="audio" className="block text-lg font-medium">Audio File</label>
          <input
            type="file"
            id="audio"
            onChange={handleAudioChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label htmlFor="image" className="block text-lg font-medium">Image File</label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-3 bg-blue-500 text-white rounded-lg ${loading && "opacity-50"}`}
          >
            {loading ? "Adding..." : "Add Song"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSong;
