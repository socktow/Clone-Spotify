import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../App";

const ListSong = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // Dữ liệu đã lọc
  const [albums, setAlbums] = useState([]); // Danh sách các album
  const [selectedAlbum, setSelectedAlbum] = useState(""); // Album đang được chọn

  // Lấy danh sách bài hát
  const fetchSongs = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`);
      setData(response.data);
      setFilteredData(response.data); // Mặc định hiển thị tất cả bài hát
      const uniqueAlbums = [
        ...new Set(response.data.map((song) => song.album)),
      ]; // Lấy danh sách album duy nhất
      setAlbums(uniqueAlbums);
    } catch (error) {
      console.error(error);
    }
  };

  // Hàm lọc bài hát theo album
  const filterByAlbum = (album) => {
    setSelectedAlbum(album);
    if (album === "") {
      setFilteredData(data); // Nếu không có album nào được chọn, hiển thị tất cả bài hát
    } else {
      setFilteredData(data.filter((song) => song.album === album)); // Lọc theo album
    }
  };

  const removeSong = async (id) => {
    try {
      const response = await axios.post(`${url}/api/song/remove`, { id });
      if (response.status === 200) {
        setData(data.filter((song) => song._id !== id)); // Cập nhật danh sách bài hát sau khi xóa
        setFilteredData(filteredData.filter((song) => song._id !== id)); // Cập nhật danh sách đã lọc
        alert("Song removed successfully!");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to remove song");
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Song List</h1>

      {/* Bộ lọc album */}
      <div className="mb-4">
        <label htmlFor="album" className="mr-2 text-lg">Filter by Album:</label>
        <select
          id="album"
          value={selectedAlbum}
          onChange={(e) => filterByAlbum(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="">All Albums</option>
          {albums.map((album, index) => (
            <option key={index} value={album}>
              {album}
            </option>
          ))}
        </select>
      </div>

      {/* Bảng bài hát */}
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Image</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Description</th>
            <th className="px-4 py-2 text-left">Album</th>
            <th className="px-4 py-2 text-left">Duration</th>
            <th className="px-4 py-2 text-left">Audio</th>
            <th className="px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((song) => (
            <tr key={song._id} className="border-b hover:bg-gray-50">
              {/* Image */}
              <td className="px-4 py-2">
                <img
                  src={song.image}
                  alt={song.name}
                  className="w-16 h-16 object-cover"
                />
              </td>

              {/* Name */}
              <td className="px-4 py-2">{song.name}</td>

              {/* Description */}
              <td className="px-4 py-2">{song.desc}</td>

              {/* Album */}
              <td className="px-4 py-2">{song.album}</td>

              {/* Duration */}
              <td className="px-4 py-2">{song.duration}</td>

              {/* Audio */}
              <td className="px-4 py-2">
                <audio controls className="w-full" src={song.file}>
                  Your browser does not support the audio element.
                </audio>
              </td>

              {/* Delete Button */}
              <td className="px-4 py-2">
                <button
                  onClick={() => removeSong(song._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListSong;
