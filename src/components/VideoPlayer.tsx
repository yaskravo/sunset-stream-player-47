import ReactPlayer from 'react-player';

interface VideoPlayerProps {
  url: string;
}

const VideoPlayer = ({ url }: VideoPlayerProps) => {
  return (
    <div className="aspect-video w-full max-w-4xl mx-auto bg-black rounded-lg overflow-hidden">
      {url ? (
        <ReactPlayer
          url={url}
          width="100%"
          height="100%"
          controls
          playing
          config={{
            file: {
              forceHLS: true,
            },
          }}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-400">
          No video selected
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;