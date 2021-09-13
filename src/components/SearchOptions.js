const SearchOptions = ({ searchFilter, setSearchFilter }) => {
  const style = {
    padding: "1rem",
  }
  
  return (
    <div style={style}>
      <label style={style}>
        Artist
        <input
          type="radio"
          name="searchType"
          value="artist"
          checked={searchFilter === "artist"}
          onChange={event => setSearchFilter(event.target.value)}
        />
      </label>

      <label style={style}>
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