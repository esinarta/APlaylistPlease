const SearchResult = ({ searchResults, handleSearchSelection }) => {
  return (
    <div>
      {searchResults.length ? 
        <div>
          <h4>Search Results: </h4>
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
        <div></div>
      }
    </div>
  )
}

export default SearchResult;