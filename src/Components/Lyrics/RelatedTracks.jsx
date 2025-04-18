import { Link } from "react-router-dom";

const RelatedTracks = ({ tracks, artist }) => (
    <div>
      <h2 className="recommendationHeader">More by {artist}:</h2>
      <ul>
        {tracks.map((rec, i) => (
          <li key={i}>
            <Link
              to={`/lyrics/${encodeURIComponent(rec.name)}/${encodeURIComponent(
                artist || ""
              )}`}
            >
              <div className="recommendationTitle">{rec.name}</div>
              <div>
                <img src={rec.album.images[0].url} alt={rec.name} width="300" />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

export default RelatedTracks;
