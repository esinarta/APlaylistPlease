import './App.css';
import React from 'react';
import axios from 'axios';
import qs from 'qs';

const SPOTIFY_API_AUTH = 'https://accounts.spotify.com/api/token';
const SPOTIFY_API_SEARCH = 'https://api.spotify.com/v1/search?q=';
const BASIC_AUTH = Buffer.from(
  `${process.env.REACT_APP_SPOTIFY_CLIENT_ID}:${process.env.REACT_APP_SPOTIFY_CLIENT_SECRET}`
).toString('base64');

const App = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [url, setUrl] = React.useState(
    `${SPOTIFY_API_SEARCH}${searchTerm}`
  );
  const [spotifyToken, setSpotifyToken] = React.useState('');

  const getSpotifyToken = () => {
    return axios({
      method: 'post',
      url: SPOTIFY_API_AUTH,
      headers: { 
        'Authorization': `Basic ${BASIC_AUTH}`, 
        'Content-Type': 'application/x-www-form-urlencoded', 
      },
      data : qs.stringify({'grant_type': 'client_credentials'})
    }).then((res) => {
      return res.data;
    })
  }

  React.useEffect(() => {
    if (spotifyToken === "") {
      getSpotifyToken().then((data) => {
        setSpotifyToken(data.access_token);
      });
    }
  }, [spotifyToken]);

  const handleFetchSearch= React.useCallback(() => {
    axios({
      method: 'get',
      url,
      headers: {
        'Accept': 'application/json', 
        'Authorization': `Bearer ${spotifyToken}`,
        'Content-Type': 'application/json',
      }
    }).then((res) => {
      return res.data;
    })
  }, [url, spotifyToken]);

  React.useEffect(() => {
    handleFetchSearch();
  }, [handleFetchSearch]);

  const handleSearchInput = event => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    setUrl(`${SPOTIFY_API_SEARCH}${searchTerm}&type=artist`);
  };

  return (
    <div className="App">
      <Search onSearch={handleSearchInput}/>
      <button
        type="button"
        disabled={!searchTerm}
        onClick={handleSearchSubmit}
      >
        Submit
      </button>
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

export default App;
