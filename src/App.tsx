import React, { useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import './App.scss';

const App = () => {
  const [urlInput, setUrlInput] = useState('');
  const [video, setVideo] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    setVideo(urlInput);
    e.preventDefault();
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setUrlInput(e.currentTarget.value);
  };

  return (
    <>
      <div className="main-container">
        <div className="welcome-msg">Hello Author</div>
        <form onSubmit={handleSubmit} className="urlForm">
          <label htmlFor="urlInput">Paste a url of the video you wish to play: </label>
          <input type="text" id="urlInput" value={urlInput} onChange={handleChange} />
          <input type="submit" value="Submit" />
        </form>
        <ReactPlayer url={video} controls={true} playing={true} volume={0.5} muted={true} />
      </div>
    </>
  );
};

export default App;
