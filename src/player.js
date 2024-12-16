let jsPlayer = null;

export function initializePlayer(videoElement) {
  jsPlayer = new JSPlayer(videoElement);
  
  jsPlayer.on('error', (error) => {
    console.error('Player error:', error);
    handleVideoError();
  });
  
  return jsPlayer;
}

export function handleVideoError() {
  const errorDisplay = document.getElementById('errorDisplay');
  const video = document.getElementById('video');
  const noVideoMessage = document.getElementById('noVideoMessage');
  const errorImage = document.getElementById('errorImage');
  
  video.style.display = 'none';
  noVideoMessage.style.display = 'none';
  errorDisplay.style.display = 'block';
  errorImage.src = errorImages[currentLanguage];
}

export function handleVideoSuccess() {
  const video = document.getElementById('video');
  const errorDisplay = document.getElementById('errorDisplay');
  const noVideoMessage = document.getElementById('noVideoMessage');
  
  video.style.display = 'block';
  errorDisplay.style.display = 'none';
  noVideoMessage.style.display = 'none';
}

export function playChannel(channel) {
  console.log('Playing channel:', channel.name);
  currentChannel = channel;
  resetVideoDisplay();

  document.querySelectorAll('.channel-button').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.url === channel.url) {
      btn.classList.add('active');
    }
  });

  try {
    if (jsPlayer) {
      jsPlayer.load(channel.url);
      jsPlayer.play().catch(handleVideoError);
    }
  } catch (error) {
    console.error('Error playing channel:', error);
    handleVideoError();
  }
}