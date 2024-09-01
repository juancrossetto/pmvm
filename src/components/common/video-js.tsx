import React, { useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';

interface VideoPlayerProps {
  url: string;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, className }) => {
  const playerRef = useRef<ReactPlayer>(null);

  useEffect(() => {
    if (playerRef.current) {
      const videoElement = playerRef.current.getInternalPlayer();
      if (videoElement) {
        videoElement.muted = true;
        videoElement.play().catch((error: any) => {
          console.error('AutoPlay error:', error);
        });
      }
    }
  }, []);

  return (
    <div className={`${className}`}>
      <ReactPlayer
        ref={playerRef}
        url={url}
        playing
        muted
        loop
        width="100%"
        height="100%"
        playsinline
        config={{
          file: {
            attributes: {
              playsInline: true,
              muted: true,
              autoPlay: true,
              preload: 'auto',
            },
          },
        }}
      />
    </div>
  );
};

export default VideoPlayer;
