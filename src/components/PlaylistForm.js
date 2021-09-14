const PlaylistForm = (props) => {
  const containerStyle = {
    width: "40%",
    margin: "0 auto"
  }

  const labelStyle = {
    padding: "0.5em"
  }
  
  const inputStyle = {
    border: "none",
    borderRadius: "50px",
    outline: "none",
    padding: "0.8em",
  }

  const radioStyle = {
    padding: "1em",
  }

  return (
    <div style={containerStyle}>
      <div style={labelStyle}>
        <label style={labelStyle} htmlFor="search">Playlist Name: </label>
        <input 
          style={inputStyle}
          id="playlistName" 
          type="text" 
          value={props.playListName} 
          onChange={props.handlePlaylistNameInput}
        />
      </div>
      <div style={labelStyle}>
        <label style={labelStyle} htmlFor="search">Playlist Description: </label>
        <input 
          style={inputStyle}
          id="playlistDesc" 
          type="text" 
          value={props.playlistDesc} 
          onChange={props.handlePlaylistDescInput}
        />
      </div>
      <div style={radioStyle}>
        <label>
          Public
          <input
            type="radio"
            name="playlistPublic"
            value="public"
            checked={props.playlistPublic}
            onChange={event => props.setPlaylistPublic(event.target.value)}
          />
        </label>

        <label>
          Private
          <input
            type="radio"
            name="playlistPublic"
            value="private"
            checked={!props.playlistPublic}
            onChange={event => props.setPlaylistPublic(!event.target.value)}
          />
        </label>
      </div>
    </div>
  )
}

export default PlaylistForm;