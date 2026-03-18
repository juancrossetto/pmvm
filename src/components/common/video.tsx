import React, { useEffect, useRef, useState } from "react";

interface VideoProps {
  src: string;
  id?: string;
  controls?: boolean;
  style?: React.CSSProperties;
  className?: string;
  poster?: string;
  autoPlay?: boolean;
  preload?: "auto" | "metadata" | "none";
  fallbackImage: string;
}

const Video: React.FC<VideoProps> = ({
  src,
  autoPlay = true,
  preload = "auto",
  fallbackImage,
  poster,
  ...rest
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showFallback, setShowFallback] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      videoElement.muted = true;

      const handlePlay = () => {
        videoElement.play().catch((error) => {
          setShowFallback(true); // Muestra la imagen si falla el autoplay
        });
      };

      const handleError = () => setShowFallback(true);
      const handlePlaying = () => setIsPlaying(true);

      // Intentar reproducir el video
      if (autoPlay) {
        handlePlay();
      }

      // Listener para detectar si el video falla en reproducirse
      videoElement.addEventListener("error", handleError);
      videoElement.addEventListener("playing", handlePlaying);

      // Limpiar el listener al desmontar el componente
      return () => {
        videoElement.removeEventListener("error", handleError);
        videoElement.removeEventListener("playing", handlePlaying);
      };
    }
  }, [src, autoPlay]);

  if (showFallback) {
    return (
      <img
        src={fallbackImage}
        alt="Fallback"
        className={rest.className}
        style={rest.style}
      />
    );
  }

  const className = [
    rest.className,
    "transition-opacity duration-700",
    isPlaying ? "opacity-100" : "opacity-0",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <video
      ref={videoRef}
      playsInline
      autoPlay={autoPlay}
      muted
      loop
      preload={preload}
      poster={poster}
      {...rest}
      className={className}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default Video;
