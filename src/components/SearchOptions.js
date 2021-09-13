const SearchOptions = ({ searchFilter, setSearchFilter }) => {
  return (
    <div>
      <label>
        Artist
        <input
          type="radio"
          name="searchType"
          value="artist"
          checked={searchFilter === "artist"}
          onChange={event => setSearchFilter(event.target.value)}
        />
      </label>

      <label>
        Song
        <input
          type="radio"
          name="searchType"
          value="track"
          checked={searchFilter === "track"}
          onChange={event => setSearchFilter(event.target.value)}
        />
      </label>
    </div>
  )
}

export default SearchOptions;