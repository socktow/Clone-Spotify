import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure you import the CSS for proper styling
import { Routes, Route } from 'react-router-dom';
import ListSong from './pages/ListSong';
import ListAlbum from './pages/ListAlbum';
import AddSong from './pages/AddSong';
import AddAlbum from './pages/AddAlbum';
import Slidebar from './components/Slidebar';
import Navbar from './components/Navbar';
export const url = "http://localhost:4000";
const App = () => {
  return (
    <div className="flex items-start min-h-screen">
      <ToastContainer />
      <Slidebar />
      <div className="flex-1 h-screen overflow-y-scroll bg-[#F3FFF7]">
        <Navbar />
        <div className="pt-8 pl-5 sm:pt-12 sm:pl-12">
          <Routes>
            <Route path="/" element={<AddSong />} />
            <Route path="/list-album" element={<ListAlbum />} />
            <Route path="/add-Song" element={<AddSong />} />
            <Route path="/list-Song" element={<ListSong />} />
            <Route path="/add-Album" element={<AddAlbum />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
