import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../App";

const ListAlbum = () => {
  const [data, setData] = useState([]);

  const fetchAlbums = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const removeAlbum = async (id) => {
    try {
      const response = await axios.post(`${url}/api/album/remove`, { id });
      if (response.status === 200) {
        setData(data.filter((album) => album._id !== id)); // Cập nhật danh sách album sau khi xóa
        alert("Album removed successfully!");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to remove album");
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Danh Sách Album</h1>
      <div className="space-y-4">
        {data.map((album) => (
          <div
            key={album._id}
            className="flex items-center space-x-4 p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow"
            style={{ backgroundColor: album.bgColor }}
          >
            <img
              src={album.image}
              alt={album.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1 text-white">
              <h2 className="text-lg font-semibold">Name : {album.name}</h2>
              <p className="text-sm">Desc : {album.desc}</p>
            </div>
            <button
              onClick={() => removeAlbum(album._id)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Xóa
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListAlbum;
