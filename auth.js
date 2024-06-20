// Define your client ID, redirect URI, and scopes
const clientId = '645cd41a0c414d5da3602517bea85307';
const redirectUri = 'https://bishal-sarkar-admin.github.io/Spotifyclone/';
const scopes = 'user-read-private user-read-email';

// Construct the authorization URL
const authorizeUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectUri)}`;

// Function to redirect user to the authorization URL
function authorize() {
  window.location.href = authorizeUrl;
}

// Event listener to initiate authorization on button click
document.getElementById('authorize-button').addEventListener('click', authorize);
