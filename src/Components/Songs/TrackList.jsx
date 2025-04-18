import TrackCard from "./TrackCard";

const TrackList = ({ tracks }) => (
  <ul>
    {tracks.map((track, index) => (
      <TrackCard key={index} track={track} />
    ))}
  </ul>
);
export default TrackList;
