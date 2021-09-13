import {ReactComponent as SearchIcon} from '../assets/search_black_24dp.svg'

const Search = ({ search, onSearch }) => {
  const containerStyle = {
    backgroundColor: "#FFFFFF",
    borderRadius: "50px",
    height: "2em",
    width: "40%",
    margin: "0 auto"
  }

  const iconStyle = {
    height: "20px",
    width: "20px",
    verticalAlign: "middle",
    padding: "0.2em"
  }
  
  const searchStyle = {
    border: "none",
    borderColor: "transparent",
    borderRadius: "50px",
    outline: "none",
    height: "2em",
    width: "85%",
    padding: "0.2em"
  };

  return (
    <div style={containerStyle}>
      <SearchIcon style={iconStyle} />
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