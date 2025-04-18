import axios from "axios";

export const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
export const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

export const fetchAccessToken = async () => {
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    new URLSearchParams({ grant_type: "client_credentials" }),
    {
      headers: {
        Authorization: "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return response.data.access_token;
};

export const searchTrack = async (accessToken, query, limit = 1, offset = 0) => {
  const response = await axios.get("https://api.spotify.com/v1/search", {
    headers: { Authorization: `Bearer ${accessToken}` },
    params: {
      q: query,
      type: "track",
      limit,
      offset,
    },
  });
  return response.data.tracks.items;
};

export const getTopTracks = async (accessToken, artistId) => {
  const response = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/top-tracks`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    params: { market: "US" },
  });
  return response.data.tracks;
};