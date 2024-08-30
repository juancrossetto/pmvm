"use client";
import React, { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import * as Icons from "lucide-react";
import servicesData from "@/data/services.json";

const typedServicesData: any[] = servicesData;

const Services = () => {
	const locale = useLocale();
	const t = useTranslations("services");
	useEffect(() => {
		// const handleScroll = () => {
		// 	const parallaxText1 = document.querySelector(
		// 		".parallax-text-1"
		// 	) as HTMLElement;
		// 	const parallaxText2 = document.querySelector(
		// 		".parallax-text-2"
		// 	) as HTMLElement;
		// 	if (parallaxText1) {
		// 		parallaxText1.style.transform = `translateX(${window.scrollY * 0.5}px)`;
		// 	}
		// 	if (parallaxText2) {
		// 		parallaxText2.style.transform = `translateX(${
		// 			window.scrollY * -0.5
		// 		}px)`;
		// 	}
		// };
		// window.addEventListener("scroll", handleScroll);
		// return () => {
		// 	window.removeEventListener("scroll", handleScroll);
		// };
	}, []);
	return (
		<section
			id='services'
			className='w-full py-12 md:py-24 lg:py-32 bg-darkColor
			 relative'
		>
			<div className='container px-4 md:px-6 mx-auto'>
				<div className='text-center mb-12'>
					<h2 className='text-3xl font-bold tracking-tighter sm:text-5xl mb-4 text-white'>
						{t("title")}
					</h2>
					<p className='text-xl text-white dark:text-gray-400 max-w-3xl mx-auto'>
						{t("description")}
					</p>
				</div>
				{/* <h2 className='text-9xl font-bold parallax-text-1 absolute text-yellow-400 z-[-2]'>
						{t("parallax_text_1")}
					</h2>

					<h2 className='text-9xl font-bold parallax-text-2 absolute text-yellow-400 z-[-2]'>
						{t("parallax_text_2")}
					</h2> */}
				<div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
					{typedServicesData.map((service, i) => {
						const Icon: any = (Icons as any)[service.icon];
						return (
							<Card
								key={i}
								className='relative overflow-hidden group bg-gradient-to-b from-[#212121] to-bg-darkColor'
							>
								<div className='absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300'></div>
								<CardContent className='p-6'>
									<Icon className='h-12 w-12 mb-4 text-primaryColor' />
									<h3 className='text-2xl font-bold mb-2 text-white'>
										{service.title[locale]}
									</h3>
									<p className='text-white opacity-80 mb-4'>
										{service.description[locale]}
									</p>
									<Link
										href='#'
										className='text-primaryColor hover:underline font-semibold'
									>
										{service.link[locale]}
									</Link>
								</CardContent>
							</Card>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default Services;
