import { Link } from "react-router-dom";

const BookmarkItem = ({ track, artist, image, onRemove }) => (
    <li>
      <div>
        <Link to={`/lyrics/${encodeURIComponent(track)}/${encodeURIComponent(artist)}`}>
          <p className="songs_songTitle">
            {track} — {artist}
          </p>
          {image && <img src={image} alt={`${track} album`} width="300" />}
        </Link>
      </div>
      <button className="btn removeBtn" onClick={onRemove}>
        Remove
      </button>
    </li>
  );

export default BookmarkItem;