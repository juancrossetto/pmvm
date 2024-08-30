"use client";
import React, { useRef } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Header from "./header";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { useScroll, useTransform, motion } from "framer-motion";
import { useClientMediaQuery } from "@/hooks/useClientMediaQuery";
import Video from "../video";

const Hero = () => {
	const t = useTranslations("hero");
	const container = useRef(null);
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ["start start", "end end"],
	});
	const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
	const isMobile = useClientMediaQuery("(max-width: 640px)");
	return (
		<div
			ref={container}
			// className={`hero-section max-w-[1600px] text-lightColor mx-auto relative h-[100vh] sm:h-[120vh]`}
			className={`hero-section text-lightColor mx-auto relative h-[100vh] sm:h-[120vh]`}
		>
			<div className='sticky overflow-hidden top-0 h-[100vh]'>
				<motion.div
					style={{ scale: isMobile ? 1 : scale }}
					// className='absolute top-0 w-full h-full flex items-center justify-center'
				>
					<Header />
					<section className='home'>
						<Video
							preload='auto'
							className='absolute top-0 left-0 w-full h-full object-cover'
							src='/videos/bg-hero.mp4'
						/>
						<div className='home-content'>
							<h1>{t("title")}</h1>
							<h3>{t("subtitle")}</h3>
							<p className='text-lightColor'>{t("description")}</p>
							<div className='btn-box'>
								<Link
									href='https://form.jotform.com/242192994073362'
									passHref
									target='_blank'
								>
									{t("start_now")}
								</Link>
								<Link href='#services'>{t("learn_more")}</Link>
							</div>
							<div className='home-sci'>
								<Link href='#'>
									<FaTwitter />
								</Link>
								<Link href='#'>
									<FaInstagram />
								</Link>
								<Link href='#'>
									<FaFacebookF />
								</Link>
							</div>
						</div>

						<span className='home-imgHover'></span>
					</section>
				</motion.div>
			</div>
		</div>
	);
};

export default Hero;
