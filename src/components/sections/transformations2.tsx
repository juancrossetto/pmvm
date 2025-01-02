"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
// import dynamic from "next/dynamic";
import transformationsData from "@/data/transformations.json";
import { useTheme } from "next-themes";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
let transformations: any[] = transformationsData;
// const ReactCompareImage = dynamic(() => import("react-compare-image"), {
// 	ssr: false,
// });

const CircleSVGBackground = () => (
	<svg
		className='absolute inset-0 w-full h-full'
		xmlns='http://www.w3.org/2000/svg'
		version='1.1'
		xmlnsXlink='http://www.w3.org/1999/xlink'
		viewBox='0 0 800 800'
	>
		<defs>
			<linearGradient x1='50%' y1='0%' x2='50%' y2='100%' id='cccoil-grad'>
				<stop stop-color='#ef8108' stop-opacity='1' offset='0%'></stop>
				<stop stop-color='#FAD02C' stop-opacity='1' offset='100%'></stop>
			</linearGradient>
		</defs>
		<g stroke='url(#cccoil-grad)' fill='none' stroke-linecap='round'>
			<circle
				r='363'
				cx='400'
				cy='400'
				stroke-width='7'
				stroke-dasharray='1939 2281'
				transform='rotate(360, 400, 400)'
				opacity='0.05'
			></circle>
			<circle
				r='346.5'
				cx='400'
				cy='400'
				stroke-width='7'
				stroke-dasharray='1762 2177'
				transform='rotate(343, 400, 400)'
				opacity='0.10'
			></circle>
			<circle
				r='330'
				cx='400'
				cy='400'
				stroke-width='7'
				stroke-dasharray='1595 2073'
				transform='rotate(326, 400, 400)'
				opacity='0.14'
			></circle>
			<circle
				r='313.5'
				cx='400'
				cy='400'
				stroke-width='7'
				stroke-dasharray='1435 1970'
				transform='rotate(309, 400, 400)'
				opacity='0.19'
			></circle>
			<circle
				r='297'
				cx='400'
				cy='400'
				stroke-width='7'
				stroke-dasharray='1284 1866'
				transform='rotate(291, 400, 400)'
				opacity='0.23'
			></circle>
			<circle
				r='280.5'
				cx='400'
				cy='400'
				stroke-width='7'
				stroke-dasharray='1141 1762'
				transform='rotate(274, 400, 400)'
				opacity='0.28'
			></circle>
			<circle
				r='264'
				cx='400'
				cy='400'
				stroke-width='7'
				stroke-dasharray='1007 1659'
				transform='rotate(257, 400, 400)'
				opacity='0.32'
			></circle>
			<circle
				r='247.5'
				cx='400'
				cy='400'
				stroke-width='7'
				stroke-dasharray='881 1555'
				transform='rotate(240, 400, 400)'
				opacity='0.37'
			></circle>
			<circle
				r='231'
				cx='400'
				cy='400'
				stroke-width='7'
				stroke-dasharray='764 1451'
				transform='rotate(223, 400, 400)'
				opacity='0.41'
			></circle>
			<circle
				r='214.5'
				cx='400'
				cy='400'
				stroke-width='7'
				stroke-dasharray='655 1348'
				transform='rotate(206, 400, 400)'
				opacity='0.46'
			></circle>
			<circle
				r='198'
				cx='400'
				cy='400'
				stroke-width='7'
				stroke-dasharray='554 1244'
				transform='rotate(189, 400, 400)'
				opacity='0.50'
			></circle>
			<circle
				r='181.5'
				cx='400'
				cy='400'
				stroke-width='7'
				stroke-dasharray='462 1140'
				transform='rotate(171, 400, 400)'
				opacity='0.55'
			></circle>
			<circle
				r='165'
				cx='400'
				cy='400'
				stroke-width='7'
				stroke-dasharray='378 1037'
				transform='rotate(154, 400, 400)'
				opacity='0.59'
			></circle>
			<circle
				r='148.5'
				cx='400'
				cy='400'
				stroke-width='7'
				stroke-dasharray='302 933'
				transform='rotate(137, 400, 400)'
				opacity='0.64'
			></circle>
			<circle
				r='132'
				cx='400'
				cy='400'
				stroke-width='7'
				stroke-dasharray='235 829'
				transform='rotate(120, 400, 400)'
				opacity='0.68'
			></circle>
			<circle
				r='115.5'
				cx='400'
				cy='400'
				stroke-width='7'
				stroke-dasharray='176 726'
				transform='rotate(103, 400, 400)'
				opacity='0'
			></circle>
			<circle
				r='99'
				cx='400'
				cy='400'
				stroke-width='7'
				stroke-dasharray='126 622'
				transform='rotate(86, 400, 400)'
				opacity='0'
			></circle>
			<circle
				r='82.5'
				cx='400'
				cy='400'
				stroke-width='7'
				stroke-dasharray='84 518'
				transform='rotate(69, 400, 400)'
				opacity='0'
			></circle>
			<circle
				r='66'
				cx='400'
				cy='400'
				stroke-width='7'
				stroke-dasharray='50 415'
				transform='rotate(51, 400, 400)'
				opacity='0'
			></circle>
			<circle
				r='49.5'
				cx='400'
				cy='400'
				stroke-width='7'
				stroke-dasharray='25 311'
				transform='rotate(34, 400, 400)'
				opacity='0.91'
			></circle>
			<circle
				r='33'
				cx='400'
				cy='400'
				stroke-width='7'
				stroke-dasharray='8 207'
				transform='rotate(17, 400, 400)'
				opacity='0.95'
			></circle>
			<circle
				r='16.5'
				cx='400'
				cy='400'
				stroke-width='7'
				stroke-dasharray='0 104'
				opacity='0.99'
			></circle>
		</g>
	</svg>
);
const CurveSVGBackground = () => (
	<svg
		className='absolute inset-0 w-full h-full'
		xmlns='http://www.w3.org/2000/svg'
		version='1.1'
		xmlnsXlink='http://www.w3.org/1999/xlink'
		viewBox='0 0 1422 800'
		opacity='0.63'
		preserveAspectRatio="none"
	>
		<defs>
			<linearGradient x1='50%' y1='0%' x2='50%' y2='100%' id='oooscillate-grad'>
			<stop stop-color='#ef8108' stop-opacity='0.5' offset='0%'></stop>
			<stop stop-color='#FAD02C' stop-opacity='0.5' offset='100%'></stop>
			</linearGradient>
		</defs>
		<g
			strokeWidth='2'
			stroke='url(#oooscillate-grad)'
			fill='none'
			strokeLinecap='round'
		>
			<path
				d='M 0 572 Q 355.5 -100 711 400 Q 1066.5 900 1422 572'
				opacity='0.68'
			></path>
			<path
				d='M 0 550 Q 355.5 -100 711 400 Q 1066.5 900 1422 550'
				opacity='0.30'
			></path>
			<path
				d='M 0 528 Q 355.5 -100 711 400 Q 1066.5 900 1422 528'
				opacity='0.43'
			></path>
			{/*  */}
			<path
				d='M 0 506 Q 355.5 -100 711 400 Q 1066.5 900 1422 506'
				opacity='0.55'
			></path>
			<path
				d='M 0 484 Q 355.5 -100 711 400 Q 1066.5 900 1422 484'
				opacity='0.76'
			></path>
			<path
				d='M 0 462 Q 355.5 -100 711 400 Q 1066.5 900 1422 462'
				opacity='0.43'
			></path>
			<path
				d='M 0 440 Q 355.5 -100 711 400 Q 1066.5 900 1422 440'
				opacity='0.28'
			></path>
			<path
				d='M 0 418 Q 355.5 -100 711 400 Q 1066.5 900 1422 418'
				opacity='0.56'
			></path>
			<path
				d='M 0 396 Q 355.5 -100 711 400 Q 1066.5 900 1422 396'
				opacity='0.07'
			></path>
			<path
				d='M 0 374 Q 355.5 -100 711 400 Q 1066.5 900 1422 374'
				opacity='0.81'
			></path>
			<path
				d='M 0 352 Q 355.5 -100 711 400 Q 1066.5 900 1422 352'
				opacity='0.85'
			></path>
			<path
				d='M 0 330 Q 355.5 -100 711 400 Q 1066.5 900 1422 330'
				opacity='0.24'
			></path>
			<path
				d='M 0 308 Q 355.5 -100 711 400 Q 1066.5 900 1422 308'
				opacity='0.92'
			></path>
			<path
				d='M 0 286 Q 355.5 -100 711 400 Q 1066.5 900 1422 286'
				opacity='0.17'
			></path>
			<path
				d='M 0 264 Q 355.5 -100 711 400 Q 1066.5 900 1422 264'
				opacity='0.37'
			></path>
			<path
				d='M 0 242 Q 355.5 -100 711 400 Q 1066.5 900 1422 242'
				opacity='0.51'
			></path>
			{/*  */}
			<path
				d='M 0 220 Q 355.5 -100 711 400 Q 1066.5 900 1422 220'
				opacity='0.81'
			></path>
			<path
				d='M 0 198 Q 355.5 -100 711 400 Q 1066.5 900 1422 198'
				opacity='0.95'
			></path>
			<path
				d='M 0 176 Q 355.5 -100 711 400 Q 1066.5 900 1422 176'
				opacity='0.73'
			></path>
			<path
				d='M 0 154 Q 355.5 -100 711 400 Q 1066.5 900 1422 154'
				opacity='0.23'
			></path>
			<path
				d='M 0 132 Q 355.5 -100 711 400 Q 1066.5 900 1422 132'
				opacity='0.93'
			></path>
			<path
				d='M 0 110 Q 355.5 -100 711 400 Q 1066.5 900 1422 110'
				opacity='0.37'
			></path>
			<path
				d='M 0 88 Q 355.5 -100 711 400 Q 1066.5 900 1422 88'
				opacity='0.63'
			></path>
			<path
				d='M 0 66 Q 355.5 -100 711 400 Q 1066.5 900 1422 66'
				opacity='0.88'
			></path>
			<path
				d='M 0 44 Q 355.5 -100 711 400 Q 1066.5 900 1422 44'
				opacity='0.87'
			></path>
		</g>
	</svg>
);

