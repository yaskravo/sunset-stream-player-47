import { initializePlayer, playChannel, handleVideoError, handleVideoSuccess } from './player.js';
import { loadPlaylistFromUrl, loadPlaylistFromFile } from './playlist.js';
import { createChannelGrid, showError, resetVideoDisplay } from './ui.js';

let currentLanguage = 'ru';
let currentChannel = null;
let channels = [];

// DOM Elements
const video = document.getElementById('video');
const languageSelect = document.getElementById('languageSelect');
const playlistUrl = document.getElementById('playlistUrl');
const loadUrlButton = document.getElementById('loadUrl');
const fileUploadBtn = document.getElementById('fileUploadBtn');
const fileUpload = document.getElementById('fileUpload');

// Initialize player
const player = initializePlayer(video);

// Update UI text based on language
function updateUIText() {
  document.getElementById('mainTitle').textContent = translations[currentLanguage].enterPlaylist;
  document.getElementById('attention').textContent = translations[currentLanguage].attention;
  loadUrlButton.textContent = translations[currentLanguage].uploadPlaylist;
  fileUploadBtn.textContent = translations[currentLanguage].chooseFile;
}

// Handle language change
languageSelect.addEventListener('change', (e) => {
  currentLanguage = e.target.value;
  updateUIText();
  if (currentChannel && errorDisplay.style.display === 'block') {
    errorImage.src = errorImages[currentLanguage];
  }
});

// Load playlist from URL
loadUrlButton.addEventListener('click', async () => {
  const url = playlistUrl.value;
  
  try {
    channels = await loadPlaylistFromUrl(url);
    createChannelGrid(channels, playChannel);
    if (channels.length > 0) {
      playChannel(channels[0]);
    }
  } catch (error) {
    showError(error.message, currentLanguage);
  }
});

// Handle file upload
fileUploadBtn.addEventListener('click', () => {
  fileUpload.click();
});

fileUpload.addEventListener('change', async (event) => {
  const file = event.target.files?.[0];
  if (file) {
    try {
      channels = await loadPlaylistFromFile(file);
      createChannelGrid(channels, playChannel);
      if (channels.length > 0) {
        playChannel(channels[0]);
      }
    } catch (error) {
      showError(error.message, currentLanguage);
    }
  }
});

// Initialize
updateUIText();