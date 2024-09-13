import React from "react";
import { motion } from "framer-motion";

const CircleSvg = ({
	size = "97.5",
	opacity = "1",
	strokeWidth = "15",
}: {
	size?: string;
	opacity?: string;
	strokeWidth?: string;
}) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		version='1.1'
		xmlnsXlink='http://www.w3.org/1999/xlink'
		viewBox={`0 0 800 800`} // Ajustamos el viewBox
		opacity={opacity}
		style={{ height: "100vh", width: "100%" }} // Asegura que ocupe 100vh
		preserveAspectRatio='xMidYMid meet' // Para mantener la proporción
	>
		<defs>
			<linearGradient x1='50%' y1='0%' x2='50%' y2='100%' id='nnneon-grad'>
				<stop stopColor='#ef8108' stopOpacity='1' offset='0%' />
				<stop stopColor='#FAD02C' stopOpacity='1' offset='100%' />
			</linearGradient>
			<filter
				id='nnneon-filter'
				x='-100%'
				y='-100%'
				width='400%'
				height='400%'
				filterUnits='objectBoundingBox'
				primitiveUnits='userSpaceOnUse'
				colorInterpolationFilters='sRGB'
			>
				<feGaussianBlur
					stdDeviation='17 8'
					x='0%'
					y='0%'
					width='100%'
					height='100%'
					in='SourceGraphic'
					edgeMode='none'
					result='blur'
				></feGaussianBlur>
			</filter>
			<filter
				id='nnneon-filter2'
				x='-100%'
				y='-100%'
				width='400%'
				height='400%'
				filterUnits='objectBoundingBox'
				primitiveUnits='userSpaceOnUse'
				colorInterpolationFilters='sRGB'
			>
				<feGaussianBlur
					stdDeviation='10 17'
					x='0%'
					y='0%'
					width='100%'
					height='100%'
					in='SourceGraphic'
					edgeMode='none'
					result='blur'
				></feGaussianBlur>
			</filter>
			<clipPath id='circle-clip'>
				<circle r={size} cx='400' cy='400' />
			</clipPath>
		</defs>
		<g strokeWidth={strokeWidth} stroke='url(#nnneon-grad)' fill='none'>
			<circle r={size} cx='400' cy='400' filter='url(#nnneon-filter)'></circle>
			<circle
				r={size}
				cx='412'
				cy='400'
				filter='url(#nnneon-filter2)'
				opacity='0.25'
			></circle>
			<circle
				r={size}
				cx='388'
				cy='400'
				filter='url(#nnneon-filter2)'
				opacity='0.25'
			></circle>
			<circle r={size} cx='400' cy='400'></circle>
		</g>
	</svg>
);

const SplashScreen = ({ finishLoading }: any) => {
	return (
		<motion.div
			className='flex h-screen items-center justify-center bg-lightColor dark:bg-darkColor'
			initial={{ scale: 1, opacity: 1 }}
			animate={{ scale: 5, opacity: 0 }}
			transition={{
				duration: 2,
				ease: [0.82, 0.12, 0.8, 0.35],
			}}
			onAnimationComplete={finishLoading}
		>
			<CircleSvg size='50' strokeWidth='4' />
			<motion.img
				id='logoPreload'
				src='/images/icon-yellow.png'
				alt='Logo'
				className='w-40 sm:w-50 h-30 absolute'
			/>
		</motion.div>
	);
};

export default SplashScreen;
