import './SearchResult.css'
import { useMediaQuery } from 'react-responsive'

const SearchResult = ({ searchResults, handleSearchSelection, searchSelection, setSearchSelection }) => {
  const isPortrait = useMediaQuery({ orientation: 'portrait' });
  
  const containerStyle = {
    width: isPortrait ? "80%" : "40%",
    backgroundColor: "white",
    color: "black",
    margin: "0 auto",
    borderRadius: "20px",
    overflow: "hidden"
  };
  
  const listStyle = {
    listStyleType: "none",
    textAlign: "left",
    borderBottom: "1px solid #CCCCCC",
    padding: "1em",
  };

  return (
    <div style={containerStyle}>
      {searchResults.length ? 
        <div>
          {searchResults.slice(0,5).map((result) => (
            <li
              className="resultItem"
              style={listStyle}
              key={result.id}
              onClick={() => {
                  handleSearchSelection(result);
                  setSearchSelection(result);
                }
              }
            >
              {result.type === "artist" ?
                <p>{result.name}</p>
                :
                <p>{result.name} - {result.artists[0].name}</p>
              }
            </li>
          ))}
        </div>
        : 
        null
      }
    </div>
  )
}

export default SearchResult;