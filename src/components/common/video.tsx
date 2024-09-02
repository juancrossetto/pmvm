/* eslint-disable react/display-name */
import { forwardRef, useEffect, useState } from "react";

interface VideoProps {
	src: string;
	id?: string;
	controls?: boolean;
	style?: React.CSSProperties;
	className?: string;
	poster?: string;
	autoPlay?: boolean;
	preload?: "auto" | "metadata" | "none";
	fallbackImage: string; // Nueva prop para la imagen de fallback
}

const Video = forwardRef(
	(
		{
			src,
			autoPlay = true,
			preload = "auto",
			fallbackImage,
			...rest
		}: VideoProps,
		ref: any
	) => {
		const [showFallback, setShowFallback] = useState(false);

		useEffect(() => {
			const videoElement = ref?.current;

			try {
				if (videoElement) {
					videoElement.muted = true;
					if (autoPlay) {
						videoElement.play().catch((error: any) => {
							console.error("AutoPlay error:", error);
							setShowFallback(true); // Muestra la imagen de fallback si falla el autoplay
						});
					}
				} else {
					// setShowFallback(true); // Muestra la imagen si el videoElement es null o undefined
				}
			} catch (error) {
				setShowFallback(true);
			}
		}, [ref, autoPlay]);

		if (showFallback) {
			return (
				<img
					src={fallbackImage}
					alt='Fallback'
					className={rest.className}
					style={rest.style}
				/>
			);
		}

		return (
			<video
				ref={ref}
				playsInline
				autoPlay={autoPlay}
				muted
				loop
				preload={preload}
				onCanPlay={(e) => e.currentTarget.play()}
				{...rest}
			>
				<source src={src} type='video/mp4' />
				Your browser does not support the video tag.
			</video>
		);
	}
);

export default Video;
