"use client";
import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselItem,
	CarouselContent,
	CarouselPrevious,
	CarouselNext,
} from "@/components/ui/carousel";
import { useTranslations } from "next-intl";
import testimonialsData from "@/data/testimonials.json"; // Asegúrate de que la ruta sea correcta
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

const Testimonial = () => {
	const t = useTranslations("testimonials");

	return (
		<>
			<section id="testimonials" className='w-full py-12 sm:py-24 lg:py-32 relative bg-[#171717] '>
			{/* bg-gradient-to-b from-[#facb1a] to-[#edb403] opacity-80'> */}
				<div className='container px-4 md:px-6'>
					<div className='flex flex-col items-center justify-center space-y-4 text-center z-10'>
						<div className='space-y-2 mb-8'>
							<h2 className='text-3xl font-bold tracking-tighter sm:text-5xl text-white'>
								{t("title")}
							</h2>
							<p className='max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-white'>
								{t("description")}
							</p>
						</div>
						<Carousel
							opts={{ align: "center", loop: true }}
							className='w-full'
							plugins={[
								Autoplay({
									delay: 5000,
									stopOnInteraction: false,
									stopOnMouseEnter: true,
								}) as any,
							]}
						>
							<CarouselContent className='flex gap-4 mx-6'>
								{testimonialsData.map((testimonial, i) => (
									<CarouselItem
										key={i}
										className='w-full sm:w-1/2 lg:w-1/3 px-2 flex-shrink-0 flex-grow-0 max-w-[400px]'
									>
										<ExpandableCard testimonial={testimonial} />
									</CarouselItem>
								))}
							</CarouselContent>
							{/* <CarouselPrevious className="hidden lg:flex" />
							<CarouselNext className="hidden lg:flex" /> */}
						</Carousel>
					</div>
					{/* <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-20 z-[-1]" /> */}
				</div>
			</section>
		</>
	);
};

export default Testimonial;

interface Testimonial {
	name: string;
	age: number;
	achievement: string;
	content: string;
	avatar: string;
	image?: string;
}

const ExpandableCard: React.FC<{ testimonial: Testimonial }> = ({
	testimonial,
}) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const toggleExpand = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<Card className='bg-[#212121] h-full flex flex-col justify-between'>
			<CardContent className='p-6 flex flex-col h-full'>
				<div className='flex items-center mb-4'>
					<Avatar className='h-16 w-16 mr-4'>
						<AvatarImage
							src={`/images/clients/${testimonial.avatar}`}
							alt={testimonial.name}
						/>
						<AvatarFallback>
							{testimonial.name
								.split(" ")
								.map((n) => n[0])
								.join("")}
						</AvatarFallback>
					</Avatar>
					<div>
						<h3 className='font-semibold text-lg text-white'>
							{testimonial.name}, {testimonial.age}
						</h3>
						<p className='text-sm font-medium text-[#edb403]'>
							{testimonial.achievement}
						</p>
					</div>
				</div>
				<p className='text-white opacity-80 mb-4 italic flex-grow'>
					{testimonial.content}
				</p>
				{testimonial.image && (
					<div className='mt-4'>
						<Image
							src={`/images/clients/${testimonial.image}`}
							alt={`Antes y después de ${testimonial.name}`}
							// layout="fill"
							// objectFit="cover"
							// className='w-full h-auto object-cover rounded-md max-h-[334px]'
							width={333}
							height={333}
							className='rounded-md max-h-[334px]'
						/>
					</div>
				)}
			</CardContent>
		</Card>
	);
};
