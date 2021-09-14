import './SearchResult.css'

const SearchResult = ({ searchResults, handleSearchSelection }) => {
  const containerStyle = {
    width: "40%",
    backgroundColor: "white",
    color: "black",
    margin: "0 auto",
    borderRadius: "20px",
    overflow: "hidden"
  };
  
  const listStyle = {
    listStyleType: "none",
    textAlign: "left",
    borderBottom: "1px solid #CCC",
    padding: "1em",
  };

  return (
    <div style={containerStyle}>
      {searchResults.length ? 
        <div>
          {searchResults.map((result) => (
            <li
              className="resultItem"
              style={listStyle}
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