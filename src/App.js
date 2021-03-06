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

import {
  SPOTIFY_API_AUTH,
  SPOTIFY_API_SEARCH,
  SPOTIFY_API_RECOMMENDATIONS,
  SPOTIFY_API_USER_AUTH,
  SPOTIFY_API_USER_PROFILE,
  SPOTIFY_API_USER_PLAYLIST,
  SPOTIFY_API_USER_PLAYLIST_ADD,
  BASIC_AUTH,
  SCOPE
} from './constants'

let redirectUrl =   'location' in global && global['location']['host'] === 'localhost:3000'
  ? process.env.REACT_APP_SPOTIFY_REDIRECT_DEV
  : process.env.REACT_APP_SPOTIFY_REDIRECT_PROD;

let userAuthUrl = SPOTIFY_API_USER_AUTH;
userAuthUrl += '?response_type=token';
userAuthUrl += '&client_id=' + encodeURIComponent(process.env.REACT_APP_SPOTIFY_CLIENT_ID);
userAuthUrl += '&scope=' + encodeURIComponent(SCOPE);
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
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [playlistSaveSuccess, setPlaylistSaveSuccess] = React.useState(false);
  
  const isPortrait = useMediaQuery({ orientation: 'portrait' });

  const handleModalOpen = () => setIsModalOpen(true);
  
  const handleModalClose = () => {
    setIsModalOpen(false);
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

  React.useEffect(() => {
    axios({
      method: 'post',
      url: SPOTIFY_API_AUTH,
      headers: {
        'Authorization': `Basic ${BASIC_AUTH}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify({ 'grant_type': 'client_credentials' })
    }).then((res) => {
      setSpotifyToken(res.data.access_token);
    });
  }, []);

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

  // Function modified from Spotify API example:
  // https://github.com/spotify/web-api-auth-examples/blob/master/implicit_grant/public/index.html
  const getHashParams = () => {
    const hashParams = {};
    const r = /([^&;=]+)=?([^&;]*)/g;
    const q = window.location.hash.substring(1);
    let e = r;

    while ((e = r.exec(q)) !== null) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  let params = getHashParams();

  React.useEffect(() => {
    setUserToken(params.access_token);
  }, [params.access_token]);

  const getUserId = React.useCallback(async () => {
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
    if (userToken) {
      getUserId().then((data) => {
        setUserId(data.id);
      });
    }
  }, [getUserId, userToken]);

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
      <ConnectButton link={userAuthUrl} />

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
          onClick={handleModalOpen}
        />
        <Modal
          open={isModalOpen}
          onClose={handleModalClose}
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
