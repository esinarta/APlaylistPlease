import './App.css';
import React from 'react';
import axios from 'axios';
import qs from 'qs';

import Search from './components/Search';
import SearchOptions from './components/SearchOptions';
import SearchResult from './components/SearchResult';
import Playlist from './components/Playlist';
import PlaylistForm from './components/PlaylistForm';
import ConnectButton from './components/ConnectButton';

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
    // const popup = window.open(userAuthUrl, 'Login with Spotify', 'width=800, height=600');
    const res =await axios({
      method: 'get',
      url: `${SPOTIFY_API_USER_PROFILE}`,
      headers: {
        'Accept': 'application/json', 
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      }
    });
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
      <ConnectButton link={userAuthUrl} />

      <h1>A Playlist, Please.</h1>

      <p>Search for an artist or song to create a playlist of recommended tracks.</p>

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
      
    </div>
  );
}

export default App;
