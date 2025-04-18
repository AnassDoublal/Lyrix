import BookmarkItem from "./BookmarkItem";

const BookmarkList = ({ bookmarks, trackData, onRemove }) => (
    <ul>
      {bookmarks.map(({ track, artist }, index) => {
        const key = `${track}_${artist}`;
        const image = trackData[key]?.image;
  
        return (
          <BookmarkItem
            key={index}
            track={track}
            artist={artist}
            image={image}
            onRemove={() => onRemove(track, artist)}
          />
        );
      })}
    </ul>
  );

export default BookmarkList;