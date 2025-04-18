import React, { useEffect, useState } from "react";
import "./Style/bookmarks.css";
import { fetchAccessToken, searchTrack } from "./Utils/Spotify";
import { Header, Footer } from "./Components/Layout";
import BookmarkList from "./Components/Bookmarks/BookmarkList";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [trackData, setTrackData] = useState({});

  // Get access token
  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await fetchAccessToken();
        setAccessToken(token);
      } catch (err) {
        console.error("Failed to get token:", err);
      }
    };
    getToken();
  }, []);

  // Load bookmarked tracks from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bookmarkedLyrics") || "[]");
    setBookmarks(stored);
  }, []);

  // Fetch album images for bookmarked tracks
  useEffect(() => {
    const fetchTrackImages = async () => {
      if (!accessToken || bookmarks.length === 0) return;

      const newTrackData = {};
      for (const { track, artist } of bookmarks) {
        try {
          const results = await searchTrack(accessToken, `${track} ${artist}`, 1);
          const foundTrack = results[0];
          if (foundTrack) {
            newTrackData[`${track}_${artist}`] = {
              image: foundTrack.album.images[0]?.url,
            };
          }
        } catch (err) {
          console.error(`Error fetching ${track} by ${artist}:`, err);
        }
      }
      setTrackData(newTrackData);
    };

    fetchTrackImages();
  }, [accessToken, bookmarks]);

  const removeBookmark = (track, artist) => {
    const updated = bookmarks.filter(
      (b) => !(b.track === track && b.artist === artist)
    );
    localStorage.setItem("bookmarkedLyrics", JSON.stringify(updated));
    setBookmarks(updated);
  };

  return (
    <div className="appContainer">
      <Header />
      <main>
        <h1 className="Bookmarks_SavedLyrics">Saved Lyrics</h1>

        {bookmarks.length === 0 ? (
          <p className="Bookmarks_NoSavedSongs">No saved songs yet.</p>
        ) : (
          <BookmarkList
            bookmarks={bookmarks}
            trackData={trackData}
            onRemove={removeBookmark}/>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Bookmarks;