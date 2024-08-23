import React from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import Header from "./header";
import { Button } from "@/components/ui/button";

const Hero = () => {
	const t = useTranslations("hero");
	return (
		<>
			{/* <section className='w-full py-12 sm:py-24 lg:py-32 relative'>
			<div className='container px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-8'>
				<div className='space-y-4 text-center md:text-left z-10'>
					<h1 className='text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl'>
                    {t("title")}
					</h1>
					<p className='max-w-[600px] text-lg text-white'>
                    {t("description")}
					</p>
					<div>
						<Link
							href='https://form.jotform.com/242192994073362'
							target="_blank"
							className='inline-flex h-10 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-[#ff6b6b] shadow transition-colors hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'
							prefetch={false}
						>
							{t("cta")}
						</Link>
					</div>
				</div>
				<Image
					src='/images/hero3.jpg'
					width='550'
					height='550'
					alt={t("image_alt")}
					className='mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full z-10'
				/>
				<div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-20 z-0" />
			</div>
		</section> */}

			<section className='relative'>
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
			</section>
		</>
	);
};

export default Hero;
