const SearchResult = ({ searchResults, handleSearchSelection }) => {
  return (
    <div>
      <h4>Search Results: </h4>
      {searchResults.length ? 
        <div>
          {searchResults.map((result) => (
            <li
              key={result.id}
              onClick={() => handleSearchSelection(result)}
            >
              {result.name}
            </li>
          ))}
        </div>
        : 
        <div>No results</div>
      }
    </div>
  )
}

export default SearchResult;