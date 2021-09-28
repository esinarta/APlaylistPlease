import { useMediaQuery } from 'react-responsive'

const Search = ({ search, onSearch }) => {
  const isPortrait = useMediaQuery({ orientation: 'portrait' });

  const searchStyle = {
    border: "none",
    borderColor: "transparent",
    borderRadius: "50px",
    outline: "none",
    height: "2em",
    width: isPortrait ? "80%" : "50%",
    padding: "0.2em 1.5em 0.2em 1.5em",
  };

  return (
    <div>
      <input 
        style={searchStyle}
        id="search" 
        type="text" 
        value={search} 
        onChange={onSearch} 
      />
    </div>
  )
}

export default Search;