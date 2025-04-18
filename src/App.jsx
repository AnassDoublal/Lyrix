import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicSpotifyPlaylist from "./Songs";
import LyricsFetcher from "./Lyrics";
import Bookmarks from "./Bookmarks";

function App() {
  return (
      <Routes>
        <Route path="/" element={<PublicSpotifyPlaylist />} />
        <Route path="/lyrics/:track/:artist" element={<LyricsFetcher />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
      </Routes>
  );
}

export default App;