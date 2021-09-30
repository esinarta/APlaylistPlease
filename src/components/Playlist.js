import { useMediaQuery } from 'react-responsive'

const Playlist = ({ playlist, searchSelection }) => {
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
    <div>
      {playlist.length ? 
        <div>
          <h4>Here's a playlist based on: </h4>
          {searchSelection.type === "artist" ? 
            <div>
              {searchSelection.images[2] ? 
                <img src={searchSelection.images[2].url} alt="Artist profile" />
                :
                null
              }
              <p>{searchSelection.name}</p>
            </div>
            :
            <div>
              {searchSelection.album.images[2] ?
                <img src={searchSelection.album.images[2].url} alt="Song artwork" />
                :
                null
              }
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
        null
      }
      {!playlist.length && searchSelection.type ?
        <div style={{marginTop: "5%"}}>
          Sorry, there are no recommendations for this {searchSelection.type}.
        </div>
        :
        null
      }
    </div>
  )
}

export default Playlist;