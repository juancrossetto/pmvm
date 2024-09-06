"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import {
	Dialog,
	DialogContent,
	DialogClose,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import transformationsData from "@/data/transformations.json";

const typedTransformations: any[] = transformationsData;

interface TransformationCardProps {
	transformation: any;
	onClick: any;
	t: any;
	locale: any;
}
const TransformationCard = ({
	transformation,
	onClick,
	t,
	locale,
}: TransformationCardProps) => (
	<motion.div
		className='flex flex-col items-center p-4 bg-white dark:bg-darkColor rounded-lg shadow-md cursor-pointer'
		whileHover={{ scale: 1.05 }}
		whileTap={{ scale: 0.95 }}
		onClick={onClick}
	>
		<div className='flex flex-col sm:flex-row gap-4 mb-4'>
			<div className='relative'>
				<Image
					src={transformation.beforeImage}
					alt={`${transformation.clientName[locale]} beforeImage`}
					className='w-full md:w-96 h-56 object-cover rounded-md'
					width={56}
					height={56}
				/>
				<span className='absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 text-xs rounded'>
					{t("before")}
				</span>
			</div>
			<div className='relative'>
				<Image
					src={transformation.afterImage}
					alt={`${transformation.clientName[locale]} {t("after")}`}
					className='w-full md:w-96 h-56 object-cover rounded-md'
					width={56}
					height={56}
				/>
				<span className='absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 text-xs rounded'>
					{t("after")}
				</span>
			</div>
		</div>
		<h3 className='text-lg font-semibold mb-2'>
			{transformation.clientName[locale]}
		</h3>
		<p className='text-sm text-muted-foreground text-center'>
			{transformation.clientTestimonial[locale]}
		</p>
	</motion.div>
);

const TransformationDialog = ({
	transformation,
	isOpen,
	onClose,
	t,
	locale,
}: any) => (
	<Dialog open={isOpen} onOpenChange={onClose}>
		<DialogContent className='sm:max-w-[700px] bg-white dark:bg-darkColor max-h-[90vh] sm:max-h-[100vh] overflow-y-auto'>
			<DialogTitle className='sr-only'>Transformation Details</DialogTitle>
			<DialogClose asChild />
			<div className='grid gap-4 py-4'>
				<h2 className='text-2xl font-bold text-center'>
					{transformation?.clientName[locale]}
				</h2>
				<div className='flex flex-col md:flex-row justify-center items-center gap-4'>
					{transformation?.beforeImage ? (
						<div className='relative'>
							<Image
								src={transformation?.beforeImage}
								alt={`${transformation?.clientName[locale]} beforeImage`}
								className='w-full md:w-96 h-60 sm:h-80 object-cover rounded-md'
								width={80}
								height={80}
							/>
							<span className='absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 text-sm rounded'>
								{t("before")}
							</span>
						</div>
					) : null}
					{transformation?.afterImage ? (
						<div className='relative'>
							<Image
								src={transformation?.afterImage}
								alt={`${transformation?.clientName[locale]} {t("after")}`}
								className='w-full md:w-96 h-60 sm:h-80 object-cover rounded-md'
								width={80}
								height={80}
							/>
							<span className='absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 text-sm rounded'>
								{t("after")}
							</span>
						</div>
					) : null}
				</div>
				<p className='text-lg text-center font-semibold'>
					{transformation?.clientTestimonial[locale]}
				</p>
				<p className='text-muted-foreground text-center'>
					{transformation?.clientDetail[locale]}
				</p>
			</div>
		</DialogContent>
	</Dialog>
);

export default function Transformations() {
	const locale = useLocale();
	const t = useTranslations("transformations");
	const [currentIndex, setCurrentIndex] = useState(0);
	const [selectedTransformation, setSelectedTransformation] =
		useState<any>(null);

	const nextTransformation = () => {
		setCurrentIndex(
			(prevIndex) => (prevIndex + 1) % typedTransformations.length
		);
	};

	const prevTransformation = () => {
		setCurrentIndex(
			(prevIndex) =>
				(prevIndex - 1 + typedTransformations.length) %
				typedTransformations.length
		);
	};

	return (
		<section className='py-16 bg-white dark:bg-darkColor'>
			<div className='container mx-auto px-4'>
				<motion.h2
					className='text-4xl font-bold text-center mb-6 text-primaryColor'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					{t("title")}
				</motion.h2>
				<motion.p
					className='text-3xl text-center mb-6 text-darkColor dark:text-lightColor'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					{t("subtitle")}
				</motion.p>
				{/* Vista para móviles (carrusel) */}
				<div className='md:hidden relative'>
					<AnimatePresence mode='wait'>
						<motion.div
							key={currentIndex}
							initial={{ opacity: 0, x: 100 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -100 }}
							transition={{ duration: 0.3 }}
						>
							<TransformationCard
								transformation={typedTransformations[currentIndex]}
								onClick={() =>
									setSelectedTransformation(typedTransformations[currentIndex])
								}
								t={t}
								locale={locale}
							/>
						</motion.div>
					</AnimatePresence>
					<Button
						onClick={prevTransformation}
						className='absolute left-0 top-1/2 transform -translate-y-1/2 rounded-full'
						size='icon'
						variant='outline'
						aria-label='Transformación anterior'
					>
						<ChevronLeft className='w-4 h-4' />
					</Button>
					<Button
						onClick={nextTransformation}
						className='absolute right-0 top-1/2 transform -translate-y-1/2 rounded-full'
						size='icon'
						variant='outline'
						aria-label='Siguiente transformación'
					>
						<ChevronRight className='w-4 h-4' />
					</Button>
				</div>

				{/* Vista para desktop (grid) */}
				<div className='hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8'>
					{typedTransformations.map((transformation, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
						>
							<TransformationCard
								transformation={transformation}
								onClick={() => setSelectedTransformation(transformation)}
								t={t}
								locale={locale}
							/>
						</motion.div>
					))}
				</div>

				{/* Indicadores para móviles */}
				<div className='flex justify-center mt-8 md:hidden'>
					{typedTransformations.map((_, index) => (
						<motion.button
							key={index}
							onClick={() => setCurrentIndex(index)}
							className={`w-3 h-3 rounded-full mx-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
								index === currentIndex ? "bg-primary" : "bg-muted"
							}`}
							whileHover={{ scale: 1.2 }}
							whileTap={{ scale: 0.8 }}
							aria-label={`Ver transformación ${index + 1}`}
						/>
					))}
				</div>

				{/* Diálogo para mostrar clientDetail de la transformación */}
				<TransformationDialog
					transformation={selectedTransformation}
					isOpen={!!selectedTransformation}
					onClose={() => setSelectedTransformation(null)}
					locale={locale}
					t={t}
				/>
			</div>
		</section>
	);
}
