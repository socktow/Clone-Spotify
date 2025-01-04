import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

// Create the PlayerContext
export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef(null); // Corrected typo from audioReft to audioRef
  const seekBg = useRef(null);
  const seekBar = useRef(null);

  const [track, setTrack] = useState(songsData[0]); // Default to the first song
  const [playStatus, setPlayStatus] = useState(false); // Track play/pause state
  const [time, setTime] = useState({
    currentTime: {
      seconds: 0,
      minutes: 0,
    },
    totalTime: {
      seconds: 0,
      minutes: 0,
    },
  });

  // Function to play the current track
  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setPlayStatus(true);
    }
  };

  // Function to pause the current track
  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayStatus(false);
    }
  };

  const playWithId = (id) => {
    setTrack(songsData[id]);
    if (audioRef.current) {
      audioRef.current.play();
      setPlayStatus(true);
    }
  };

  const previous = async () => {
    if (track.id > 0) {
      await setTrack(songsData[track.id - 1]);
      await audioRef.current.play();
      await setPlayStatus(true);
    }
  };

  const next = async () => {
    if (track.id < songsData.length - 1) {
      await setTrack(songsData[track.id + 1]);
      await audioRef.current.play();
      await setPlayStatus(true);
    }
  };

  const seekSong = (e) => {
    if (!seekBg.current || !audioRef.current || !audioRef.current.duration) {
      console.warn("seekBg or audioRef is not available");
      return;
    }

    const { left, width } = seekBg.current.getBoundingClientRect();
    const clickX = e.clientX - left;

    const newTime = (clickX / width) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
  };

  useEffect(() => {
    if (!audioRef.current) return;
  
    const interval = setInterval(() => {
      if (audioRef.current.duration) {
        const currentTime = audioRef.current.currentTime;
        const duration = audioRef.current.duration;
  
        seekBar.current.style.width = `${(currentTime / duration) * 100}%`;
  
        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime % 60);
  
        setTime((prevTime) => ({
          ...prevTime,
          currentTime: {
            seconds: seconds.toString().padStart(2, "0"),
            minutes: minutes.toString().padStart(2, "0"),
          },
          totalTime: {
            seconds: Math.floor(duration % 60).toString().padStart(2, "0"),
            minutes: Math.floor(duration / 60).toString().padStart(2, "0"),
          },
        }));
      }
    }, 500); // Cập nhật mỗi 500ms
  
    return () => clearInterval(interval); // Xóa interval khi component unmount
  }, [audioRef]);
  

    useEffect(() => {
      if (audioRef.current) {
        audioRef.current.play();
        setPlayStatus(true);
      }
    }, [track]); // Khi track thay đổi, tự động phát bài hát

    useEffect(() => {
      const handleCanPlayThrough = () => {
        if (audioRef.current) {
          audioRef.current.play();
          setPlayStatus(true);
        }
      };

      if (audioRef.current) {
        audioRef.current.addEventListener("canplaythrough", handleCanPlayThrough);
      }

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener(
            "canplaythrough",
            handleCanPlayThrough
          );
        }
      };
    }, [track]);

  // Context value provided to children
  const contextValue = {
    audioRef,
    seekBg,
    seekBar,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    previous,
    next,
    seekSong,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
