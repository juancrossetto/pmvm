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
  ...rest
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      videoElement.muted = true;

      const handlePlay = () => {
        videoElement.play().catch((error) => {
          console.error("AutoPlay error:", error);
          setShowFallback(true); // Muestra la imagen si falla el autoplay
        });
      };

      // Intentar reproducir el video
      if (autoPlay) {
        handlePlay();
      }

      // Listener para detectar si el video falla en reproducirse
      videoElement.addEventListener("error", () => {
        setShowFallback(true); // Mostrar imagen de fallback si hay error en la reproducción
      });

      // Limpiar el listener al desmontar el componente
      return () => {
        videoElement.removeEventListener("error", handlePlay);
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

  return (
    <video
      ref={videoRef}
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
};

export default Video;
