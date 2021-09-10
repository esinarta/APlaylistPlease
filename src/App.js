import './App.css';
import React from 'react';
import axios from 'axios';
import qs from 'qs';

const SPOTIFY_API_AUTH = 'https://accounts.spotify.com/api/token';
const SPOTIFY_API_SEARCH = 'https://api.spotify.com/v1/search?q=';
const SPOTIFY_API_RECOMMENDATIONS = 'https://api.spotify.com/v1/recommendations?seed_'
const SPOTIFY_API_USER_AUTH = 'https://accounts.spotify.com/authorize';
const SPOTIFY_API_USER_PROFILE = 'https://api.spotify.com/v1/me';
const SPOTIFY_API_USER_PLAYLIST = 'https://api.spotify.com/v1/users/';
const SPOTIFY_API_USER_PLAYLIST_ADD = 'https://api.spotify.com/v1/playlists/';
const BASIC_AUTH = Buffer.from(
  `${process.env.REACT_APP_SPOTIFY_CLIENT_ID}:${process.env.REACT_APP_SPOTIFY_CLIENT_SECRET}`
).toString('base64');
const scope = 'playlist-modify-private playlist-modify-public';

let userAuthUrl = SPOTIFY_API_USER_AUTH;
userAuthUrl += '?response_type=token';
userAuthUrl += '&client_id=' + encodeURIComponent(process.env.REACT_APP_SPOTIFY_CLIENT_ID);
userAuthUrl += '&scope=' + encodeURIComponent(scope);
userAuthUrl += '&redirect_uri=' + encodeURIComponent(process.env.REACT_APP_SPOTIFY_REDIRECT);

