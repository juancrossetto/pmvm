/* eslint-disable react/display-name */
import { forwardRef, useEffect } from 'react';

interface VideoProps {
  src: string;
  id?: string;
  controls?: boolean;
  style?: React.CSSProperties;
  className?: string;
  poster?: string;
  autoPlay?: boolean;
  preload?: 'auto' | 'metadata' | 'none';
}

const Video = forwardRef(({ src, autoPlay = true, preload = 'auto', ...rest }: VideoProps, ref: any) => {

  useEffect(() => {
    const videoElement = ref?.current;
    if (videoElement) {
      videoElement.muted = true;
      if (autoPlay) {
        videoElement.play().catch((error: any) => {
          console.error('AutoPlay error:', error);
        });
      }
    }
  }, [ref, autoPlay]);

  return (
    <video 
      ref={ref} 
      playsInline 
      autoPlay={autoPlay} 
      muted 
      loop 
      preload={preload} 
      {...rest}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
});

export default Video;
