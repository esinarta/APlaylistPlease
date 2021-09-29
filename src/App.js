import './App.css';
import React from 'react';
import axios from 'axios';
import qs from 'qs';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useMediaQuery } from 'react-responsive'

import Search from './components/Search';
import SearchOptions from './components/SearchOptions';
import SearchResult from './components/SearchResult';
import Playlist from './components/Playlist';
import PlaylistForm from './components/PlaylistForm';
import ConnectButton from './components/ConnectButton';
import AppButton from './components/AppButton';

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

let redirectUrl =   'location' in global && global['location']['host'] === 'localhost:3000'
  ? process.env.REACT_APP_SPOTIFY_REDIRECT_DEV
  : process.env.REACT_APP_SPOTIFY_REDIRECT_PROD;

let userAuthUrl = SPOTIFY_API_USER_AUTH;
userAuthUrl += '?response_type=token';
userAuthUrl += '&client_id=' + encodeURIComponent(process.env.REACT_APP_SPOTIFY_CLIENT_ID);
userAuthUrl += '&scope=' + encodeURIComponent(scope);
userAuthUrl += '&redirect_uri=' + encodeURIComponent(redirectUrl);

const App = () => {
  const [spotifyToken, setSpotifyToken] = React.useState('');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchFilter, setSearchFilter] = React.useState("artist");
  const [searchResults, setSearchResults] = React.useState([]);
  const [searchSelection, setSearchSelection] = React.useState({});
  const [playlist, setPlaylist] = React.useState([]);
  const [userToken, setUserToken] = React.useState('');
  const [userId, setUserId] = React.useState('');
  const [playlistName, setPlaylistName] = React.useState('');
  const [playlistDesc, setPlaylistDesc] = React.useState('');
  const [playlistPublic, setPlaylistPublic] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [playlistSaveSuccess, setPlaylistSaveSuccess] = React.useState(false);
  
  const isPortrait = useMediaQuery({ orientation: 'portrait' });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setPlaylistSaveSuccess(false);
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isPortrait ? "90%" : "50%",
    padding: '2%',
    bgcolor: '#444',
    borderRadius: '25px',
    boxShadow: 12,
    textAlign: "center"
  };

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

  const handleSearch = event => {
    setSearchTerm(event.target.value);
    if (searchTerm) {
      axios({
        method: 'get',
        url: `${SPOTIFY_API_SEARCH}${searchTerm}&type=${searchFilter}`,
        headers: {
          'Accept': 'application/json', 
          'Authorization': `Bearer ${spotifyToken}`,
          'Content-Type': 'application/json',
        }
      }).then((res) => {
        if (res.data.artists) {
          setSearchResults([...res.data.artists.items])
        } else { 
          setSearchResults([...res.data.tracks.items]);
        }
      });
    }
  }

  const handleSearchSelection = (result) => {
    setSearchTerm("");
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
      setPlaylist([...res.data.tracks]);
    });
  }

  const spotifyLogin = () => {
    const popup = window.open(
      userAuthUrl, 
      'Login with Spotify', 
      'width=400, height=500'
    );
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
    // const popup = window.open(userAuthUrl, 'Login with Spotify', 'width=400, height=500');
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
      console.log(res);
      setPlaylistSaveSuccess(true);
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
      <ConnectButton 
        // link={userAuthUrl}
        onClick={spotifyLogin} 
      />

      <h1>A Playlist, Please.</h1>

      <p>Search for an artist or song to create a playlist of recommended tracks.</p>

      <Search onSearch={handleSearch}/>
      <SearchOptions 
        searchFilter={searchFilter} 
        setSearchFilter={setSearchFilter}
      />

      {searchTerm && searchResults ?
        <SearchResult 
          searchResults={searchResults} 
          handleSearchSelection={handleSearchSelection}
          searchSelection={searchSelection}
          setSearchSelection={setSearchSelection}
        />
        :
        null
      }

      <Playlist
        playlist={playlist}
        searchSelection={searchSelection}
      />
      <br/>

    {playlist.length && userToken ?
      <div>
        <AppButton
          text="Save Playlist"
          onClick={handleOpen}
        />
        <Modal
          open={open}
          onClose={handleClose}
        >
          <Box sx={modalStyle}>
            {playlistSaveSuccess ?
              <div>
                Playlist saved successfully.
              </div>
              :
              <div>
                <PlaylistForm
                  playListName={playlistName}
                  playlistDesc={playlistDesc}
                  playlistPublic={playlistPublic}
                  setPlaylistPublic={setPlaylistPublic}
                  handlePlaylistNameInput={handlePlaylistNameInput}
                  handlePlaylistDescInput={handlePlaylistDescInput}
                />

                <AppButton
                  text="Save Playlist"
                  onClick={() => savePlaylist(playlistName, playlistDesc, playlistPublic)}
                />
              </div>
            }
          </Box>
        </Modal>
      </div>
      :
      null
    }
      
    </div>
  );
}

export default App;
