import React, { useState, useRef, useEffect } from "react";

const AudioPlayer = ({ playlist }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef();
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;

    audio.src = playlist[currentTrackIndex].url;
    const handleLoadedData = () => {
      if (currentTrackIndex > 0) {
        audio.play();
        audio.addEventListener("loadeddata", handleLoadedData);
      }
    };
    const handleAudioEnd = () => {
      const currentIndex = playlist.findIndex(
        (song) => song.url === audioRef.current.src
      );
      var nextIndex = (currentIndex + 1) % playlist.length;
      if (nextIndex === 0) {
        nextIndex = 1;
      }

      audioRef.current.src = playlist[nextIndex].url;
      setCurrentTrackIndex(nextIndex);
    };
    audio.addEventListener("loadeddata", handleLoadedData);
    audio.addEventListener("ended", handleAudioEnd);

    return () => {
      audio.removeEventListener("loadeddata", handleLoadedData);
      audio.removeEventListener("ended", handleAudioEnd);
    };
  }, [currentTrackIndex]);

  const handleChange = (index) => {
    setCurrentTrackIndex(index);
  };

  const handlePlay = () => {
    const audio = audioRef.current;
    audio.play();
  };

  const handlePause = () => {
    const audio = audioRef.current;
    audio.pause();
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  return (
    <div>
      <div className=" flex  items-center py-2 flex-col  ">
        <audio
          controls
          onPlay={handlePlay}
          onPause={handlePause}
          onTimeUpdate={handleTimeUpdate}
          ref={audioRef}
          currenttime={currentTime}
          className="w-full max-w-2xl mx-auto  mt-2 rounded-lg overflow-hidden border border-gray-300 bg-gray-100 shadow-md"
        />
        <div className="mt-4 border-2 border-blue-400 w-3/4 p-4 bg-blue-200  ">
          <h3 className="text-2xl border-b-2 pb-2 border-white tracking-widest font-semibold mb-2">
            Playlist
          </h3>
          <ul className=" flex flex-col gap-2  bg-blue-200 list-none p-2  ">
            {playlist.map((track, index) => (
              <li
                key={index}
                onClick={() => handleChange(index)}
                className={`cursor-pointer flex gap-2 align-middle items-center   hover:bg-blue-400 border-2 text-white hover:border-blue-400 border-blue-200 p-2 rounded transition-all duration-300 ease-in-out ${
                  track.name === playlist[currentTrackIndex].name
                    ? "bg-blue-500 tracking-wider font-thin   pl-5  "
                    : " bg-blue-400  "
                } ${index === 0 ? "hidden" : ""} `}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`w-5 h-5 ${
                    track.name === playlist[currentTrackIndex].name
                      ? ""
                      : " text-blue-400 "
                  } `}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z"
                  />
                </svg>
                {track.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
