import SpotifyWebApi from 'spotify-web-api-node';

const scopes = [
    "user-read-private", 
    "user-read-email",
    "streaming",
    "playlist-read-private",
    "playlist-read-collaborative",
    "playlist-modify-public",
	"playlist-modify-private",
    "user-library-read",
    "user-library-modify",
    "user-top-read",
    "user-follow-read",
    "user-modify-playback-state",
    "user-read-playback-state",
    "user-read-currently-playing",
    "user-read-recently-state",
].join(',');

const params = {
    scope: scopes,
},

queryParamString = new URLSearchParams(params);

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEX_PUBLIC_CLIENT_ID, 
    clientSecret: process.env.NEX_PUBLIC_CLIENT_SECRET, 
});

export default spotifyApi;

export {LOGIN_URL}
