const Playlist = ({ playlist }) => {
  return (
    <div>
      {playlist.length ? 
        <div>
          <h4>Playlist: </h4>
          {playlist.map((item) => (
            <li key={item.id}>
              {item.name} - {item.artists[0].name}
            </li>
          ))}
        </div>
        : 
        <div></div>
      }
    </div>
  )
}

export default Playlist;