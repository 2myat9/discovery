import React, { useState } from 'react';
import ReactPlayer from 'react-player/youtube';

const App = () => {
  const [urlInput, setUrlInput] = useState('')
  const [video, setVideo] = useState('')

  const handleSubmit = (e: any) => {
    setVideo(urlInput);
    e.preventDefault();
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrlInput(e.target.value);
  }

  return (
    <>
      <div>Hello World</div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Paste a url of the video you wish to play: </label>
        <input type="text" value={urlInput} onChange={handleChange} />
        <input type="submit" value="Submit" />
      </form>
      <ReactPlayer url={video} controls={true} playing={true} volume={0.5} muted={true} />
    </>

  )
}

export default App;