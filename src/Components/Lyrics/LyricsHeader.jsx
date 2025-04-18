const LyricsHeader = ({ track, artist, isBookmarked, onToggleBookmark }) => (
    <div className="lyrics_subheader">
      <h1 className="title">
        {track} by {artist}
      </h1>
      <button className="btn" onClick={onToggleBookmark}>
        {isBookmarked ? "Remove from saved lyrics" : "Save Lyrics"}
      </button>
    </div>
);

export default LyricsHeader;
