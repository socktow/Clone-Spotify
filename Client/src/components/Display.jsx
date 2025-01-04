import { Routes, Route, useLocation } from "react-router-dom";
import DisplayHome from "./DisplayHome";
import DisplayAlbum from "./DisplayAlbum";
import { useEffect, useRef } from "react";
import { albumsData } from "../assets/assets";

const Display = () => {
  const dislayRef = useRef();
  const location = useLocation();
  const isAlbum = location.pathname.includes("album");
  
  // Extract the album ID from the URL
  const albumId = isAlbum ? location.pathname.split("/").pop() : null;
  const album = albumId !== null && albumsData[Number(albumId)];
  const bgColor = album ? album.bgColor : null;

  useEffect(() => {
    if (isAlbum && bgColor) {
      dislayRef.current.style.background = `linear-gradient(to top, ${bgColor}, #121212)`;
    } else {
      dislayRef.current.style.background = "#121212";
    }
  }, [isAlbum, bgColor]); // Add dependencies to avoid unnecessary re-renders

  return (
    <div
      ref={dislayRef}
      className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0"
    >
      <Routes>
        <Route path="/" element={<DisplayHome />} />
        <Route path="/album/:id" element={<DisplayAlbum />} />
      </Routes>
    </div>
  );
};

export default Display;
