import React from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import Header from "./header";
import { Button } from "@/components/ui/button";
import { InstagramLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { Facebook } from "lucide-react";

const Hero = () => {
	const t = useTranslations("hero");
	return (
		<div className="hero-section">
			<Header/>
			<section className="home">
				<div className="home-content">
					<h1>{t("greeting")}</h1>
					<h3>{t("about_me")}</h3>
					<p>{t("description")}</p>
					<div className="btn-box">
						<a href="#">{t("start_now")}</a>
						<a href="#">{t("learn_more")}</a>
					</div>
				</div>
				<div className="home-sci">
					<a href="#"><TwitterLogoIcon /></a>
					<a href="#"><InstagramLogoIcon/></a>
					<a href="#"><Facebook/></a>
				</div>

				<span className="home-imgHover"></span>
			</section>
			{/* <section className='relative'>
				<div className='absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-600 opacity-80'></div>

				<div className='relative z-10 container mx-auto px-4'>
					<Header />
					<div className='py-20 md:py-32 text-center'>
						<h1 className='text-4xl md:text-6xl font-bold text-white mb-6'>
							{t("title")}
						</h1>
						<p className='text-xl text-gray-300 mb-8 max-w-2xl mx-auto'>
							{t("description")}
						</p>
						<div className='space-x-4'>
							<Link
								href='https://form.jotform.com/242192994073362'
								passHref
								target='_blank'
							>
								<Button
									size='lg'
									className='bg-white text-gray-900 hover:bg-gray-200'
									variant='outline'
									rel='noopener noreferrer'
								>
									{t("start_now")}
								</Button>
							</Link>
							<Button
								size='lg'
								variant='outline'
								className='text-[#e07608] border-white hover:bg-white hover:text-gray-900'
							>
								{t("learn_more")}
							</Button>
						</div>
					</div>
				</div>
			</section> */}
		</div>
	);
};

export default Hero;