const Transformations2 = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalImage, setModalImage] = useState("");
	const [modalName, setModalName] = useState("");
	const [modalDescription, setModalDescription] = useState("");
	const [isMobile, setIsMobile] = useState(false);

	const { theme } = useTheme();
	const locale = useLocale();
	const t = useTranslations("transformations");

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	const nextTransformation = useCallback(() => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % transformations.length);
	}, []);

	const prevTransformation = useCallback(() => {
		setCurrentIndex(
			(prevIndex) =>
				(prevIndex - 1 + transformations.length) % transformations.length
		);
	}, []);

	useEffect(() => {
		const timer = setInterval(nextTransformation, 800000); // Changes every 5 seconds
		return () => clearInterval(timer);
	}, [nextTransformation]);

	const openModal = (image: string, description: string, name: string) => {
		setModalImage(image);
		setModalDescription(description);
		setModalName(name);
		setIsModalOpen(true);
	};

	return (
			<section
				id="transformations"
				className={`relative overflow-hidden py-8 md:py-16 transition-colors duration-300 ease-in-out bg-white dark:bg-darkColor`}
			>
				{/* <section className={`py-8 md:py-16 transition-colors duration-300 ease-in-out relative overflow-hidden bg-gradient-to-r from-[#ffffff] to-[#F8EFE4] dark:from-[#000000] dark:to-[#171717]`}> */}
				{/* <section
			className={`py-8 md:py-16 transition-colors duration-300 ease-in-out bg-white dark:bg-darkColor`}
		> */}
				<CircleSVGBackground />
				<CurveSVGBackground />
				<div className='container mx-auto px-4 relative z-20 w-screen'>
					<motion.h2
						className='text-3xl sm:text-4xl font-bold text-center mb-2 sm:mb-6 text-primaryColor uppercase'
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						{t("title")}
					</motion.h2>
					<motion.p
						className='text-xl text-center mb-2 sm:mb-6 text-darkColor dark:text-lightColor'
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						{t("subtitle")}
					</motion.p>
					<div className='flex flex-col items-center justify-center gap-4 md:gap-8'>
						<div className='flex items-center justify-center w-full'>
							<Button
								variant='outline'
								size='icon'
								onClick={prevTransformation}
								className='mr-2 md:mr-4 text-lightColor dark:text-darkColor bg-darkColor dark:bg-lightColor'
							>
								<ChevronLeft className='h-4 w-4' />
							</Button>
							<motion.div
								key={currentIndex}
								initial={{ opacity: 0, y: 50 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -50 }}
								transition={{ duration: 0.5 }}
								className='w-full max-w-md md:max-w-2xl'
							>
								{isMobile ? (
									<>
										<div
											className='relative cursor-pointer'
											onClick={() =>
												openModal(
													transformations[currentIndex].combinedImage,
													transformations[currentIndex].clientDetail[locale],
													transformations[currentIndex].clientName
												)
											}
										>
											<Image
												src={transformations[currentIndex].combinedImage}
												alt={`${transformations[currentIndex].clientName} transformation`}
												className='rounded-lg shadow-lg w-full h-[350px]'
												width={300}
												height={400}
											/>
											<div className='absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs'>
												{t("before")}
											</div>
											<div className='absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs'>
												{t("after")}
											</div>
										</div>
									</>
								) : (
									<div className='flex gap-2 justify-center'>
										<div
											// className='relative cursor-pointer w-full h-full  rounded-l-lg'
											className='relative cursor-pointe h-full rounded-l-lg'
											onClick={() =>
												openModal(
													transformations[currentIndex].combinedImage,
													transformations[currentIndex].clientDetail[locale],
													transformations[currentIndex].clientName
												)
											}
										>
											<div className='w-[300px] h-[350px] flex-none'>
												<Image
													src={transformations[currentIndex].beforeImage}
													alt={`${transformations[currentIndex].clientName} before`}
													className='w-full h-full  rounded-lg'
													width={300}
													height={400}
												/>
											</div>
											<div className='absolute top-1 left-14 bg-primary text-primary-foreground px-2 py-1 rounded'>
												{t("before")}
											</div>
										</div>
										<div
											// className='relative cursor-pointer w-full h-full rounded-l-lg'
											className='relative cursor-pointer h-full rounded-l-lg'
											onClick={() =>
												openModal(
													transformations[currentIndex].combinedImage,
													transformations[currentIndex].clientDetail[locale],
													transformations[currentIndex].clientName
												)
											}
										>
											<div className='w-[300px] h-[350px] flex-none'>
												<Image
													src={transformations[currentIndex].afterImage}
													alt={`${transformations[currentIndex].clientName} after`}
													className='w-full h-full  rounded-lg'
													width={300}
													height={400}
												/>
											</div>
											<div className='absolute top-1 right-12 bg-primary text-primary-foreground px-2 py-1 rounded'>
												{t("after")}
											</div>
										</div>
									</div>
								)}
								<div className='flex justify-center mt-8'>
									{transformations.map((_, index) => (
										<motion.button
											key={index}
											onClick={() => setCurrentIndex(index)}
											className={`w-3 h-3 rounded-full mx-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
												index === currentIndex
													? "bg-darkColor dark:bg-lightColor"
													: "opacity-95 bg-grayColor dark:bg-primaryColor dark:opacity-30"
											}`}
											whileHover={{ scale: 1.2 }}
											whileTap={{ scale: 0.8 }}
											aria-label={`Ver transformación ${index + 1}`}
										/>
									))}
								</div>
							</motion.div>
							<Button
								variant='outline'
								size='icon'
								onClick={nextTransformation}
								className='ml-2 md:ml-4 text-lightColor dark:text-darkColor bg-darkColor dark:bg-lightColor'
							>
								<ChevronRight className='h-4 w-4' />
							</Button>
						</div>
						<motion.div
							key={`testimonial-${currentIndex}`}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.3 }}
							className='text-center'
						>
							<p className='text-darkColor dark:text-lightColor text-sm md:text-xl italic'>{`"${transformations[currentIndex].clientDetail[locale]}"`}</p>
							<p className='text-darkColor dark:text-lightColor font-semibold mt-2'>
								{transformations[currentIndex].clientName}
							</p>
						</motion.div>
					</div>
				</div>

				<AnimatePresence>
					{isModalOpen && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'
							onClick={() => setIsModalOpen(false)}
						>
							<motion.div
								initial={{ scale: 0.9 }}
								animate={{ scale: 1 }}
								exit={{ scale: 0.9 }}
								className='rounded-lg p-6 max-w-2xl w-full relative bg-lightColor dark:bg-darkColor text-darkColor dark:text-lightColor'
								onClick={(e) => e.stopPropagation()}
							>
								<Button
									variant='ghost'
									size='icon'
									className='absolute top-2 right-2'
									onClick={() => setIsModalOpen(false)}
								>
									<X className='h-4 w-4' />
								</Button>

								<p className='text-darkColor dark:text-lightColor font-semibold mb-3 text-center'>
									{modalName}
								</p>
								<Image
									src={modalImage}
									alt='Transformation detail'
									className='w-full h-auto mb-4 rounded-lg max-w-[400px] max-h-[600px] mx-auto pb-3'
									width={300}
									height={400}
								/>
								<p className='text-center'>{modalDescription}</p>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>
			</section>
	);
};

export default Transformations2;