const App = () => {
  const [spotifyToken, setSpotifyToken] = React.useState('');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchFilter, setSearchFilter] = React.useState("artist");
  const [searchResults, setSearchResults] = React.useState([]);
  const [playlist, setPlaylist] = React.useState([]);
  const [userToken, setUserToken] = React.useState('');
  const [userId, setUserId] = React.useState('');
  const [playlistName, setPlaylistName] = React.useState('');
  const [playlistDesc, setPlaylistDesc] = React.useState('');
  const [playlistPublic, setPlaylistPublic] = React.useState(true);

  const getSpotifyToken = async () => {
    const res = await axios({
      method: 'post',
      url: SPOTIFY_API_AUTH,
      headers: {
        'Authorization': `Basic ${BASIC_AUTH}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify({ 'grant_type': 'client_credentials' })
    });
    return res.data;
  }

  React.useEffect(() => {
    if (spotifyToken === "") {
      getSpotifyToken().then((data) => {
        setSpotifyToken(data.access_token);
      });
    }
  }, [spotifyToken]);

  const handleSearchInput = event => {
    setSearchTerm(event.target.value);
  }

  const handleSearchSubmit = () => {
    axios({
      method: 'get',
      url: `${SPOTIFY_API_SEARCH}${searchTerm}&type=${searchFilter}`,
      headers: {
        'Accept': 'application/json', 
        'Authorization': `Bearer ${spotifyToken}`,
        'Content-Type': 'application/json',
      }
    }).then((res) => {
      console.log(res.data);
      if (res.data.artists) {
        setSearchResults([...res.data.artists.items])
      } else { 
        setSearchResults([...res.data.tracks.items]);
      }
    });
  }

  const handleSearchSelection = (result) => {
    console.log(result.id);
    getRecommendations(result.id);
  }

  const getRecommendations = (id) => {
    axios({
      method: 'get',
      url: `${SPOTIFY_API_RECOMMENDATIONS}${searchFilter}s=${id}`,
      headers: {
        'Accept': 'application/json', 
        'Authorization': `Bearer ${spotifyToken}`,
        'Content-Type': 'application/json',
      }
    }).then((res) => {
      console.log(res.data);
      setPlaylist([...res.data.tracks]);
    });
  }

  // Function taken from Spotify API example:
  // https://github.com/spotify/web-api-auth-examples/blob/master/implicit_grant/public/index.html
  const getHashParams = () => {
    let hashParams = {};
    let e, r = /([^&;=]+)=?([^&;]*)/g, q = window.location.hash.substring(1);
    while (e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  let params = getHashParams();

  React.useEffect(() => {
    if (userToken === "") {
      setUserToken(params.access_token);
    }
  }, [userToken, params.access_token]);

  const getUserId = React.useCallback(async () => {
      const res =await axios({
        method: 'get',
        url: `${SPOTIFY_API_USER_PROFILE}`,
        headers: {
          'Accept': 'application/json', 
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        }
      })
      return res.data;
    }, [userToken]);

  React.useEffect(() => {
    if (userId === "" && userToken) {
      getUserId().then((data) => {
        setUserId(data.id);
      });
    }
  }, [userId, getUserId, userToken]);

  const savePlaylist = (playlistName, playlistDesc, playlistPublic) => {
    axios({
      method: 'post',
      url: `${SPOTIFY_API_USER_PLAYLIST}${userId}/playlists`,
      headers: {
        'Accept': 'application/json', 
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({ 
        'name': playlistName,
        'description': playlistDesc,
        'public': playlistPublic,
      })
    }).then((res) => {
      let playlistId = res.data.id;
      let trackUrisArray = [];

      playlist.forEach((track) => {
        trackUrisArray.push(track.uri);
      });

      let trackUrisObj = {
        uris: trackUrisArray,
      }

      addTracksToPlaylist(playlistId, trackUrisObj);
    });
  }

  const addTracksToPlaylist = (playlistId, trackUris) => {
    axios({
      method: 'post',
      url: `${SPOTIFY_API_USER_PLAYLIST_ADD}${playlistId}/tracks`,
      headers: {
        'Accept': 'application/json', 
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(trackUris),
    }).then((res) => {
      console.log(res.data);
    });
  }

  const handlePlaylistNameInput = event => {
    setPlaylistName(event.target.value);
  }

  const handlePlaylistDescInput = event => {
    setPlaylistDesc(event.target.value);
  }

  return (
    <div className="App">
      <Search onSearch={handleSearchInput}/>
      <SearchOptions 
        searchFilter={searchFilter} 
        setSearchFilter={setSearchFilter}
      />

      <button
        type="button"
        disabled={!searchTerm}
        onClick={handleSearchSubmit}
      >
        Submit
      </button>

      <SearchResult 
        searchResults={searchResults} 
        handleSearchSelection={handleSearchSelection}
      />

      <Playlist
        playlist={playlist}
      />
      <br/>

    { playlist.length && userToken ?
      <div>
        <PlaylistForm
          playListName={playlistName}
          playlistDesc={playlistDesc}
          playlistPublic={playlistPublic}
          setPlaylistPublic={setPlaylistPublic}
          handlePlaylistNameInput={handlePlaylistNameInput}
          handlePlaylistDescInput={handlePlaylistDescInput}
        />
        <button
        onClick={() => savePlaylist(playlistName, playlistDesc, playlistPublic)}
        >
          Save Playlist
        </button>
      </div>
      :
      <div></div>
    }

    <br/>
    <a
      href={userAuthUrl}
    >
      Connect to Spotify
    </a>
      
    </div>
  );
}

const Search = ({ search, onSearch }) => {
  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input 
        id="search" 
        type="text" 
        value={search} 
        onChange={onSearch} 
      />
    </div>
  )
}

const SearchOptions = ({ searchFilter, setSearchFilter }) => {
  return (
    <div>
      <label>
        Artist
        <input
          type="radio"
          name="searchType"
          value="artist"
          checked={searchFilter === "artist"}
          onChange={event => setSearchFilter(event.target.value)}
        />
      </label>

      <label>
        Track
        <input
          type="radio"
          name="searchType"
          value="track"
          checked={searchFilter === "track"}
          onChange={event => setSearchFilter(event.target.value)}
        />
      </label>
    </div>
  )
}

const SearchResult = ({ searchResults, handleSearchSelection }) => {
  return (
    <div>
      <h4>Search Results: </h4>
      {searchResults.length ? 
        <div>
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
        <div>No results</div>
      }
    </div>
  )
}

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

export default App;
