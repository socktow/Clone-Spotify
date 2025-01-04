
import { useState } from "react";
import { assets } from "../assets/assets";

const AddSong = () => {
  const [song, setSong] = useState(false);
  const [image, setImage] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [album, setAlbum] = useState("");
  const [loading, setLoading] = useState(false);
  const [albumData, setAlbumData] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Handle form submission here
    setLoading(false);
  };

  return loading ? (
    <div className="grid place-items-center min-h-[80vh]">
      <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin">

      </div>
    </div>
  ) : (
    <form className="flex flex-col items-start gap-8 text-gray-600" onSubmit={onSubmitHandler}>
      <div className="flex gap-8">
        <div className="flex flex-col gap-4">
          <p>Upload Song</p>
          <input onChange={(e) => setSong(e.target.files[0])} type="file" id="song" accept="audio/*" hidden />
          <label htmlFor="song">
            <img src={song ? assets.upload_added : assets.upload_song} className="w-24 cursor-pointer" alt="Upload Song" />
          </label>
        </div>
        <div className="flex flex-col gap-4">
          <p>Upload Image</p>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" accept="image/*" hidden />
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area}className="w-24 cursor-pointer" alt="Upload Image" />
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <p>Song Name</p>
        <input type="text" className="p-2 border border-gray-300 rounded" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="flex flex-col gap-4">
        <p>Song Description</p>
        <textarea className="p-2 border border-gray-300 rounded" rows="4" value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
      </div>

      <div className="flex flex-col gap-4">
        <p>Album</p>
        <select className="p-2 border border-gray-300 rounded">
          <option value="album1">Album 1</option>
          <option value="album2">Album 2</option>
          <option value="album3">Album 3</option>
        </select>
      </div>

      <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">Submit</button>
    </form>
  );
};

export default AddSong;