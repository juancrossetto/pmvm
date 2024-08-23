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
	console.log("locale:", locale);
	useEffect(() => {
		const handleScroll = () => {
			const parallaxText1 = document.querySelector(
				".parallax-text-1"
			) as HTMLElement;
			const parallaxText2 = document.querySelector(
				".parallax-text-2"
			) as HTMLElement;

			if (parallaxText1) {
				parallaxText1.style.transform = `translateX(${window.scrollY * 0.5}px)`;
			}

			if (parallaxText2) {
				parallaxText2.style.transform = `translateX(${
					window.scrollY * -0.5
				}px)`;
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);
	return (
		<>
			{/* <section className='w-full py-12 sm:py-24 lg:py-32 relative overflow-hidden bg-gradient-to-r from-[#facb1a] to-[#e07608]'>
			<div className='container px-4 md:px-6 space-y-12 relative'>
				<div className='absolute inset-0 bg-cover bg-center opacity-20 z-0' />

				<h2 className='text-7xl font-bold parallax-text-1 absolute text-yellow-400 z-10'>
					{t('parallax_text_1')}
				</h2>

				<h2 className='text-7xl font-bold parallax-text-2 absolute text-yellow-400 z-10'>
					{t('parallax_text_2')}
				</h2>

				<div className='flex flex-col items-center justify-center text-center relative z-20'>
					<div className='space-y-2'>
						<h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
							{t('title')}
						</h2>
						<p className='max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
							{t('description')}
						</p>
					</div>
				</div>

				<div className='mx-auto grid max-w-5xl items-center gap-6 lg:grid-cols-2 lg:gap-12 relative z-20'>
					<Image
						src='/images/alegerez2.webp'
						width='550'
						height='410'
						alt={t('image_alt')}
						className='mx-auto aspect-video overflow-hidden rounded-xl object-fit object-center sm:w-full z-20'
					/>
					<div className='flex flex-col justify-center space-y-4 z-20'>
						<ul className='grid gap-6'>
							<li>
								<div className='grid gap-1'>
									<h3 className='text-xl font-bold'>{t('weight_loss.title')}</h3>
									<p className='text-muted-foreground'>
										{t('weight_loss.description')}
									</p>
								</div>
							</li>
							<li>
								<div className='grid gap-1'>
									<h3 className='text-xl font-bold'>{t('muscle_building.title')}</h3>
									<p className='text-muted-foreground'>
										{t('muscle_building.description')}
									</p>
								</div>
							</li>
							<li>
								<div className='grid gap-1'>
									<h3 className='text-xl font-bold'>{t('injury_prevention.title')}</h3>
									<p className='text-muted-foreground'>
										{t('injury_prevention.description')}
									</p>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</section> */}
			<section
				id='services'
				className='w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-600 to-[#facb1a] opacity-80 relative'
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
					<h2 className='text-9xl font-bold parallax-text-1 absolute text-yellow-400 z-[-2]'>
						{t("parallax_text_1")}
					</h2>

					<h2 className='text-9xl font-bold parallax-text-2 absolute text-yellow-400 z-[-2]'>
						{t("parallax_text_2")}
					</h2>
					<div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
						{typedServicesData.map((service, i) => {
							const Icon: any = (Icons as any)[service.icon];
							return (
								<Card
									key={i}
									className='relative overflow-hidden group from-gray-600 to-white-900'
								>
									<div className='absolute inset-0 bg-[#facb1a] opacity-0 group-hover:opacity-10 transition-opacity duration-300'></div>
									<CardContent className='p-6'>
										<Icon className='h-12 w-12 mb-4 text-[#facb1a]' />
										<h3 className='text-2xl font-bold mb-2'>
											{service.title[locale]}
										</h3>
										<p className='text-gray-600 dark:text-gray-400 mb-4'>
											{service.description[locale]}
										</p>
										<Link
											href='#'
											className='text-[#facb1a] hover:underline font-semibold'
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
		</>
	);
};

export default Services;
