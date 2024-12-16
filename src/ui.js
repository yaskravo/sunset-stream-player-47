export function createChannelGrid(channels, onChannelSelect) {
  const channelGrid = document.getElementById('channelGrid');
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
    channelButton.addEventListener('click', () => onChannelSelect(channel));
    channelGrid.appendChild(channelButton);
  });
}

export function showError(message, currentLanguage) {
  const errorDisplay = document.getElementById('errorDisplay');
  const errorImage = document.getElementById('errorImage');
  
  errorDisplay.style.display = 'block';
  errorImage.src = errorImages[currentLanguage];
  
  console.error(message);
}

export function resetVideoDisplay() {
  const video = document.getElementById('video');
  const errorDisplay = document.getElementById('errorDisplay');
  const noVideoMessage = document.getElementById('noVideoMessage');
  
  video.style.display = 'none';
  errorDisplay.style.display = 'none';
  noVideoMessage.style.display = 'none';
}