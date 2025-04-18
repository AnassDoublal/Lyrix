import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Style/lyrics.css";
import { fetchAccessToken, searchTrack, getTopTracks } from "./Utils/Spotify";
import { Header, Footer } from "./Components/Layout";
import LyricsHeader from "./Components/Lyrics/LyricsHeader";
import RelatedTracks from "./Components/Lyrics/RelatedTracks";
import SpotifyEmbed from "./Components/Lyrics/SpotifyEmbed";

const LyricsFetcher = () => {
  const { track, artist } = useParams();
  const [lyrics, setLyrics] = useState("");
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  const [spotifyTrack, setSpotifyTrack] = useState(null);
  const [relatedTracks, setRelatedTracks] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Get access token
  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await fetchAccessToken();
        setAccessToken(token);
      } catch (err) {
        console.error("Failed to get Spotify token:", err);
      }
    };
    getToken();
  }, []);

// Fetch lyrics for the current track and artist
  useEffect(() => {
    const fetchLyrics = async () => {
      try {
        setError(null);
        setLyrics("Loading...");
        const response = await axios.get("https://lrclib.net/api/get", {
          params: { track_name: track, artist_name: artist },
        });
        if (!response.data || !response.data.plainLyrics) {
          setLyrics("No lyrics found.");
        } else {
          setLyrics(response.data.plainLyrics);
        }
      } catch (err) {
        console.error(err);
        setError("No Lyrics for this song. Try again later.");
      }
    };
    fetchLyrics();
  }, [track, artist]);

  // Fetch track and related top tracks
  useEffect(() => {
    if (!accessToken) return;
    const fetchTrackAndRelated = async () => {
      try {
        const foundTracks = await searchTrack(accessToken, `${track} ${artist}`, 1);
        const foundTrack = foundTracks[0];
        setSpotifyTrack(foundTrack);

        const artistId = foundTrack?.artists[0]?.id;
        if (artistId) {
          const topTracks = await getTopTracks(accessToken, artistId);
          const filteredTracks = topTracks.filter(
            (t) => t.name.toLowerCase() !== track.toLowerCase()
          );
          setRelatedTracks(filteredTracks.slice(0, 5));
        }
      } catch (err) {
        console.error("Error fetching track/related:", err);
      }
    };
    fetchTrackAndRelated();
  }, [accessToken, track, artist]);

  // Check if the track is bookmarked
  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarkedLyrics") || "[]");
    const exists = bookmarks.some((b) => b.track === track && b.artist === artist);
    setIsBookmarked(exists);
  }, [track, artist]);

  const toggleBookmark = () => {
    let bookmarks = JSON.parse(localStorage.getItem("bookmarkedLyrics") || "[]");
    const exists = bookmarks.some((b) => b.track === track && b.artist === artist);

    if (exists) {
      bookmarks = bookmarks.filter((b) => !(b.track === track && b.artist === artist));
    } else {
      bookmarks.push({ track, artist });
    }

    localStorage.setItem("bookmarkedLyrics", JSON.stringify(bookmarks));
    setIsBookmarked(!exists);
  };

  return (
    <div className="appContainer">
      <Header />
      <main>
        <LyricsHeader track={track} artist={artist} isBookmarked={isBookmarked} onToggleBookmark={toggleBookmark} />

        {spotifyTrack && <SpotifyEmbed trackId={spotifyTrack.id}/>}

        <div>{error ? <p>{error}</p> : <pre className="lyrics">{lyrics}</pre>}</div>

        {relatedTracks.length > 0 && (
          <RelatedTracks tracks={relatedTracks} artist={artist} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default LyricsFetcher;
