import React, { useEffect, useState } from "react";
import AudioPlayer from "./components/AudioPlayer";

const App = () => {
  const [audioFiles, setAudioFiles] = useState([]);
  const [playlist, setPlaylist] = useState([{ name: "kajsn", url: "skjnjks" }]);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setAudioFiles([...audioFiles, ...files]);

    const fileURLs = files.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
    }));

    setPlaylist([...playlist, ...fileURLs]);
  };

  const handleButtonClick = () => {
    document.getElementById("audioInput").click();
  };

  return (
    <div>
      <h1 className=" text-blue-500 bg-blue-50 text-4xl  border-b-2 border-blue-300 font-bold px-8 py-3">
        Audio Player App{" "}
        <span className="text-lg text-gray-800 font-normal">by Tarundeep</span>
      </h1>
      <div className="flex flex-col items-center py-6">
        <div className="p-12 bg-blue-100 border-dashed border-2 border-blue-400 rounded-xl">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg "
            onClick={handleButtonClick}
          >
            Upload MP3
          </button>
        </div>
        <input
          type="file"
          id="audioInput"
          accept=".mp3"
          multiple
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>
      {playlist.length === 1 && (
        <h2 className="text-center text-gray-700 ">
          Add songs to see playlist <br />
          you can upload multiple files at once
        </h2>
      )}
      {playlist.length > 1 && <AudioPlayer playlist={playlist} />}
    </div>
  );
};

export default App;
