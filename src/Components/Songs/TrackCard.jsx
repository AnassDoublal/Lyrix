import { Link } from "react-router-dom";

const TrackCard = ({ track }) => (
  <li>
    <Link
      to={`/lyrics/${encodeURIComponent(track.name)}/${encodeURIComponent(
        track.artists[0]?.name || ""
      )}`}
    >
      <p className="songs_songTitle">
        {track.name} - {track.artists.map((a) => a.name).join(", ")}
      </p>
      {track.album?.images[0]?.url && (
        <img
          src={track.album.images[0].url}
          alt={track.name}
          width="300"
        />
      )}
    </Link>
  </li>
);

export default TrackCard;
