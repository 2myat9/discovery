import React, { useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import './App.scss';
import { v4 as uuidv4 } from 'uuid';
import { FcBookmark, FcPlus } from 'react-icons/fc';

interface Bookmark {
  timestamp: number;
  id: string;
  name?: string;
  notes?: string;
}

// const updateBookmarkName = (id: string, newName: string) => {
//   // we don't want to write multiple functions
// }

// const updateBookmark = (id: string, newProperties: Partial<Bookmark>) {
//   // iterate bookmarks state array, find the object which matches id
//   // If id not found, log a warning for debugging
//   // if id is found,
//   // const newBookmarks = [...oldBookmarks]
//   // { id: bookmark } -- TODO: TRY this object structure, more efficient <----
//   // find the index of the object with matching id
//   // newBookmarks[i] = {...oldBookmarks[i], ...newProperties}
//   // return newBookmarks;

//   const matchingBookmarkIndex = null;
//   for (const bookmark of bookmarks) {
//     if (bookmark.id === id) {
//       matchingBookmarkIndex = //update index;
//     }
//   }

//   if (matchingBookmarkIndex) {
//     setBookmarks((prevState) => {
//       const newBookmarks = [...prevState]
//     // updateMatchingBook
//     newBookmarks[matchingBookmarkIndex] = {...prevState[i], ...newProperties}
//     return newBookmarks;
//     })
//   } else {
//     console.warn('Invalid id found. Could not update state', id)
//   }

// }

// const INITIAL_BOOKMARKS: Bookmark[] = [{ timestamp: 30, id: 'placeholder' }];

const App = () => {
  const [urlInput, setUrlInput] = useState('');
  const [video, setVideo] = useState('');
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  // for bookmark creation
  const [bookmarkNameInput, setBookmarkNameInput] = useState('');

  const videoRef: React.LegacyRef<ReactPlayer> = React.createRef();

  const handleUrlSubmit = (e: React.FormEvent) => {
    setVideo(urlInput);
    e.preventDefault();
  };

  const handleUrlInput = (e: React.FormEvent<HTMLInputElement>) => {
    setUrlInput(e.currentTarget.value);
  };

  const handleBookmarkNameInput = (e: React.FormEvent<HTMLInputElement>) => {
    setBookmarkNameInput(e.currentTarget.value);
  };

  const createBookmark = () => {
    const timestamp = videoRef?.current?.getCurrentTime();
    if (timestamp) {
      setBookmarks((prevState: Bookmark[]): Bookmark[] => {
        return [...prevState, { timestamp, id: uuidv4(), name: bookmarkNameInput }]; // key, value name the same so just timestamp
      });
    }
    console.log(bookmarks);
    console.log(bookmarkNameInput);
  };

  const timestampButtons = bookmarks?.map((bookmark: Bookmark) => {
    return (
      <button
        key={bookmark.id}
        onClick={() => {
          goToTimestamp(bookmark.timestamp);
        }}>
        <FcBookmark /> {bookmark.name}
      </button>
      // <FcBookmark
      //   key={bookmark.id}
      //   onClick={() => {
      //     goToTimestamp(bookmark.timestamp);
      //   }}
      // />
    );
  });

  const goToTimestamp = (timestamp: number) => {
    videoRef?.current?.seekTo(timestamp);
  };

  return (
    <>
      <div className="main-container">
        <div className="welcome-msg">Hello Author</div>
        <form onSubmit={handleUrlSubmit} className="url-form">
          <label htmlFor="url-input">Paste a url of the video you wish to play: </label>
          <input type="text" id="url-input" value={urlInput} onChange={handleUrlInput} />
          <input type="submit" value="Submit" />
        </form>
        <ReactPlayer
          ref={videoRef}
          url={video}
          controls={true}
          playing={true}
          volume={0.5}
          muted={true}
        />

        <label htmlFor="bookmark-name-input">Give your bookmark a name: </label>
        <input
          type="text"
          id="bookmark-name-input"
          value={bookmarkNameInput}
          onChange={handleBookmarkNameInput}
        />
        <button onClick={createBookmark}>
          <FcPlus /> Add
        </button>

        <div className="timestamp-buttons">{timestampButtons}</div>
      </div>
    </>
  );
};

export default App;
