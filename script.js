const clientId = "645cd41a0c414d5da3602517bea85307"; // Replace with your Spotify Client ID
const redirectUri = "https://devil-king.github.io/Spotifyclone"; // Adjust this according to your GitHub Pages URL
const scopes = "user-read-private user-read-email playlist-read-private";

document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("login-button");
  if (loginButton) {
    loginButton.addEventListener("click", () => {
      const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&scope=${encodeURIComponent(scopes)}`;
      window.location.href = url;
    });
  }

  const params = new URLSearchParams(window.location.hash.substring(1));
  const accessToken = params.get("access_token");
  if (accessToken) {
    console.log("Access token:", accessToken);
    fetchUserInfo(accessToken);
    fetchPlaylists(accessToken);
  }

  const searchLink = document.getElementById("search-link");
  if (searchLink) {
    searchLink.addEventListener("click", () => {
      const searchInput = document.getElementById("search-input").value;
      if (searchInput) {
        searchMusic(accessToken, searchInput);
      }
    });
  }
});

function fetchUserInfo(accessToken) {
  fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("User info:", data);
      const userInfoDiv = document.getElementById("user-info");
      userInfoDiv.innerHTML = `<h2>Welcome, ${data.display_name}</h2>`;
    })
    .catch((error) => console.error("Error fetching user info:", error));
}

function fetchPlaylists(accessToken) {
  fetch("https://api.spotify.com/v1/me/playlists", {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Playlists:", data);
      const playlistsDiv = document.getElementById("playlists");
      playlistsDiv.innerHTML = "<h3>Your Playlists</h3>";
      data.items.forEach((playlist) => {
        const playlistElement = document.createElement("div");
        playlistElement.innerHTML = `
        <h4>${playlist.name}</h4>
        <img src="${playlist.images[0].url}" alt="${playlist.name}" width="200">
      `;
        playlistsDiv.appendChild(playlistElement);
      });
    })
    .catch((error) => console.error("Error fetching playlists:", error));
}

function searchMusic(accessToken, query) {
  fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Search results:", data);
      const playlistsDiv = document.getElementById("playlists");
      playlistsDiv.innerHTML = "<h3>Search Results</h3>";
      data.tracks.items.forEach((track) => {
        const trackElement = document.createElement("div");
        trackElement.innerHTML = `
        <h4>${track.name} by ${track.artists
          .map((artist) => artist.name)
          .join(", ")}</h4>
        <img src="${track.album.images[0].url}" alt="${track.name}" width="200">
      `;
        playlistsDiv.appendChild(trackElement);
      });
    })
    .catch((error) => console.error("Error searching music:", error));
}
