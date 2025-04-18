const SongSearchInput = ({ value, onChange }) => (
  <input
    type="text"
    placeholder="Search song or artist"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="searchInput"
  />
);
  export default SongSearchInput;
  