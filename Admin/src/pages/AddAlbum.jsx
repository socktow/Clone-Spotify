import { useState } from "react";
import axios from "axios";
import { url } from "../App";

const AddAlbum = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Xử lý sự kiện chọn file
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Gửi form thêm album
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("desc", desc);
    formData.append("bgColor", bgColor);
    formData.append("image", image);

    try {
      const response = await axios.post(`${url}/api/album/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setMessage("Album added successfully!");
        setName("");
        setDesc("");
        setBgColor("");
        setImage(null);
      }
    } catch (error) {
      console.error(error);
      setMessage("Failed to add album.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Add Album</h1>

      {/* Hiển thị thông báo */}
      {message && <div className="text-center text-red-500 mb-4">{message}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-lg font-medium">Album Name</label>
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
          <label htmlFor="bgColor" className="block text-lg font-medium">Background Color</label>
          <input
            type="color"
            id="bgColor"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label htmlFor="image" className="block text-lg font-medium">Album Image</label>
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
            {loading ? "Adding..." : "Add Album"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAlbum;
