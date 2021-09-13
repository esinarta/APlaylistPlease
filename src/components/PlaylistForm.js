const PlaylistForm = (props) => {
  return (
    <div>
      <div>
        <label htmlFor="search">Playlist Name: </label>
        <input 
          id="playlistName" 
          type="text" 
          value={props.playListName} 
          onChange={props.handlePlaylistNameInput}
        />
      </div>
      <div>
        <label htmlFor="search">Playlist Description: </label>
        <input 
          id="playlistDesc" 
          type="text" 
          value={props.playlistDesc} 
          onChange={props.handlePlaylistDescInput}
        />
      </div>
      <div>
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