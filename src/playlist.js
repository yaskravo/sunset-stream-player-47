export function parseM3UContent(content) {
  if (!content.includes('stream.sunset-media.ru')) {
    throw new Error('Invalid playlist: Must be a Sunset Media playlist');
  }

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

export async function loadPlaylistFromUrl(url) {
  if (!url.includes('stream.sunset-media.ru')) {
    throw new Error('Invalid URL: Must be a Sunset Media URL');
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch playlist: ${response.statusText}`);
  }
  
  const content = await response.text();
  return parseM3UContent(content);
}

export function loadPlaylistFromFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const content = e.target.result;
        const channels = parseM3UContent(content);
        resolve(channels);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}