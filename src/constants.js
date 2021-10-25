export const SPOTIFY_API_AUTH = 'https://accounts.spotify.com/api/token';
export const SPOTIFY_API_SEARCH = 'https://api.spotify.com/v1/search?q=';
export const SPOTIFY_API_RECOMMENDATIONS = 'https://api.spotify.com/v1/recommendations?seed_'
export const SPOTIFY_API_USER_AUTH = 'https://accounts.spotify.com/authorize';
export const SPOTIFY_API_USER_PROFILE = 'https://api.spotify.com/v1/me';
export const SPOTIFY_API_USER_PLAYLIST = 'https://api.spotify.com/v1/users/';
export const SPOTIFY_API_USER_PLAYLIST_ADD = 'https://api.spotify.com/v1/playlists/';
export const BASIC_AUTH = Buffer.from(
  `${process.env.REACT_APP_SPOTIFY_CLIENT_ID}:${process.env.REACT_APP_SPOTIFY_CLIENT_SECRET}`
).toString('base64');
export const SCOPE = 'playlist-modify-private playlist-modify-public';