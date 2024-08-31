"use client";
import React, { useEffect } from "react";
import { useLocale } from "next-intl";
import { Parallax } from "react-scroll-parallax";
import Counter from "../common/counter";
import metricsData from "@/data/metrics.json";
import { useClientMediaQuery } from "@/hooks/useClientMediaQuery";

const typedMetricsData: any[] = metricsData;

const Metrics = () => {
	const locale = useLocale();
	const isMobile = useClientMediaQuery("(max-width: 640px)");

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					observer.disconnect();
				}
			},
			{
				threshold: 0.1,
			}
		);

		const element = document.getElementById("metrics");
		if (element) {
			observer.observe(element);
		}

		return () => {
			if (element) {
				observer.unobserve(element);
			}
		};
	}, []);

	return (
		<section
			id='metrics'
			className='h-auto sm:h-[260px] flex items-center justify-center bg-gray-100 dark:bg-darkColor overflow-hidden p-4 opacity-95'
		>
			<div className='flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 relative'>
				{typedMetricsData.map((metric, index) => (
					<Parallax
						key={index}
						speed={!isMobile ? -10 : 50}
						translateX={
							!isMobile ? [-100, 100] : index % 2 === 0 ? [25, -25] : [-25, 25]
						}
						translateY={[0, 0]}
						className="min-w-[300px]"
					>
						<div
							className={`text-center sm:text-start flex flex-col sm:flex-row items-center justify-center transition-transform duration-500 relative`}
						>
							<span
								className='absolute font-bold text-gray-200 dark:text-gray-600 opacity-30 transform -translate-y-1/2 -z-10'
								style={{ top: "50%" }}
							>
								<svg
									className='w-full h-full'
									viewBox='0 0 100 100'
									preserveAspectRatio='xMidYMid meet'
								>
									<text
										x='50%'
										y='50%'
										textAnchor='middle'
										dominantBaseline='middle'
										className='fill-transparent stroke-current  text-primaryColor'
										fontSize='42'
										strokeWidth='2'
									>
										{metric.symbol}{metric.number}
									</text>
								</svg>
							</span>
							<Counter value={metric.number} symbol={metric.symbol} className="opacity-95" />
							<p className='text-[16px] sm:text-[18px] font-bold text-darkColor dark:text-lightColor flex-wrap max-w-[170px] text-center sm:text-start sm:pl-2 mt-2 sm:mt-0 opacity-95'>
								{metric.title[locale]}
							</p>
						</div>
					</Parallax>
				))}
			</div>
		</section>
	);
};

export default Metrics;
