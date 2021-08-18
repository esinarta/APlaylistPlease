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
  const [searchFilter, setSearchFilter] = React.useState("artist");
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

  React.useEffect(() => {
    axios({
      method: 'get',
      url,
      headers: {
        'Accept': 'application/json', 
        'Authorization': `Bearer ${spotifyToken}`,
        'Content-Type': 'application/json',
      }
    }).then((res) => {
      console.log(res.data);
      return res.data;
    })
  }, [url, spotifyToken]);

  const handleSearchInput = event => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = event => {
    setUrl(`${SPOTIFY_API_SEARCH}${searchTerm}&type=${searchFilter}`);
  };

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

export default App;
