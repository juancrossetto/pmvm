"use client";
import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useTranslations } from "next-intl";
import Typewriter from "../common/type-writer";
import Image from "next/image";
import { Parallax } from "react-scroll-parallax";

const AboutMe = () => {
	const parallaxRef = useRef(null);
	const plus = useRef(null);
	const plusEmpty = useRef(null);
	const less = useRef(null);
	const lessEmpty = useRef(null);
	const image1 = useRef(null);
	const image2 = useRef(null);
	const image3 = useRef(null);

	const tHeader = useTranslations("header");
	const t = useTranslations("about");

	useLayoutEffect(() => {
		const context = gsap.context(() => {
			gsap.registerPlugin(ScrollTrigger);
			const tl = gsap.timeline({
				defaults: { duration: 1 },
				scrollTrigger: {
					trigger: parallaxRef.current,
					// start: "top bottom",
					end: "bottom top",
					start: "top top",
					// end: "1600 bottom",
					scrub: true,
					// pin: true,
				},
			});
			tl.to(plus.current, { x: "-200%", rotateY: 45 }, 0);
			tl.to(lessEmpty.current, { x: "-200%" }, 0);
			tl.to(plusEmpty.current, { x: "100%", rotateY: 90 }, 0);
			tl.to(less.current, { x: "100%" }, 0);
		});
		return () => context.revert();
	}, []);

	return (
		<div
			id='about-me'
			className='about-me-parallax bg-white dark:bg-darkColor'
			ref={parallaxRef}
		>
			<section
				className='flex items-center justify-between relative max-w-[1600px] mx-auto w-full py-12 md:py-16 bg-white dark:bg-darkColor'
				// className='w-full py-12 md:py-24 lg:py-32 bg-background'
			>
				<Image
					ref={plus}
					className='absolute left-[20%] top-[15%] w-[100px] z-10 opacity-20'
					src='/images/plus-secondary.png'
					width={100}
					height={100}
					alt='+'
					priority
				/>
				<div
					ref={lessEmpty}
					className='absolute left-[30%] top-[65%] w-[100px] h-[25px] border-[3px] border-secondaryColor border-dashed rounded-lg rotate-6 z-10 opacity-20'
				/>
				<Image
					ref={plusEmpty}
					className='absolute right-[20%] top-[10%] w-[100px] z-10 opacity-20'
					src='/images/plus-empty-secondary.png'
					width={100}
					height={100}
					alt='+'
					priority
				/>
				<div
					ref={less}
					className='absolute right-[30%] top-[60%] w-[100px] h-[25px] border-[1px] border-secondaryColor bg-secondaryColor rounded-lg rotate-6 z-40 opacity-20'
				/>
				<div className='container px-4 md:px-6'>
					<div className='relative min-h-[140px] flex items-center justify-center overflow-hidden'>
						<div className='absolute w-full max-w-[400px] sm:max-w-[480px] md:max-w-[600px] mx-auto'>
							<h3 className='absolute top-[-4px] left-4 text-[20px] sm:text-[26px] md:text-[32px] font-light'>
								{t("title_1")}
							</h3>
							<h1 className='text-[32px] sm:text-[38px] md:text-[50px] font-bold text-left my-8 ml-6 md:ml-10 lg:ml-14 uppercase text-primaryColor'>
								{t("title_2")}
							</h1>
							<h3 className='absolute bottom-[-4px] right-4 text-[20px] sm:text-[26px] md:text-[32px] font-light'>
								{t("title_3")}
							</h3>
						</div>
						{/* <div className='absolute top-0 right-0 w-[300px] h-[300px] border-4 border-primaryColor rounded-full transform translate-x-1/2 -translate-y-1/4'></div> */}
					</div>

					{/* <h2 className='text-[32px] font-bold tracking-tighter sm:text-[38px] md:text-[50px] text-center mb-12 text-primaryColor'>
						{tHeader("about")}
					</h2> */}
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4 items-center'>
						<Parallax speed={10} className='space-y-4 order-2 md:order-1'>
							<div className='max-w-[600px] bg-transparent rounded-[20px] flex flex-col justify-center items-start w-full p-5'>
								{/* <Typewriter
									text={t("greeting")}
									delay={100}
									as='h1'
									className='relative text-[28px] sm:text-[34px] font-bold leading-[1.2] text-secondaryColor'
								/> */}
								<Typewriter
									text={t("content_1")}
									delay={5}
									as='p'
									className='relative text-[16px] sm:text-base  text-darkColor dark:text-lightColor'
								/>
							</div>
						</Parallax>
						<Parallax
							scale={[0.5, 0.8]}
							className='relative aspect-square order-1 md:order-2'
						>
							<Image
								src='/placeholder.svg'
								alt='Foto profesional'
								layout='fill'
								objectFit='cover'
								className='rounded-lg'
								ref={image1}
							/>
						</Parallax>
						<Parallax
							scale={[0.5, 0.8]}
							className='relative aspect-square order-3 md:order-3'
						>
							<Image
								src='/placeholder.svg'
								alt='Foto profesional 2'
								layout='fill'
								objectFit='cover'
								className='rounded-lg'
								ref={image2}
							/>
						</Parallax>
						<Parallax speed={10} className='space-y-4 order-4 md:order-4'>
							<div className='max-w-[600px] bg-transparent rounded-[20px] flex flex-col justify-center items-start w-full p-5'>
								{/* <Typewriter
									text={t("title2")}
									delay={100}
									as='h1'
									className='relative text-[28px] sm:text-[34px] font-bold leading-[1.2] text-secondaryColor'
								/> */}
								<Typewriter
									text={t("content_2")}
									delay={5}
									as='p'
									className='relative text-[16px] sm:text-base  text-darkColor dark:text-lightColor'
								/>
							</div>
						</Parallax>

						{/* Tercer bloque: Texto e imagen (igual que el primero) */}
						<Parallax speed={10} className='space-y-4 order-6 md:order-5'>
							<div className='max-w-[600px] bg-transparent rounded-[20px] flex flex-col justify-center items-start w-full p-5'>
								{/* <Typewriter
									text={t("greeting")}
									delay={100}
									as='h1'
									className='relative text-[28px] sm:text-[34px] font-bold leading-[1.2] text-secondaryColor'
								/> */}
								<Typewriter
									text={t("content_3")}
									delay={5}
									as='p'
									className='relative text-[16px] sm:text-base  text-darkColor dark:text-lightColor'
								/>
							</div>
						</Parallax>
						<Parallax
							scale={[0.5, 0.8]}
							className='relative aspect-square order-5 md:order-6'
						>
							<Image
								src='/placeholder.svg'
								alt='Foto profesional 3'
								layout='fill'
								objectFit='cover'
								className='rounded-lg'
								ref={image3}
							/>
						</Parallax>
					</div>
				</div>
			</section>
		</div>
	);
};

export default AboutMe;
