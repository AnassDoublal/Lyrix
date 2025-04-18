const SpotifyEmbed = ({ trackId }) => (
    <iframe
      src={`https://open.spotify.com/embed/track/${trackId}`}
      width="40%"
      height="80"
      frameBorder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    ></iframe>
);

export default SpotifyEmbed;
