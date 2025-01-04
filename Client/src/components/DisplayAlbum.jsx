import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { albumsData, assets, songsData } from "../assets/assets";

const DisplayAlbum = () => {
  const { id } = useParams();
  const albumData = albumsData[id];

  return (
    <>
      <Navbar />
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        <img className="w-48 rounded-lg shadow-md" src={albumData.image} alt="" />
        <div className="flex flex-col text-white">
          <p className="text-[#a7a7a7]">Playlist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">{albumData.name}</h2>
          <h4 className="text-[#a7a7a7]">{albumData.desc}</h4>
          <p className="mt-1 text-[#a7a7a7]">
            <img className="inline-block w-5" src={assets.spotify_logo} alt="" />
            <b>Spotify</b> - 1,200 likes - <b>20 songs,</b> about 2 hr 30 mins
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p className="text-lg font-bold">
          <b className="mr-4">#</b>Title
        </p>
        <p className="text-lg font-bold">Album</p>
        <p className="hidden sm:block text-lg font-bold">Date Added</p>
        <img className="m-auto w-5" src={assets.clock_icon} alt="" />
      </div>
      <hr className="border-[#a7a7a7]" />

      {songsData.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer transition-all duration-300 ease-in-out rounded-lg"
        >
          <p className="text-white">
            <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
            <img className="inline w-10 mr-5 rounded" src={item.image} alt="" />
            {item.name}
          </p>
          <p className="text-[15px] ">{albumData.name}</p>
          <p className="text-[15px] hidden sm:block">5 days ago</p>
          <p className="text-[15px] text-center">{item.duration}</p>
        </div>
      ))}
    </>
  );
};

export default DisplayAlbum;
