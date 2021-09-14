const Playlist = ({ playlist, searchSelection }) => {
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
    borderBottom: "1px solid #CCCCCC",
    padding: "1em",
  };

  return (
    <div>
      {playlist.length ? 
        <div>
          <h4>Here's a playlist based on: </h4>
          {searchSelection.type === "artist" ? 
            <div>
              <img src={searchSelection.images[2].url} alt="Artist profile" />
              <p>{searchSelection.name}</p>
            </div>
            :
            <div>
              <img src={searchSelection.album.images[2].url} alt="Song artwork" />
              <p>{searchSelection.name} - {searchSelection.artists[0].name}</p>
            </div>
          }
          <div style={containerStyle}>
            {playlist.map((item) => (
              <li style={listStyle} key={item.id}>
                {item.name} - {item.artists[0].name}
              </li>
            ))}
          </div>
        </div>
        : 
        <div></div>
      }
    </div>
  )
}

export default Playlist;