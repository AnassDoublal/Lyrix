import { useEffect, useState } from "react";
import axios from "axios";
import "./Style/songs.css";
import { fetchAccessToken, searchTrack } from "./Utils/Spotify";
import { Header, Footer } from "./Components/Layout";
import LoadMoreButton  from "./Components/Songs/LoadMoreButton";
import SongSearchInput from "./Components/Songs/SongSearchInput";
import TrackList from "./Components/Songs/TrackList";

const PLAYLIST_ID = "5ABHKGoOzxkaa28ttQV9sE";

const PublicSpotifyPlaylist = () => {
  const [accessToken, setAccessToken] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [playlist, setPlaylist] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // Get access token
  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await fetchAccessToken();
        setAccessToken(token);
      } catch (err) {
        console.error("Error fetching access token:", err);
      }
    };
    getToken();
  }, []);

  // Fetch playlist
  useEffect(() => {
    if (!accessToken) return;

    const fetchPlaylist = async () => {
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/playlists/${PLAYLIST_ID}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        setPlaylist(response.data);
      } catch (error) {
        console.error("Error fetching playlist:", error);
      }
    };

    fetchPlaylist();
  }, [accessToken]);

  // Search Spotify with pagination
  useEffect(() => {
    if (!accessToken || searchQuery.trim() === "") return;

    const searchTracks = async () => {
      try {
        const newItems = await searchTrack(accessToken, searchQuery, 20, offset);
        setSearchResults((prev) => (offset === 0 ? newItems : [...prev, ...newItems]));
        setHasMore(newItems.length > 0);
      } catch (error) {
        console.error("Error searching Spotify:", error);
      }
    };

    searchTracks();
  }, [searchQuery, accessToken, offset]);

  // Reset offset when query changes
  useEffect(() => {
    if (searchQuery.trim() === "") return;
    setOffset(0);
    setSearchResults([]);
  }, [searchQuery]);

  const displayTracks =
    searchQuery.trim() === ""
      ? playlist?.tracks.items.map((item) => item.track)
      : searchResults;

  return (
    <div className="appContainer">
      <Header />
      <main>
        <div className="songPageTitle">Find lyrics anywhere, everywhere</div>
        <SongSearchInput value={searchQuery} onChange={setSearchQuery} />

        {!displayTracks ? (
          <p>Loading...</p>
        ) : (
          <TrackList tracks={displayTracks} />
        )}

        {searchQuery && hasMore && (
          <LoadMoreButton onClick={() => setOffset((prev) => prev + 20)} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default PublicSpotifyPlaylist;
