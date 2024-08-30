import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import pricingData from "@/data/plans.json";
import Link from "next/link";

const typedPricingData: any[] = pricingData;

// interface Plan {
// 	title: string;
// 	items: string[];
// 	price: string;
// }
const Pricing = () => {
	const t = useTranslations("general");
	const locale = useLocale();

	return (
		<section
			id='pricing'
			style={{
				backgroundImage: "url(/images/background-texture.png)",
			}}
			className='h-full bg-cover bg-center bg-fixed bg-no-repeat dark:bg-gray-800 px-2'
		>
			<div className='container px-6 py-8 mx-auto'>
				<div
					// className={`grid gap-6 mt-16 -mx-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-${typedPricingData.length} xl:grid-cols-${typedPricingData.length}`}
					className={`flex gap-6 mt-16 -mx-6 sm:gap-8 flex-wrap justify-center`}
				>
					{typedPricingData.map((plan, index) => (
						<div
							key={index}
							className='px-4 sm:px-4 py-2 sm:py-4 mx-4 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60 border border-opacity-20 duration-1000 ease-in-out transform rounded-lg transition-transform max-w-[500px] cursor-pointer hover:bg-secondary hover:bg-opacity-30 hover:scale-[1.02]'
						>
							<div className='text-base sm:text-lg bg-primaryColor text-darkColor text-center rounded-md mb-3 uppercase'>
								{t("monthly_payment")} 
							</div>
							<p className='text-2xl sm:text-4xl font-bold text-lightColor text-center'>
								{plan.title[locale]}
							</p>
							<h4 className='mt-2 text-lg sm:text-2xl font-semibold text-primaryColor text-center'>
								{plan.price[locale]}
							</h4>
							{/* <p className='mt-4 text-white dark:text-gray-300'>
								{t("For most businesses that want to optimize web queries.")}
							</p> */}
							<div className='mt-8 space-y-3.5 sm:space-y-4 sm:min-h-[32rem]'>
								{plan.items.map((item: any, itemIndex: number) => (
									<div key={itemIndex} className='flex items-center'>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											className='w-5 h-5 text-primaryColor min-w-[16px]'
											viewBox='0 0 20 20'
											fill='currentColor'
										>
											<path
												fillRule='evenodd'
												d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
												clipRule='evenodd'
											/>
										</svg>
										<span className='mx-4 text-gray-400 dark:text-gray-300 text-[12px] sm:text-[14px]'>
											{item[locale]}
										</span>
									</div>
								))}
							</div>

							{/* <button className='w-full px-4 py-2 mt-10 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'>
								{t("i_want_to_start")}
							</button>
							<button className='w-full px-4 py-2 mt-10 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'>
								{t("view_detail")}
							</button> */}
							<div
								// className='btn-box flex justify-center items-center gap-6 flex-col absolute bottom-[20px] inset-x-1/2'
								className='btn-box flex justify-center items-center gap-6 flex-col mt-8'
							>
								<Link
									href='https://form.jotform.com/242192994073362'
									passHref
									target='_blank'
									className='!w-[180px] !h-[50px]'
								>
									{t("i_want_to_start")} <ArrowRightIcon />
								</Link>
								<Link href='#services' className='!w-[180px] !h-[50px]'>
									{t("view_detail")}
								</Link>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Pricing;
