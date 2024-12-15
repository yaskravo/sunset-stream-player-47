let currentLanguage = 'ru';
let currentChannel = null;
let channels = [];

// DOM Elements
const video = document.getElementById('video');
const errorDisplay = document.getElementById('errorDisplay');
const errorImage = document.getElementById('errorImage');
const noVideoMessage = document.getElementById('noVideoMessage');
const channelGrid = document.getElementById('channelGrid');
const languageSelect = document.getElementById('languageSelect');
const playlistUrl = document.getElementById('playlistUrl');
const loadUrlButton = document.getElementById('loadUrl');
const fileUploadBtn = document.getElementById('fileUploadBtn');
const fileUpload = document.getElementById('fileUpload');

// Initialize HLS
const hls = new Hls();

// Error Images
const errorImages = {
  ru: '/lovable-uploads/44b54521-b4e1-4efe-8309-dfbbdd44de8e.png',
  uk: '/lovable-uploads/d4a00480-15ef-43ab-b3cd-d8973a866013.png',
  kk: '/lovable-uploads/28c2baf1-4c69-4ade-91f7-40ed1631c0d5.png',
  uz: '/lovable-uploads/b3a306eb-67d4-44f5-bff7-524f04f00218.png'
};

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
});

// Parse M3U content
function parseM3UContent(content) {
  const lines = content.split('\n');
  const channels = [];
  let currentChannel = {};

  lines.forEach((line) => {
    if (line.startsWith('#EXTINF:')) {
      const nameMatch = line.match(/tvg-name="([^"]*)"/) || line.match(/,(.+)$/);
      const logoMatch = line.match(/tvg-logo="([^"]*)"/);
      
      currentChannel.name = nameMatch ? nameMatch[1] : 'Unknown Channel';
      currentChannel.logo = logoMatch ? logoMatch[1] : undefined;
    } else if (line.trim().startsWith('http')) {
      currentChannel.url = line.trim();
      if (currentChannel.url && currentChannel.name) {
        channels.push({...currentChannel});
      }
      currentChannel = {};
    }
  });

  return channels;
}

// Handle video errors
function handleVideoError() {
  video.style.display = 'none';
  noVideoMessage.style.display = 'none';
  errorDisplay.style.display = 'block';
  errorImage.src = errorImages[currentLanguage];
}

// Handle video success
function handleVideoSuccess() {
  video.style.display = 'block';
  errorDisplay.style.display = 'none';
  noVideoMessage.style.display = 'none';
}

// Play channel
function playChannel(channel) {
  currentChannel = channel;
  
  // Reset video display
  video.style.display = 'none';
  errorDisplay.style.display = 'none';
  noVideoMessage.style.display = 'none';

  // Update active channel in grid
  document.querySelectorAll('.channel-button').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.url === channel.url) {
      btn.classList.add('active');
    }
  });

  if (Hls.isSupported()) {
    hls.loadSource(channel.url);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      handleVideoSuccess();
      video.play().catch(handleVideoError);
    });
    hls.on(Hls.Events.ERROR, (event, data) => {
      if (data.fatal) {
        handleVideoError();
      }
    });
  }
}

// Create channel grid
function createChannelGrid(channels) {
  channelGrid.innerHTML = '';
  channels.forEach(channel => {
    const channelButton = document.createElement('button');
    channelButton.className = 'channel-button p-4 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors';
    channelButton.dataset.url = channel.url;
    
    const content = `
      ${channel.logo ? `
        <div class="w-16 h-16 mx-auto mb-2 overflow-hidden">
          <img src="${channel.logo}" alt="${channel.name}" class="channel-logo">
        </div>
      ` : ''}
      <p class="text-sm text-center truncate">${channel.name}</p>
    `;
    
    channelButton.innerHTML = content;
    channelButton.addEventListener('click', () => playChannel(channel));
    channelGrid.appendChild(channelButton);
  });
}

// Load playlist from URL
loadUrlButton.addEventListener('click', async () => {
  const url = playlistUrl.value;
  if (!url.includes('stream.sunset-media.ru')) {
    alert(translations[currentLanguage].invalidUrl);
    return;
  }

  try {
    const response = await fetch(url);
    const content = await response.text();
    channels = parseM3UContent(content);
    createChannelGrid(channels);
    if (channels.length > 0) {
      playChannel(channels[0]);
    }
  } catch (error) {
    alert('Error loading playlist');
  }
});

// Handle file upload
fileUploadBtn.addEventListener('click', () => {
  fileUpload.click();
});

fileUpload.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      if (!content.includes('stream.sunset-media.ru')) {
        alert(translations[currentLanguage].invalidUrl);
        return;
      }
      channels = parseM3UContent(content);
      createChannelGrid(channels);
      if (channels.length > 0) {
        playChannel(channels[0]);
      }
    };
    reader.readAsText(file);
  }
});

// Initialize
updateUIText();