import ReactPlayer from 'react-player';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

interface VideoPlayerProps {
  url: string;
}

const VideoPlayer = ({ url }: VideoPlayerProps) => {
  const { i18n } = useTranslation();
  const [hasError, setHasError] = useState(false);

  const getErrorImage = () => {
    switch (i18n.language) {
      case 'uk':
        return '/lovable-uploads/d4a00480-15ef-43ab-b3cd-d8973a866013.png';
      case 'kk':
        return '/lovable-uploads/28c2baf1-4c69-4ade-91f7-40ed1631c0d5.png';
      case 'uz':
        return '/lovable-uploads/b3a306eb-67d4-44f5-bff7-524f04f00218.png';
      default: // Russian
        return '/lovable-uploads/44b54521-b4e1-4efe-8309-dfbbdd44de8e.png';
    }
  };

  const handleError = () => {
    setHasError(true);
    console.error('Video playback error');
  };

  const handlePlay = () => {
    setHasError(false);
  };

  return (
    <div className="aspect-video w-full max-w-4xl mx-auto bg-black rounded-lg overflow-hidden">
      {url ? (
        hasError ? (
          <div className="w-full h-full">
            <img 
              src={getErrorImage()} 
              alt="Error" 
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <ReactPlayer
            url={url}
            width="100%"
            height="100%"
            controls
            playing
            onError={handleError}
            onPlay={handlePlay}
            config={{
              file: {
                forceHLS: true,
              },
            }}
          />
        )
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-400">
          No video selected
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;