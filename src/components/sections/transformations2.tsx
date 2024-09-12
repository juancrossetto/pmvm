"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import transformationsData from "@/data/transformations.json";
import { useTheme } from "next-themes";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
let transformations: any[] = transformationsData;
// const ReactCompareImage = dynamic(() => import("react-compare-image"), {
// 	ssr: false,
// });

const Transformations2 = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalImage, setModalImage] = useState("");
	const [modalName, setModalName] = useState("");
	const [modalDescription, setModalDescription] = useState("");
	const [isDarkMode, setIsDarkMode] = useState(false);
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
		const timer = setInterval(nextTransformation, 8000); // Changes every 5 seconds
		return () => clearInterval(timer);
	}, [nextTransformation]);

	const openModal = (image: string, description: string, name: string) => {
		setModalImage(image);
		setModalDescription(description);
		setModalName(name);
		setIsModalOpen(true);
	};

	const toggleDarkMode = () => {
		setIsDarkMode(!isDarkMode);
	};

	return (
		<section
			className={`py-8 md:py-16 transition-colors duration-300 ease-in-out bg-white dark:bg-darkColor`}
			// style={{
			// 	background: `linear-gradient(to right, ${
			// 		isDarkMode ? "#1a1a2e" : "#2a2a3e"
			// 	}, ${isDarkMode ? "#16213e" : "#26314e"})`,
			// }}
		>
			<div className='container mx-auto px-4'>
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
							className='mr-2 md:mr-4 text-white'
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
									{/* <div className='h-auto max-h-screen overflow-hidden md:min-h-fit md:h-[500px]'>
									<ReactCompareImage
										leftImage={transformations[currentIndex].beforeImage}
										rightImage={transformations[currentIndex].afterImage}
										sliderPositionPercentage={0.5}
										handle={<div className='w-1 bg-white' />}
									/>
								</div> */}
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
											className='rounded-lg shadow-lg w-full h-[440px]'
											width={300}
											height={500}
										/>
										<div className='absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded text-sm'>
											{t("before")}
										</div>
										<div className='absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-sm'>
											{t("after")}
										</div>
									</div>
								</>
							) : (
								<div className='flex gap-6 justify-center'>
									<div
										className='relative cursor-pointer'
										onClick={() =>
											openModal(
												transformations[currentIndex].beforeImage,
												transformations[currentIndex].clientDetail[locale],
												transformations[currentIndex].clientName
											)
										}
									>
										<Image
											src={transformations[currentIndex].beforeImage}
											alt={`${transformations[currentIndex].clientName} before`}
											className='rounded-lg shadow-lg w-full h-auto max-h-screen md:min-h-fit md:h-[500px] md:w-[300px] object-cover'
											width={300}
											height={500}
										/>
										<div className='absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded'>
											{t("before")}
										</div>
									</div>
									<div
										className='relative cursor-pointer'
										onClick={() =>
											openModal(
												transformations[currentIndex].afterImage,
												transformations[currentIndex].clientDetail[locale],
												transformations[currentIndex].clientName
											)
										}
									>
										<Image
											src={transformations[currentIndex].afterImage}
											alt={`${transformations[currentIndex].clientName} after`}
											className='rounded-lg shadow-lg w-full h-auto max-h-screen md:min-h-fit md:h-[500px] md:w-[300px] object-cover'
											width={300}
											height={500}
										/>
										<div className='absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded'>
											{t("after")}
										</div>
									</div>
								</div>
							)}
						</motion.div>
						<Button
							variant='outline'
							size='icon'
							onClick={nextTransformation}
							className='ml-2 md:ml-4 text-white'
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
						<p className='text-white text-lg md:text-xl italic'>{`"${transformations[currentIndex].clientTestimonial[locale]}"`}</p>
						<p className='text-white font-semibold mt-2'>
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

							<p className='text-white font-semibold mb-3 text-center'>
								{modalName}
							</p>
							<Image
								src={modalImage}
								alt='Transformation detail'
								className='w-full h-auto mb-4 rounded-lg max-w-[500px] max-h-[600px] mx-auto pb-3'
								width={300}
								height={500}
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
